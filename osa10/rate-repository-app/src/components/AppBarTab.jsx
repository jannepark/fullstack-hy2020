// AppBarTab.js
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    marginLeft: 10, // Add spacing between tabs
    // Additional styling for the tab
  },
  // Other styles if needed
});

const AppBarTab = ({ title }) => {
  return (
    <Pressable style={styles.tab}>
      <Text color="textAppBar">{title}</Text>
    </Pressable>
  );
};

export default AppBarTab;
