import { Text as NativeText, Platform, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: Platform.select({
      android: theme.fonts.android,
      ios: theme.fonts.ios,
      default: theme.fonts.main,
    }),
    fontWeight: theme.fontWeights.normal,
  },
  colorTextError: {
    color: theme.colors.textError,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorAppBar: {
    color: theme.colors.textAppBar,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  backgroundColorLang: {
    backgroundColor: theme.colors.primary,
  },
  colorLanguage: {
    color: theme.colors.textWhite,
  },
  marginBetween: {
    marginBottom: theme.fontMargins.betweenElementsPrimary,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  style,
  backgroundColor,
  marginBetween,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === 'textError' && styles.colorTextError,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'language' && styles.colorLanguage,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    color === 'textAppBar' && styles.colorAppBar,
    backgroundColor === 'primary' && styles.backgroundColorLang,
    marginBetween === 'primary' && styles.marginBetween,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
