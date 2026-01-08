import { StyleSheet } from 'react-native';
import { scale, verticalScale, fontScale } from '../../utils/scaling';
import { commonStyles } from '../../styles/common';
import { theme } from '../../themes/theme';

export const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  background: {
    ...commonStyles.background,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
  messageBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: scale(60),
    paddingVertical: verticalScale(30),
    paddingHorizontal: scale(30),
    alignItems: 'center',
    width: '90%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  bottleImage: {
    width: scale(393),
    height: verticalScale(262),
    marginBottom: verticalScale(40),
    borderRadius: scale(20),
  },
  messageText: {
    fontSize: fontScale(theme.fontSize.m),
    textAlign: 'center',
    marginBottom: verticalScale(40),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: verticalScale(30),
  },
  returnButton: {
    borderRadius: scale(25),
  },
  openButton: {
    borderRadius: scale(25),
  },
  buttonLabel: {
    fontSize: fontScale(18),
    lineHeight: fontScale(20),
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: verticalScale(8),
  },
});
