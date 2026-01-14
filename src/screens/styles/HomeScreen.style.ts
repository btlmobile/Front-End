import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale, fontScale } from '../../utils/scaling';
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    width: moderateScale(50),
    height: moderateScale(50),
  },
  topLeftIcons: {
    position: 'absolute',
    top: verticalScale(80),
    left: scale(20),
    flexDirection: 'column', // Changed from 'row' to stack vertically
    gap: verticalScale(16), // Spacing between icons
  },
  topRightIcons: {
    position: 'absolute',
    top: verticalScale(80),
    right: scale(20),
    flexDirection: 'column', // Changed from 'row' to stack vertically
    gap: verticalScale(16), // Spacing between icons
  },
  title: {
    fontSize: fontScale(40),
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
    marginTop: verticalScale(150),
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(100),
  },
  subtitle: {
    fontSize: fontScale(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(80),
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  iconContainer: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor set inline based on theme
  },
  primaryButton: {
    marginBottom: verticalScale(20),
    minWidth: scale(180), // Minimum width for aesthetics
    maxWidth: scale(320), // Maximum width for responsiveness
    alignSelf: 'center', // Center the button
    borderRadius: moderateScale(28), // Pill shape
    overflow: 'hidden', // For gradient
  },
  secondaryButton: {
    minWidth: scale(180), // Minimum width for aesthetics
    maxWidth: scale(320), // Maximum width for responsiveness
    alignSelf: 'center', // Center the button
    borderRadius: moderateScale(28), // Pill shape
    overflow: 'hidden', // For gradient
  },
  gradientButtonInner: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  buttonLabel: {
    fontSize: fontScale(18),
    lineHeight: fontScale(22),
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.common.buttonTextColor, // Updated text color
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(16),
  },

});
