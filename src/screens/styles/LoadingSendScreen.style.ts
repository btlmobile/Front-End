import { StyleSheet } from 'react-native';
import { verticalScale, fontScale } from '../../utils/scaling';
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
  bottleImage: {
    width: verticalScale(764),
    height: verticalScale(568),
    position: 'absolute',
    top: verticalScale(693),
  },
  text: {
    fontSize: fontScale(theme.fontSize.l),
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    top: verticalScale(1485),
  },
});
