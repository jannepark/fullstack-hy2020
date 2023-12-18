import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import useReview from '../hooks/useReview';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: 5,
  },
  button: {
    ...theme.button,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Value must be between 0 and 100 ')
    .max(100, 'Value must be between 0 and 100 ')
    .integer('Must be an integer between 0 and 100')
    .required('Repository name is required'),
  review: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline={true} />
      <Pressable onPress={onSubmit}>
        <Text style={styles.button}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const Review = () => {
  const [review] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const response = await review({
        ownerName,
        repositoryName,
        rating,
        text,
      });
      if (response.data.createReview.repositoryId) {
        console.log(
          response.data.createReview.repositoryId,
          'Successfully made review'
        );
        navigate(`/repository/${response.data.createReview.repositoryId}`);
      }
    } catch (e) {
      if (e.message.includes('User has already reviewed this repository')) {
        alert('You have already reviewed this repository');
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;
