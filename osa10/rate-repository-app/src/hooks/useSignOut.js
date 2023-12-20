import { useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';
import { useNavigate } from 'react-router-native';

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return signOut;
};

export default useSignOut;
