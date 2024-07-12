"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionButtonStyles = exports.menuButtonStyles = exports.toolbarButtonStyles = void 0;

var _reactNative = require("react-native");

var _reactNativeResponsiveDimensions = require("react-native-responsive-dimensions");

var _button;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toolbarButtonStyles = _reactNative.StyleSheet.create({
  button: {
    width: (0, _reactNativeResponsiveDimensions.responsiveWidth)(4),
    height: (0, _reactNativeResponsiveDimensions.responsiveHeight)(7),
    borderRadius: 10,
    backgroundColor: '#fffff03f',
    elevation: 3,
    flexDirection: 'row',
    padding: 2,
    marginRight: 5,
    justifyContent: 'center'
  },
  icon: {
    paddingLeft: 0,
    alignSelf: 'center',
    marginRight: 0,
    flex: 1
  },
  title: {
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(1),
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center'
  }
});

exports.toolbarButtonStyles = toolbarButtonStyles;

var menuButtonStyles = _reactNative.StyleSheet.create({
  button: (_button = {
    borderRadius: 16,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    borderColor: '#0000005f'
  }, _defineProperty(_button, "backgroundColor", '#0000001f'), _defineProperty(_button, "elevation", 2), _defineProperty(_button, "borderWidth", 1), _defineProperty(_button, "marginRight", 20), _button),
  icon: {
    flex: 1,
    paddingTop: 20
  },
  title: {
    fontSize: (0, _reactNativeResponsiveDimensions.responsiveFontSize)(1),
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center'
  }
});

exports.menuButtonStyles = menuButtonStyles;

var actionButtonStyles = _reactNative.StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginRight: 20,
    borderRadius: 5
  },
  icon: {
    paddingLeft: 10,
    alignSelf: 'center',
    marginRight: 10
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingRight: 10
  }
});

exports.actionButtonStyles = actionButtonStyles;