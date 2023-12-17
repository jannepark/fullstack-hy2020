import { useParams } from 'react-router-native';
import { useRepository } from '../hooks/useRepositary';
import RepositoryItem from './RepositoryItem';
import { FlatList, View, StyleSheet } from 'react-native';
import theme from '../theme';
import { ReviewItem } from './ReviewItem';
import React from 'react';

const styles = StyleSheet.create({
  separator: {
    ...theme.listSeparator,
  },
});

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) {
    return null;
  }
  const reviews = repository
    ? repository.repository.reviews.edges.map((edge) => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={repository.repository} singleView={true} />
          <ItemSeparator />
        </>
      )}

      // ...
    />
  );
  // return <RepositoryItem item={repository.repository} singleView={true} />;
};

export default SingleRepositoryView;
