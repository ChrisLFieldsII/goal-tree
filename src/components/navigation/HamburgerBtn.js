import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


class HamburgerBtn extends Component {

  render() {
    console.log(this.props);
    return (
      <TouchableOpacity style={styles.container} onPress={this.toggleDrawer.bind(this)}>
        <View>
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </View>
      </TouchableOpacity>
    );
  }

  toggleDrawer() {
    this.props.navigation.navigate('DrawerToggle');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 5,
    padding: 3,
  },
  bar: {
    width: 25,
    height: 3,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    margin: 2,
  }
})

export default HamburgerBtn;