import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList, ScrollView, TouchableOpacity } from "react-native";
import firebase from 'react-native-firebase';
import { connect } from "react-redux";

class ViewGoals extends Component {

  constructor(props) {
    super(props);
    this.usersDb = firebase.firestore().collection('users'); // store ref to db collection
    this.state = {
      goals: [],
    }
  }

  componentDidMount() {
    this.getAllUsersGoals();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>View Your Goals!</Text>
        <SectionList
          sections={this.getSections()}
          renderItem={({item,index}) => <ListItem key={item._data.name+index} item={item} {...this.props} />}
          renderSectionHeader={({section}) => <Text style={styles.sectionText} key={section.title}>{section.title}</Text>}
          keyExtractor={({item,index}) => { if (item) return item._data.name+index; else return index; }}
          ListEmptyComponent={<View style={styles.row}><Text>No goals currently set.</Text></View>}
          />
      </ScrollView>
    );
  }

  async getAllUsersGoals() {
    const { user } = this.props;
    const querySnapshot = await this.usersDb.where('uid', '==', user.uid).get();
    console.log(querySnapshot)
    this.setState({goals:querySnapshot.docs})
  }

  /** Returns an array of sections for SectionList based on number of goals in state and their importance. */
  getSections() {
    const { goals } = this.state;
    const getImportanceArray = importance => goals.filter(doc => doc._data.importance === importance);
    const lowImportance = getImportanceArray('low');
    const medImportance = getImportanceArray('medium');
    const highImportance = getImportanceArray('high');
    console.log(lowImportance,medImportance,highImportance)
    return [{title:'High Importance',data:highImportance}, {title:'Medium Importance',data:medImportance}, {title:'Low Importance',data:lowImportance}];
  }
}

/** Component for renderItem. Think of an item as the document. */
const ListItem = props => {
  const { item, navigation } = props;
  const goal = item._data;

  const onPress = () => {
    console.log('on list item press')
    navigation.navigate('GoalViewer', goal);
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <Text>{goal.name}</Text>
      </View>
    </TouchableOpacity>
  );
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
  sectionText: {
    fontSize: 30,
  },
  row: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginTop: 5, 
    marginBottom: 5,
    padding: 10,
    elevation: 3,
    // shadow styles only work on iOS
    shadowColor: '#4d79ff',
    shadowOffset: {width:2, height:2},
    shadowRadius: 3,
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(ViewGoals);