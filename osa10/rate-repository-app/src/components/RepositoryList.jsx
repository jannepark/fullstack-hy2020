import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.textSecondary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} singleView={false} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      // ...
    />
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState();
  const { repositories } = useRepositories(selectedSort);

  return (
    <>
      <Picker
        selectedValue={selectedSort}
        onValueChange={(itemValue) => setSelectedSort(itemValue)}
      >
        <Picker.Item label="Latest repositorys" value="latestRepositorys" />
        <Picker.Item label="Highest rated repositorys" value="highestRated" />
        <Picker.Item label="Lowest rated repositorys" value="lowestRated" />
      </Picker>
      <RepositoryListContainer repositories={repositories} />
    </>
  );
};

export default RepositoryList;
