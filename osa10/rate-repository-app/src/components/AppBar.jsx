import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 2,
    paddingBottom: Constants.statusBarHeight / 2,
    backgroundColor: theme.colors.backgroundBar,
    paddingLeft: Constants.statusBarHeight / 3,
    flexDirection: 'row',
    alignItems: 'center',
    // ...
  },
  tab: {
    marginLeft: 10,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <Link to="/signIn" component={Pressable} style={styles.tab}>
          <AppBarTab title="Sign in" />
        </Link>
        <Link to="/" component={Pressable} style={styles.tab}>
          <AppBarTab title="Repositories" />
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
