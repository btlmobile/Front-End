import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { theme } from '../../themes/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    width: scale(821),
    height: verticalScale(1000),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: scale(64),
    alignItems: 'center',
    paddingTop: verticalScale(40),
    paddingHorizontal: scale(40),
  },
  title: {
    fontSize: moderateScale(theme.fontSize.xl),
    fontWeight: 'bold',
    color: theme.light.text,
    marginBottom: verticalScale(60),
  },
  input: {
    width: '100%',
    marginBottom: verticalScale(20),
    backgroundColor: 'transparent',
  },
  loginButton: {
    width: '80%',
    marginTop: verticalScale(40),
    paddingVertical: verticalScale(5),
  },
  loginButtonLabel: {
    fontSize: moderateScale(theme.fontSize.m),
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: verticalScale(15),
  },
  registerText: {
    fontSize: moderateScale(theme.fontSize.m),
    color: theme.light.text,
  },
  guestButton: {
    marginTop: verticalScale(15),
  },
  guestText: {
    fontSize: moderateScale(theme.fontSize.m),
    color: theme.light.text,
  },
});


