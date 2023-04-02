'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.ensureScopeAvailable = ensureScopeAvailable;
exports.reactAngularModule = reactAngularModule;
exports.provideAngularScopeHOC = provideAngularScopeHOC;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Stolen from ReactCOMComponent (it does not expose it)
function isCustomComponent(tagName, props) {
  return tagName.indexOf('-') >= 0 || props.is != null;
}

// Make sure the scope is defined when $compileProvider.debugInfoEnabled is false
function ensureScopeAvailable(link) {
  return function ($scope, $element) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    link && link.apply(undefined, [$scope, $element].concat(args));
    $element.data('$scope', $scope);
  };
}

var debugInfoEnabled = null;

function reactAngularModule() {
  var usesNgReact = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  var raModule = _angular2.default.module('react-angular', usesNgReact ? ['react'] : []).config(['$compileProvider', function ($compileProvider) {
    debugInfoEnabled = $compileProvider.debugInfoEnabled.bind($compileProvider);
  }]).value('reactAngularProductionReady', function () {
    return debugInfoEnabled = function debugInfoEnabled() {
      return false;
    };
  });

  if (usesNgReact) {
    raModule.directive('reactComponent', function () {
      return function ($scope, $elem) {
        $elem.data('$scope', $scope);
      };
    }).decorator('reactDirective', ['$delegate', function ($delegate) {
      return function () {
        var directive = $delegate.apply(undefined, arguments);

        return _extends({}, directive, {
          link: ensureScopeAvailable(directive.link)
        });
      };
    }]).run(['reactAngularProductionReady', function (reactAngularProductionReady) {
      return reactAngularProductionReady();
    }]);
  }

  return raModule;
}

var ReactAngular = function (_React$Component) {
  _inherits(ReactAngular, _React$Component);

  function ReactAngular() {
    _classCallCheck(this, ReactAngular);

    return _possibleConstructorReturn(this, (ReactAngular.__proto__ || Object.getPrototypeOf(ReactAngular)).apply(this, arguments));
  }

  _createClass(ReactAngular, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          controller = _props.controller,
          controllerAs = _props.controllerAs,
          inject = _props.inject,
          isolate = _props.isolate,
          scope = _props.scope,
          template = _props.template,
          templateUrl = _props.templateUrl;


      if (!this.context.$scope && !debugInfoEnabled) {
        console.warn('[react-angular] It looks like you have not added the react-angular module to your dependencies.', 'Check react-angular documentation, section \'Running in production\'.');
      }
      if (!this.context.$scope && debugInfoEnabled && debugInfoEnabled()) {
        console.warn('[react-angular] It looks like you have declared that you are not using ngReact.', 'You should use either provideAngularScopeHOC(), or ensureScopeAvailable().', 'If you are using ensureScopeAvailable() and you don\'t want to see this warning again, call the reactAngularProductionReady() service in your module\'s init() block.', 'Check react-angular documentation, section \'Running in production\'.');
      }

      var parentScope = this.context.$scope || this.$element.scope();
      var $injector = this.$element.injector();

      var $controller = $injector.get('$controller');
      var $compile = $injector.get('$compile');
      var $rootScope = $injector.get('$rootScope');
      var $templateCache = $injector.get('$templateCache');

      this.$scope = scope ? parentScope.$new(isolate) : parentScope;

      if (_angular2.default.isObject(scope)) {
        _angular2.default.extend(this.$scope, scope);
      }

      var actualTemplateFunc = template || (templateUrl ? $templateCache.get(templateUrl) : null);

      var actualTemplate = _angular2.default.isFunction(actualTemplateFunc) ? actualTemplateFunc(inject) : actualTemplateFunc;

      if (controller) {
        var instantiatedController = $controller(controller, _extends({}, inject, {
          $scope: this.$scope,
          $element: this.$element
        }));

        if (controllerAs) {
          this.$scope[controllerAs] = instantiatedController;
        }
      }

      if (actualTemplate) {
        this.$element.append(actualTemplate);
      }

      $compile(this.$element)(this.$scope);
      this.$element.data('$scope', this.$scope);
      $rootScope.$evalAsync();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          wrapperTag = _props2.wrapperTag,
          className = _props2.className,
          wrapperAttrs = _props2.wrapperAttrs,
          children = _props2.children;

      var ref = function ref(element) {
        return _this2.$element = _angular2.default.element(element);
      };

      if (children) {
        if (!_react2.default.isValidElement(children)) {
          throw new Error('Only one child is allowed in AngularTemplate.\n          Found ' + children.length + ': ' + children.map(function (_ref) {
            var type = _ref.type;
            return type;
          }).join(', ') + '.');
        }

        var _classesKey = isCustomComponent(children.type, children.props) ? 'class' : 'className';
        var _classes = _defineProperty({}, _classesKey, [className || '', children.props.className || '', children.props['class'] || ''].join(' ').trim() || undefined);

        var child = _react2.default.cloneElement(children, _extends({}, wrapperAttrs, {
          ref: ref
        }, _classes));

        return child;
      }

      var classesKey = isCustomComponent(wrapperTag, wrapperAttrs) ? 'class' : 'className';
      var classes = _defineProperty({}, classesKey, [className || '', wrapperAttrs.className || '', wrapperAttrs['class'] || ''].join(' ').trim() || undefined);

      return _react2.default.createElement(wrapperTag, _extends({}, wrapperAttrs, {
        ref: ref
      }, classes), '');
    }
  }]);

  return ReactAngular;
}(_react2.default.Component);

exports.default = ReactAngular;


ReactAngular.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  controller: _propTypes2.default.any,
  controllerAs: _propTypes2.default.string,
  inject: _propTypes2.default.object,
  isolate: _propTypes2.default.bool,
  scope: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
  template: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  templateUrl: _propTypes2.default.string,
  wrapperTag: _propTypes2.default.string,
  wrapperAttrs: _propTypes2.default.object
};

ReactAngular.defaultProps = {
  inject: {},
  isolate: false,
  scope: true,
  wrapperTag: 'div',
  wrapperAttrs: {}
};

var CONTEXT_TYPES = {
  $scope: _propTypes2.default.any
};

ReactAngular.contextTypes = CONTEXT_TYPES;

function provideAngularScopeHOC(Wrapped) {
  var wrappedName = Wrapped.displayName || Wrapped.name;
  var wrapperName = 'ProvideAngularScope (' + wrappedName + ')';

  var Wrapper = function (_Component) {
    _inherits(Wrapper, _Component);

    function Wrapper() {
      _classCallCheck(this, Wrapper);

      return _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).apply(this, arguments));
    }

    _createClass(Wrapper, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          $scope: this.props.$scope
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var _props3 = this.props,
            $scope = _props3.$scope,
            props = _objectWithoutProperties(_props3, ['$scope']);

        if (!$scope) {
          throw new Error('Angular scope was not passed as the $scope prop to ' + wrapperName + '.');
        }

        return _react2.default.createElement(Wrapped, props);
      }
    }]);

    return Wrapper;
  }(_react.Component);

  Wrapper.childContextTypes = CONTEXT_TYPES;
  Wrapper.propTypes = _extends({}, Wrapped.propTypes || {}, CONTEXT_TYPES);

  return Wrapper;
}
//# sourceMappingURL=angularTemplate.js.map