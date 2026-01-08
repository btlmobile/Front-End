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
  },
  contentBox: {
    width: scale(922),
    height: verticalScale(699),
    backgroundColor: 'rgba(217, 217, 217, 0.8)',
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(40),
  },
  text: {
    fontSize: fontScale(theme.fontSize.l),
    lineHeight: fontScale(theme.fontSize.l * 1.3),
    textAlign: 'center',
    marginBottom: verticalScale(100),
  },
  logoutButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(30),
  },
  buttonText: {
    fontSize: fontScale(18),
    lineHeight: fontScale(20),
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
