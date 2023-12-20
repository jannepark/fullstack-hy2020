import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format, parseISO } from 'date-fns';
import useDeleteReview from '../hooks/useDeleteReview';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    alignContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  ratingText: {
    textAlign: 'center',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexGrow: 1,
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-around',
  },
  button: {
    ...theme.button,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export const ReviewItem = ({ review, refetch }) => {
  const parsedDate = parseISO(review.createdAt);
  const formattedDate = format(parsedDate, 'dd.MM.yyyy');
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  const handleDelete = async () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: async () => {
            await deleteReview({ id: review.id });
            await refetch();
          },
        },
      ]
    );
  };
  return (
    <View testID="ReviewItem" style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating} color="primary">
            {review.rating}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text fontWeight="bold">{review.user?.username}</Text>
          <Text fontWeight="bold">
            {review.repository?.ownerName}/{review.repository?.name}
          </Text>
          <Text marginBetween="primary" color="textSecondary">
            {formattedDate}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {review.repository && (
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => navigate(`/repository/${review.repository.id}`)}
          >
            <Text style={styles.button}>View repository</Text>
          </Pressable>
          <Pressable onPress={handleDelete}>
            <Text style={[styles.button, { backgroundColor: 'red' }]}>
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
