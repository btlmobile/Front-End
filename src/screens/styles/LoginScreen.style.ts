import { StyleSheet } from 'react-native';
import { scale, verticalScale, fontScale } from '../../utils/scaling';
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
    width: '80%',
    maxWidth: 500,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: scale(20),
    alignItems: 'center',
    padding: scale(20),
  },
  title: {
    fontSize: fontScale(30),
    fontWeight: 'bold',
    color: theme.light.text,
    marginBottom: verticalScale(30),
  },
  input: {
    width: '100%',
    marginBottom: verticalScale(15),
    backgroundColor: 'transparent',
  },
  loginButton: {
    width: '80%',
    marginTop: verticalScale(20),
    paddingVertical: verticalScale(2),
  },
  loginButtonLabel: {
    fontSize: fontScale(18),
    lineHeight: fontScale(20),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: verticalScale(10),
  },
  registerText: {
    fontSize: fontScale(16),
    lineHeight: fontScale(18),
    textAlign: 'center',
    color: theme.light.text,
  },
  guestButton: {
    marginTop: verticalScale(10),
  },
  guestText: {
    fontSize: fontScale(14),
    lineHeight: fontScale(16),
    textAlign: 'center',
    color: theme.light.text,
  },
});
