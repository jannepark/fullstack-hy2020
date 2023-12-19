import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ selectedSort, searchKeyword }) => {
  let variables = { searchKeyword };

  if (selectedSort === 'latestRepositorys') {
    variables.orderBy = 'CREATED_AT';
  } else if (selectedSort === 'highestRated') {
    variables.orderBy = 'RATING_AVERAGE';
    variables.orderDirection = 'DESC';
  } else if (selectedSort === 'lowestRated') {
    variables.orderBy = 'RATING_AVERAGE';
    variables.orderDirection = 'ASC';
  }

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: variables,

    // Other options
  });

  return { repositories: data?.repositories, loading };
};

export default useRepositories;
