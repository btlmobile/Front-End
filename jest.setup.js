// jest.setup.js
// extend-expect is built-in from @testing-library/react-native v12+

global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

global.__ExpoImportMetaRegistry = {
  register: () => {},
  get: () => null,
}; 

global.structuredClone = global.structuredClone || ((obj) => JSON.parse(JSON.stringify(obj)));

jest.spyOn(console, 'log').mockImplementation(() => {});

// Mock scaling utility
jest.mock('./src/utils/scaling', () => ({
  scale: (size) => size,
  verticalScale: (size) => size,
  moderateScale: (size) => size,
  fontScale: (size) => size,
}));

// Mock common styles
jest.mock('./src/styles/common', () => ({
  commonStyles: {
    container: { flex: 1 },
    background: { flex: 1 },
  },
}));

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const inset = { top: 0, bottom: 0, left: 0, right: 0 };
  const frame = { x: 0, y: 0, width: 0, height: 0 };
  const SafeAreaInsetsContext = React.createContext(inset);
  const SafeAreaFrameContext = React.createContext(frame);

  return {
    SafeAreaProvider: ({ children }) =>
      React.createElement(
        SafeAreaInsetsContext.Provider,
        { value: inset },
        React.createElement(SafeAreaFrameContext.Provider, { value: frame }, children)
      ),
    SafeAreaConsumer: ({ children }) => children(inset),
    useSafeAreaInsets: () => React.useContext(SafeAreaInsetsContext),
    useSafeAreaFrame: () => React.useContext(SafeAreaFrameContext),
    SafeAreaInsetsContext,
    SafeAreaFrameContext,
    initialWindowMetrics: {
      frame,
      insets: inset,
    },
  };
});

jest.mock('react-native-paper', () => {
  const React = require('react');
  const actual = jest.requireActual('react-native-paper');

  const Menu = ({ children }) => React.createElement(React.Fragment, null, children);
  Menu.Item = ({ title, onPress }) =>
    React.createElement(
      'MenuItem',
      null,
      React.createElement('Text', { onPress }, title)
    );

  const IconButton = ({ icon, onPress, ...props }) => {
    let iconElement = null;
    if (typeof icon === 'function') {
      iconElement = icon({ size: props.size ?? 24, color: props.iconColor });
    } else {
      iconElement = icon ?? null;
    }

    return React.createElement('IconButton', { onPress, ...props }, iconElement);
  };

  const TextInput = ({ label, onChangeText, value, ...props }) =>
    React.createElement('TextInput', {
      accessibilityLabel: label,
      onChangeText,
      value,
      ...props,
    });

  const Divider = () => React.createElement('Divider', null);

  return {
    ...actual,
    IconButton,
    Menu,
    TextInput,
    Divider,
  };
});

jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Svg: (props) => React.createElement(View, props),
    Path: (props) => React.createElement(View, props),
  };
});

jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  wrap: (App) => App,
  feedbackIntegration: jest.fn(),
  showFeedbackWidget: jest.fn(),
  captureException: jest.fn(),
  logger: {
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));
