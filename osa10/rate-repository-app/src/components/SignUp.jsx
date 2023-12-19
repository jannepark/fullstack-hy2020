import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: 10,
  },
  signInButton: {
    ...theme.button,
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'must be at least 5 characters'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirm is required')
    .min(5, 'must be at least 5 characters'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.signInButton}>Sign Up</Text>
      </Pressable>
    </View>
  );
};
export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    const { username, password } = values;

    try {
      const data = await signUp({ username, password });
      if (data) {
        console.log(username, 'Successfully created user');
        const data = await signIn({ username, password });
        if (data) {
          console.log(username, 'Successfully logged in');
        }
        navigate('/');
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
