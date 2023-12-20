import { useQuery } from '@apollo/client';

import { ME } from '../graphql/queries';

const useUserReviews = () => {
  let variables = { includeReviews: true };

  const result = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: variables,

    // Other options
  });

  return {
    repositories: result.data?.me,
    loading: result.loading,
    refetch: result.refetch,
  };
};

export default useUserReviews;
