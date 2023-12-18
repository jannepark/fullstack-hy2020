import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const response = await mutate({
      variables: {
        review: { ownerName, repositoryName, rating: Number(rating), text },
      },
    });
    if (response.error) {
      console.log(response.error, 'jhaa');
    }

    return response;
  };
  return [createReview, result];
};
export default useReview;
