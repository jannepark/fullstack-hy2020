import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  console.log(useAuthStorage);
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const response = await mutate({ variables: { username, password } });
    const { data } = response;

    await authStorage.setAccessToken(data.authenticate.accessToken);
    client.resetStore();
    console.log('successfully stored access token');

    return data;
  };
  return [signIn, result];
};
export default useSignIn;
