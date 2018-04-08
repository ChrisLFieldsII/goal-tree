import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from "react-native";
import t from "tcomb-form-native";
import moment from 'moment';

// tcomb-form-native set-up
const Form = t.form.Form;
const Importance = t.enums({
  L: 'LOW',
  M: 'MEDIUM',
  H: 'HIGH'
});
const GoalForm = t.struct({
  name: t.String,
  desc: t.maybe(t.String),
  startDate: t.Date,
  selectEndDate: t.Boolean,
  endDate: t.maybe(t.Date),
  importance: Importance,
});
const tOptions = {
  fields: {
    name: {
      placeholder: 'Please enter a name for your goal.',
      error: 'Please enter a name for your goal.',
    },
    desc: {
      placeholder: "Enter a description if you'd like"
    },    
    startDate: { 
      mode:'date', 
      config: {
        format: date => moment(date).format('M/D/YYYY'), 
      },
    },
    endDate: { 
      mode:'date',
      config: {
        format: date => moment(date).format('M/D/YYYY'),
      }
    },
    selectEndDate: {
      label: 'Select an end date?',
    },
    importance: {
      nullOption: { value:'', text:'Choose goal importance' }
    }
  }
}

class SetGoal extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Set Your Goal!</Text>
        <View style={styles.form}><Form ref={form => this.form = form} type={GoalForm} options={tOptions} /></View>
      </ScrollView>
    );
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
})

export default SetGoal;