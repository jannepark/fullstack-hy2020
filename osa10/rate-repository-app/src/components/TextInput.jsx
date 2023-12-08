import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  inputError: {
    borderColor: 'red',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: theme.colors.textSecondary,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.input, error && styles.inputError];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
