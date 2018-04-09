import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from "react-native";
import t from "tcomb-form-native";
import FormBtn from '../general/FormBtn';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

// tcomb-form-native set-up
const Form = t.form.Form;
const Importance = t.enums({
  low: 'Low',
  medium: 'Medium',
  high: 'High'
});
const GoalFormNoEnd = t.struct({
  name: t.String,
  desc: t.maybe(t.String),
  startDate: t.Date,
  selectEndDate: t.Boolean,
  importance: Importance,
});
const GoalFormEnd = t.struct({
  name: t.String,
  desc: t.maybe(t.String),
  startDate: t.Date,
  selectEndDate: t.Boolean,
  endDate: t.Date,
  importance: Importance,
});
const tOptions = {
  fields: {
    name: {
      placeholder: 'Please enter a name for your goal.',
      error: 'Please enter a name for your goal.',
    },
    desc: {
      placeholder: "Enter a description if you'd like",
      label: "Description",
      multiline: true,
    },    
    startDate: { 
      mode:'date', 
      config: {
        format: date => date.toLocaleDateString('en-US', {month:'numeric',day:'numeric',year:'numeric'}), 
      },
    },
    endDate: { 
      mode:'date',
      config: {
        format: date => date.toLocaleDateString('en-US', {month:'numeric',day:'numeric',year:'numeric'}),
      }
    },
    selectEndDate: {
      label: 'Select an end date?',
    },
    importance: {
      nullOption: { value:'', text:'Choose goal importance' }
    }
  }
};

/** START OF CLASS!!!
 * TODO: clear form after submission
 */
class SetGoal extends Component {

  constructor(props) {
    super(props);
    this.usersDb = firebase.firestore().collection('users'); // store ref to db collection
    this.state = {
      formValue: {},
      type: this.getFormType(GoalFormNoEnd),
      goal: null,
      visible: false,
    }
  }
  

  render() {
    const { visible } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Set Your Goal!</Text>
        <View style={styles.form}>
          <Form ref={form => this.form = form} type={this.state.type} value={this.state.formValue} onChange={this.onFormChange.bind(this)} options={tOptions} />
        </View>
        <View style={{flex:1,alignItems:'center',marginBottom:20}}>
          <FormBtn text="Set Goal" onPress={this.onFormSubmit.bind(this)} />
        </View>
        <Spinner visible={visible} cancelable={true} animation="fade" textContent={`One second...\nSaving your awesome goal!`} overlayColor="blue" />
      </ScrollView>
    );
  }

  getFormType(formValue) {
    console.log(formValue)
    if (formValue.selectEndDate) return GoalFormEnd;
    else return GoalFormNoEnd;
  }

  onFormChange(formValue) {
    const type = formValue.selectEndDate !== this.state.formValue.selectEndDate ? this.getFormType(formValue) : this.state.type;
    this.setState({formValue,type});
  }

  async onFormSubmit() {
    const { user } = this.props;
    const goal = this.form.getValue();
    if (goal) {
      this.setState({visible:true});
      console.log(goal);
      this.setState({goal});
      let doc = await this.usersDb.add({
        uid: user.uid,
        name: goal.name,
        desc: goal.desc,
        startDate: goal.startDate,
        endDate: goal.endDate,
        importance: goal.importance,
        achieved: false,
        achievements: [],
      });
      console.log(doc)
      this.setState({visible:false,goal:{}});
    }
    else {
      console.log('goal was null. validation failed.');      
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  form: {
    marginLeft: 20,
    marginRight: 20,
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(SetGoal);