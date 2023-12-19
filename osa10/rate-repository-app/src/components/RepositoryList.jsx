import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.textSecondary,
  },
  search: {
    marginHorizontal: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SearchField = ({ setSearchQuery, searchQuery }) => {
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Searchbar
      style={styles.search}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export const RepositoryListContainer = ({
  repositories,
  searchQuery,
  setSearchQuery,
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <SearchField
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      }
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryDebounce] = useDebounce(searchQuery, 500);
  const { repositories } = useRepositories({
    selectedSort,
    searchKeyword: searchQueryDebounce,
  });
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedSort}
        onValueChange={(itemValue) => setSelectedSort(itemValue)}
      >
        <Picker.Item label="Latest repositorys" value="latestRepositorys" />
        <Picker.Item label="Highest rated repositorys" value="highestRated" />
        <Picker.Item label="Lowest rated repositorys" value="lowestRated" />
      </Picker>
      <RepositoryListContainer
        repositories={repositories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </View>
  );
};

export default RepositoryList;
