import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

export const useRepository = (id) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  if (loading) return { loading: true };
  if (error) return { error: `Error! ${error.message}` };

  return {
    repository: data,
    loading: false,
  };
};
