import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format, parseISO } from 'date-fns';

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
});

export const ReviewItem = ({ review }) => {
  const parsedDate = parseISO(review.createdAt);
  const formattedDate = format(parsedDate, 'dd.MM.yyyy');

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
    </View>
  );
};
