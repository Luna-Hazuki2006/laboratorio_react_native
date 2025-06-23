import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import colors from './colors';

const buttonStyles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.purple,
  } as ViewStyle,
  text: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  } as TextStyle,
});

export default buttonStyles;

