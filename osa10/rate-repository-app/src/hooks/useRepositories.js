// import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  //   const [repositories, setRepositories] = useState();
  //   const [loading, setLoading] = useState(false);

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  //   const repositories = data.repositories.edges;

  //   const fetchRepositories = async () => {
  //     setLoading(true);

  //     // Replace the IP address part with your own IP address!
  //     const response = await fetch('http://172.30.5.202:5000/api/repositories');
  //     const json = await response.json();

  //     setLoading(false);
  //     setRepositories(json);
  //   };

  //   useEffect(() => {
  //     fetchRepositories();
  //   }, []);

  //   return { repositories, loading, refetch: fetchRepositories };
  return { repositories: data?.repositories, loading };
};

export default useRepositories;
