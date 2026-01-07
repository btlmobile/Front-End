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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    width: scale(60),
    height: verticalScale(60),
  },
  accountIconContainer: {
    position: 'absolute',
    top: verticalScale(40),
    left: scale(15),
  },
  settingsIconContainer: {
    position: 'absolute',
    top: verticalScale(40),
    right: scale(15),
  },
  chatIconContainer: {
    position: 'absolute',
    bottom: verticalScale(40),
    left: scale(15),
  },
  baloIconContainer: {
    position: 'absolute',
    bottom: verticalScale(40),
    right: scale(15),
  },
  title: {
    fontSize: moderateScale(theme.fontSize.xl),
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
    fontSize: moderateScale(theme.fontSize.l),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(80),
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  primaryButton: {
    marginBottom: verticalScale(40),
    width: scale(400),
  },
  secondaryButton: {
    width: scale(400),
  },
  buttonLabel: {
    fontSize: moderateScale(theme.fontSize.m),
    fontWeight: 'bold',
    paddingVertical: verticalScale(8),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  modalText: {
    fontSize: 18,
  },
});

