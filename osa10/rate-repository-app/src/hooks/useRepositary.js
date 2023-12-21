import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

export const useRepository = ({ id, first }) => {
  const variables = { id, first };

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  return {
    repository: data?.repository,
    loading,
    fetchMore: handleFetchMore,
  };
};
