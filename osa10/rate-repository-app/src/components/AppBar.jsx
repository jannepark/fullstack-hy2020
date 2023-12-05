// AppBar.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab'; // Import the new component
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight / 2,
    backgroundColor: theme.colors.backgroundBar,
    paddingLeft: Constants.statusBarHeight / 3,
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Align items vertically
    // ...
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab title="Home" />
      <AppBarTab title="Repositories" />
    </View>
  );
};

export default AppBar;
