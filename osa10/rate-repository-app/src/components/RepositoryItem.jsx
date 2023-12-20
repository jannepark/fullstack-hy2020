import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import Text from './Text';
import * as Linking from 'expo-linking';
import theme from '../theme';

function formatNumber(num) {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    alignContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flexGrow: 1,
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-around',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  statItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  signInButton: {
    ...theme.button,
  },
});

const RepositoryItem = ({ item, singleView }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topRow}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" marginBetween="primary">
            {item.fullName}
          </Text>
          <Text marginBetween="primary">{item.description}</Text>
          <Text
            color="language"
            backgroundColor="primary"
            marginBetween="primary"
            style={{
              borderRadius: 4,
              alignSelf: 'flex-start',
              padding: 5,
            }}
          >
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItemContainer}>
          <Text>Stars: </Text>
          <Text fontWeight="bold">
            {formatNumber(item.stargazersCount ?? 0)}
          </Text>
        </View>

        <View style={styles.statItemContainer}>
          <Text>Forks: </Text>
          <Text fontWeight="bold">{formatNumber(item.forksCount ?? 0)}</Text>
        </View>

        <View style={styles.statItemContainer}>
          <Text>Reviews:</Text>
          <Text fontWeight="bold">{formatNumber(item.reviewCount ?? 0)}</Text>
        </View>

        <View style={styles.statItemContainer}>
          <Text>Rating:</Text>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
        </View>
      </View>
      {singleView && (
        <View style={styles.container}>
          <Button
            title={'Open in GitHub'}
            onPress={() => Linking.openURL(item.url)}
          ></Button>
        </View>
      )}
    </View>
  );
};

export default RepositoryItem;
