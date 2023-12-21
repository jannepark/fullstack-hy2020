import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ selectedSort, searchKeyword, first }) => {
  let variables = { searchKeyword, first };

  if (selectedSort === 'latestRepositorys') {
    variables.orderBy = 'CREATED_AT';
  } else if (selectedSort === 'highestRated') {
    variables.orderBy = 'RATING_AVERAGE';
    variables.orderDirection = 'DESC';
  } else if (selectedSort === 'lowestRated') {
    variables.orderBy = 'RATING_AVERAGE';
    variables.orderDirection = 'ASC';
  }

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,

    // Other options
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
  };
};

export default useRepositories;
