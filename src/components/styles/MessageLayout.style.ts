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
  title: {
    fontSize: fontScale(theme.fontSize.l),
    lineHeight: fontScale(theme.fontSize.l * 1.2),
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    top: verticalScale(100),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    position: 'absolute',
    bottom: verticalScale(50),
  },
  buttonText: {
    fontSize: fontScale(18),
    lineHeight: fontScale(20),
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
