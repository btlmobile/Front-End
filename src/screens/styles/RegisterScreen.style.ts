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
  registerBox: {
    width: scale(821),
    height: verticalScale(1431),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: scale(64),
    alignItems: 'center',
    paddingTop: verticalScale(66),
    paddingHorizontal: scale(40),
  },
  title: {
    fontSize: fontScale(theme.fontSize.xl),
    fontWeight: 'bold',
    color: theme.light.text,
    marginBottom: verticalScale(100),
  },
  input: {
    width: '100%',
    marginBottom: verticalScale(40),
    backgroundColor: 'transparent',
  },
  registerButton: {
    width: '80%',
    marginTop: verticalScale(60),
    paddingVertical: verticalScale(10),
  },
  registerButtonLabel: {
    fontSize: fontScale(18),
    lineHeight: fontScale(20),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: verticalScale(20),
  },
  loginText: {
    fontSize: fontScale(16),
    lineHeight: fontScale(18),
    textAlign: 'center',
    color: theme.light.text,
  },
});
