import useUserReviews from '../hooks/useUserReviews';
import { FlatList, View, StyleSheet } from 'react-native';
import theme from '../theme';
import { ReviewItem } from './ReviewItem';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.textSecondary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviewsContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.reviews.edges.map((edge) => edge.node)
    : [];

  if (repositoryNodes.length > 0) {
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
      />
    );
  }
  return (
    <View>
      <Text color="textError" style={{ textAlign: 'center' }}>
        no reviews
      </Text>
    </View>
  );
};

const UserReviews = () => {
  const { repositories } = useUserReviews();
  return (
    <View style={styles.container}>
      <UserReviewsContainer repositories={repositories} />
    </View>
  );
};

export default UserReviews;
