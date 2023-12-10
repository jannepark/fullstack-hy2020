import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.signInButton}>Sign In</Text>
      </Pressable>
    </View>
  );
};
const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = async (values) => {
    console.log(values);
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      if (data) {
        console.log('Successfully logged in');
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const SignInContainer = ({ onSubmit }) => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    );
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
