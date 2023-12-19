import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
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
  const { loading, data } = useQuery(ME);
  const signOut = useSignOut();

  if (loading) return null;

  const userIsSignedIn = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        {!userIsSignedIn && (
          <Link to="/signIn" component={Pressable} style={styles.tab}>
            <AppBarTab title="Sign in" />
          </Link>
        )}
        {userIsSignedIn && (
          <Pressable onPress={signOut} style={styles.tab}>
            <AppBarTab title="Sign out" />
          </Pressable>
        )}
        {!userIsSignedIn && (
          <Link to="/signUp" component={Pressable} style={styles.tab}>
            <AppBarTab title="Sign Up" />
          </Link>
        )}
        <Link to="/" component={Pressable} style={styles.tab}>
          <AppBarTab title="Repositories" />
        </Link>
        {userIsSignedIn && (
          <Link to="/review" component={Pressable} style={styles.tab}>
            <AppBarTab title="Create review" />
          </Link>
        )}
        {userIsSignedIn && (
          <Link to="/myReviews" component={Pressable} style={styles.tab}>
            <AppBarTab title="My Reviews" />
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
