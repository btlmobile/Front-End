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
    width: scale(774),
    height: verticalScale(1500),
    backgroundColor: 'rgba(228, 228, 228, 0.8)',
    borderRadius: scale(32),
    alignItems: 'center',
    padding: scale(40),
  },
  title: {
    fontSize: fontScale(theme.fontSize.l),
    fontWeight: 'bold',
    marginTop: verticalScale(40),
    marginBottom: verticalScale(80),
  },
  emptyText: {
    fontSize: fontScale(theme.fontSize.m),
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(200),
    right: scale(80),
  },
  list: {
    width: '100%',
  },
  bottleItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: scale(20),
    padding: scale(20),
    marginBottom: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottleMessage: {
    flex: 1,
    fontSize: fontScale(theme.fontSize.s),
    marginRight: scale(10),
  },
  bottleActions: {
    flexDirection: 'row',
  },
});

