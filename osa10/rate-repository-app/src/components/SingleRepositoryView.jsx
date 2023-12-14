import { useParams } from 'react-router-native';
import { useRepository } from '../hooks/useRepositary';
import RepositoryItem from './RepositoryItem';

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) {
    return null;
  }

  return <RepositoryItem item={repository.repository} singleView={true} />;
};

export default SingleRepositoryView;
