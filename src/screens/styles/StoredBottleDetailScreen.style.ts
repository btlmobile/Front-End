import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
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
    height: verticalScale(1500),
    backgroundColor: 'rgba(217, 217, 217, 0.8)',
    borderRadius: scale(32),
    alignItems: 'center',
    padding: scale(40),
  },
  messageScrollView: {
    flex: 1,
    width: '100%',
    padding: scale(20),
  },
  messageText: {
    fontSize: moderateScale(theme.fontSize.m),
    marginBottom: verticalScale(20),
  },
  creatorText: {
    fontSize: moderateScale(theme.fontSize.s),
    fontStyle: 'italic',
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: verticalScale(30),
  },
  backButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
  },
  deleteButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
  },
  buttonLabel: {
    fontSize: moderateScale(theme.fontSize.m),
    fontWeight: 'bold',
  },
});
