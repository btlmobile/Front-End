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
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(40),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
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
