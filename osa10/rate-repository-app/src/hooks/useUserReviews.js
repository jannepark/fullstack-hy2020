import { useQuery } from '@apollo/client';

import { ME } from '../graphql/queries';

const useUserReviews = () => {
  let variables = { includeReviews: true };

  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: variables,

    // Other options
  });

  return { repositories: data?.me, loading };
};

export default useUserReviews;
