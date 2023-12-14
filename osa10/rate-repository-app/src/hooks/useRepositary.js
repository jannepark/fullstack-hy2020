import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

export const useRepository = (id) => {
  console.log(id, 'täsä');
  const { data, loading, error } = useQuery(GET_REPOSITORY_BY_ID, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { loading: true };
  if (error) return { error: `Error! ${error.message}` };

  return {
    repository: data,
    loading: false,
  };
};
