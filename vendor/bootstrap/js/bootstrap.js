/*!
 * Bootstrap v4.0.0-beta (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
}

(function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
})(jQuery);

(function () {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'

    // shoutout AngusCroll (https://goo.gl/pxwQGp)
  };function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');
      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      }

      try {
        var $selector = $(selector);
        return $selector.length > 0 ? selector : null;
      } catch (error) {
        return null;
      }
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Alert = function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    // getters

    // public

    Alert.prototype.close = function close(element) {
      element = element || this._element;

      var rootElement = this._getRootElement(element);
      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    Alert.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Alert.prototype._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = $(selector)[0];
      }

      if (!parent) {
        parent = $(element).closest('.' + ClassName.ALERT)[0];
      }

      return parent;
    };

    Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);

      $(element).trigger(closeEvent);
      return closeEvent;
    };

    Alert.prototype._removeElement = function _removeElement(element) {
      var _this2 = this;

      $(element).removeClass(ClassName.SHOW);

      if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);
        return;
      }

      $(element).one(Util.TRANSITION_END, function (event) {
        return _this2._destroyElement(element, event);
      }).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Alert.prototype._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    };

    // static

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Button = function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    // getters

    // public

    Button.prototype.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }
            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    Button.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // static

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key
  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    TOUCHEND: 'touchend' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Carousel = function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this.touchTimeout = null;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    // getters

    // public

    Carousel.prototype.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      if (!document.hidden) {
        this.next();
      }
    };

    Carousel.prototype.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    Carousel.prototype.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    Carousel.prototype.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    Carousel.prototype.to = function to(index) {
      var _this3 = this;

      this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event.SLID, function () {
          return _this3.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    Carousel.prototype.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);

      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    };

    // private

    Carousel.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Carousel.prototype._addEventListeners = function _addEventListeners() {
      var _this4 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN, function (event) {
          return _this4._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event.MOUSEENTER, function (event) {
          return _this4.pause(event);
        }).on(Event.MOUSELEAVE, function (event) {
          return _this4.cycle(event);
        });
        if ('ontouchstart' in document.documentElement) {
          // if it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          $(this._element).on(Event.TOUCHEND, function () {
            _this4.pause();
            if (_this4.touchTimeout) {
              clearTimeout(_this4.touchTimeout);
            }
            _this4.touchTimeout = setTimeout(function (event) {
              return _this4.cycle(event);
            }, TOUCHEVENT_COMPAT_WAIT + _this4._config.interval);
          });
        }
      }
    };

    Carousel.prototype._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
        default:
          return;
      }
    };

    Carousel.prototype._getItemIndex = function _getItemIndex(element) {
      this._items = $.makeArray($(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    };

    Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;
      var activeIndex = this._getItemIndex(activeElement);
      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);
      var fromIndex = this._getItemIndex($(this._element).find(Selector.ACTIVE_ITEM)[0]);
      var slideEvent = $.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });

      $(this._element).trigger(slideEvent);

      return slideEvent;
    };

    Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    Carousel.prototype._slide = function _slide(direction, element) {
      var _this5 = this;

      var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
      var activeElementIndex = this._getItemIndex(activeElement);
      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
      var nextElementIndex = this._getItemIndex(nextElement);
      var isCycling = Boolean(this._interval);

      var directionalClassName = void 0;
      var orderClassName = void 0;
      var eventDirectionName = void 0;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

        $(nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);

        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

          $(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

          _this5._isSliding = false;

          setTimeout(function () {
            return $(_this5._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        $(activeElement).removeClass(ClassName.ACTIVE);
        $(nextElement).addClass(ClassName.ACTIVE);

        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    };

    // static

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Default, $(this).data());

        if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
          $.extend(_config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (data[action] === undefined) {
            throw new Error('No method named "' + action + '"');
          }
          data[action]();
        } else if (_config.interval) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = $.extend({}, $(target).data(), $(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));
      var tabToggles = $(Selector.DATA_TOGGLE);
      for (var i = 0; i < tabToggles.length; i++) {
        var elem = tabToggles[i];
        var selector = Util.getSelectorFromElement(elem);
        if (selector !== null && $(selector).filter(element).length > 0) {
          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this6 = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(this._parent).children().children(Selector.ACTIVES));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this6._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

        _this6._element.style[dimension] = '';

        _this6.setTransitioning(false);

        $(_this6._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this7 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      if (this._triggerArray.length) {
        for (var i = 0; i < this._triggerArray.length; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);
          if (selector !== null) {
            var $elem = $(selector);
            if (!$elem.hasClass(ClassName.SHOW)) {
              $(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this7.setTransitioning(false);
        $(_this7._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this8 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this8._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.SHOW);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    if (!/input|textarea/i.test(event.target.tagName)) {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    $(selector).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY);
      var config = data ? 'toggle' : $trigger.data();
      Collapse._jQueryInterface.call($target, config);
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);

/* global Popper */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * Check for Popper dependency
   * Popper - https://popper.js.org
   */
  if (typeof Popper === 'undefined') {
    throw new Error('Bootstrap dropdown require Popper.js (https://popper.js.org)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + '|' + ARROW_DOWN_KEYCODE + '|' + ESCAPE_KEYCODE);

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY,
    KEYUP_DATA_API: 'keyup' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left'
  };

  var Selector = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled)'
  };

  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end'
  };

  var Default = {
    placement: AttachmentMap.BOTTOM,
    offset: 0,
    flip: true
  };

  var DefaultType = {
    placement: 'string',
    offset: '(number|string)',
    flip: 'boolean'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Dropdown = function () {
    function Dropdown(element, config) {
      _classCallCheck(this, Dropdown);

      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);
      var isActive = $(this._menu).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      var element = this._element;
      // for dropup with alignment we use the parent as popper container
      if ($(parent).hasClass(ClassName.DROPUP)) {
        if ($(this._menu).hasClass(ClassName.MENULEFT) || $(this._menu).hasClass(ClassName.MENURIGHT)) {
          element = parent;
        }
      }
      this._popper = new Popper(element, this._menu, this._getPopperConfig());

      // if this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {
        $('body').children().on('mouseover', null, $.noop);
      }

      this._element.focus();
      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName.SHOW);
      $(parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
      this._menu = null;
      if (this._popper !== null) {
        this._popper.destroy();
      }
      this._popper = null;
    };

    Dropdown.prototype.update = function update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      var _this9 = this;

      $(this._element).on(Event.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();
        _this9.toggle();
      });
    };

    Dropdown.prototype._getConfig = function _getConfig(config) {
      var elementData = $(this._element).data();
      if (elementData.placement !== undefined) {
        elementData.placement = AttachmentMap[elementData.placement.toUpperCase()];
      }

      config = $.extend({}, this.constructor.Default, $(this._element).data(), config);

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Dropdown.prototype._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);
        this._menu = $(parent).find(Selector.MENU)[0];
      }
      return this._menu;
    };

    Dropdown.prototype._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element).parent();
      var placement = this._config.placement;

      // Handle dropup
      if ($parentDropdown.hasClass(ClassName.DROPUP) || this._config.placement === AttachmentMap.TOP) {
        placement = AttachmentMap.TOP;
        if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }
      return placement;
    };

    Dropdown.prototype._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    Dropdown.prototype._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: {
            offset: this._config.offset
          },
          flip: {
            enabled: this._config.flip
          }
        }

        // Disable Popper.js for Dropdown in Navbar
      };if (this._inNavbar) {
        popperConfig.modifiers.applyStyle = {
          enabled: !this._inNavbar
        };
      }
      return popperConfig;
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));
      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var context = $(toggles[i]).data(DATA_KEY);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;
        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }

        // if this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
          $('body').children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(dropdownMenu).removeClass(ClassName.SHOW);
        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!REGEXP_KEYDOWN.test(event.which) || /button/i.test(event.target.tagName) && event.which === SPACE_KEYCODE || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();
    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    NAVBAR_TOGGLER: '.navbar-toggler'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Modal = function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    // getters

    // public

    Modal.prototype.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    Modal.prototype.show = function show(relatedTarget) {
      var _this10 = this;

      if (this._isTransitioning) {
        return;
      }

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });

      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();
      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this10. p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   6 9 5 0 f 7 b a - 7 0 c 1 - 4 5 9 e - b 6 3 b - 2 6 e 4 2 9 0 e 9 b 4 b . t m p     ¿Ë        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   6 b 7 c 6 0 f 8 - 2 b 8 b - 4 a 6 6 - 9 2 8 7 - e 3 8 9 e a 6 2 f a 0 a . t m p     ¿Ë        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   7 1 4 c 9 8 a 5 - 1 1 b 5 - 4 a b 0 - 9 b 1 5 - 3 a c c 4 1 c c e 5 5 e . t m p     ¿Ë        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   9 4 1 f d a 6 3 - 1 5 1 9 - 4 5 a 8 - a 5 6 4 - 8 4 9 8 0 c 3 9 f e 5 a . t m p     ¿Ë        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   c 7 3 2 5 b 5 6 - 9 5 6 c - 4 6 a 1 - a 0 d 6 - d c 3 0 9 2 a 5 8 2 7 6 . t m p     ¿Ë        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   c f 3 e 5 4 5 3 - 4 a 5 2 - 4 0 c 6 - a 1 f 1 - 4 3 c 6 8 3 e 1 f 3 e 4 . t m p     ¿Ë        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   e 9 1 3 3 2 0 7 - f 6 c d - 4 4 5 d - a 1 2 0 - 4 6 6 c 5 3 d 5 c 1 f b . t m p     ¿Ë        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   f 1 7 4 3 a d 0 - d 5 c 6 - 4 b 0 c - 9 4 b 6 - 6 3 c 5 0 a 9 0 7 2 2 e . t m p     ¿Ë        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     1 7 4 e 9 1 8 a a b a 7 f 7 2 7 1 0 1 2 3 d b a b 8 9 c 5 4 0 a     DË        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     4 6 b b d 2 0 e f 0 2 1 5 7 6 0 a 5 b 8 0 9 0 8 b 3 9 3 9 6 1 f     Ë        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     6 6 d 5 e 1 8 d c 6 1 a 2 c 7 b b b 2 d 2 5 7 a 4 2 d 6 0 4 3 b     ùÊ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     9 a 2 2 4 b f 8 4 4 8 d 0 c 3 2 6 a e 6 d 8 e a 5 e b 5 f 6 6 d     ÖÊ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     4 c 7 0 e 6 0 9 3 6 4 a 6 6 f c 4 3 4 a 8 7 3 4 4 a 7 8 4 4 f 9     ²Ê        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     c 0 b b f a c c 8 7 9 d 5 f 1 e a 8 f 5 3 f f 1 9 d c 3 b b 0 e     	Ê        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     f 3 9 b e c 4 9 f 6 a 1 b d c 4 f 5 4 2 b 3 3 4 1 8 e 7 d 7 0 d     UÉ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   0 7 a e a 6 3 1 - 7 2 5 2 - 4 f 7 a - 8 7 b f - c 9 b 8 c 9 b 9 d 5 3 b . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   0 8 9 b 2 3 7 0 - a 8 9 f - 4 e 1 5 - a 3 d 1 - 2 8 2 3 e 7 d d 9 0 d 4 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   0 e 4 2 3 9 f 1 - e 2 5 5 - 4 5 e b - 8 f 5 7 - 9 8 1 c d f 8 6 8 b b 5 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   0 f 0 1 3 0 a 8 - 4 0 b 6 - 4 b c 0 - a 5 1 0 - 8 1 6 2 d e 2 7 d 3 3 b . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   1 5 1 c 1 7 d 2 - e 8 d 6 - 4 f 3 e - b f 2 f - 2 8 0 8 9 5 e 0 0 a e 2 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   1 b 9 d 0 3 4 c - 0 3 c 1 - 4 9 9 4 - a a a b - 1 a 6 a 0 3 b a c 7 4 f . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   2 b e f d 8 b 2 - 7 e 0 2 - 4 e 0 f - 9 f 4 9 - 1 7 a 0 b 7 9 1 0 a a e . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   3 a e 4 f 3 2 a - 5 b 7 f - 4 c 9 4 - a 6 1 b - 7 3 1 c 7 6 4 d 7 a 0 6 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   3 c 4 1 d 2 8 2 - d a f 7 - 4 2 2 d - 8 7 0 9 - 8 d 5 d 8 9 5 1 a 7 1 9 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   3 d a 0 1 a d e - 7 9 c 3 - 4 2 2 4 - a 6 1 c - 3 8 0 2 d 7 f 3 0 2 1 7 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   4 4 a 8 c b 5 8 - 3 8 c c - 4 d c d - 8 3 4 e - 9 6 3 5 6 2 b 9 7 8 5 c . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   4 e d 3 c 6 a e - 6 b 4 0 - 4 1 b d - b 0 7 d - 9 4 5 9 5 3 d 7 d d 3 2 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   5 0 8 6 b a 4 7 - d f f 9 - 4 6 f 7 - b e 6 5 - f c 9 0 9 8 6 0 c d a 4 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   5 b 9 c 1 e 5 e - 9 b 3 e - 4 2 a a - 8 5 0 8 - 0 8 8 0 7 3 c 9 5 b d c . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   5 f 2 9 d 8 9 5 - 7 9 0 e - 4 f 5 6 - a 2 7 4 - 1 d b e 0 8 5 7 7 2 5 4 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   6 0 3 3 4 7 e e - 6 e b c - 4 d 6 e - 9 9 2 c - 6 3 0 3 4 3 6 5 c 1 8 c . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   6 5 1 f d b 3 1 - 6 2 c 6 - 4 0 4 e - 9 5 a c - a 3 e a 1 2 3 6 2 1 5 0 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   6 e 1 9 8 0 5 9 - 4 3 0 e - 4 d 1 e - b e 3 a - 7 9 c 3 9 2 8 1 a d 7 2 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   7 d 1 8 4 3 0 f - 5 8 2 8 - 4 f 6 f - a d 4 8 - 6 5 d 7 b 2 0 3 4 b 7 9 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   8 6 e 6 b 2 4 3 - 4 7 c 7 - 4 8 c a - 9 3 c 4 - d c e e c 7 c 8 8 7 a b . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   9 3 c 4 6 b a b - e 7 2 7 - 4 f 9 0 - 8 e 1 3 - 4 e 9 6 c a 8 f c 9 f 0 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   9 5 9 f b f d 5 - 7 9 f 7 - 4 7 6 3 - 9 c 1 3 - e 8 5 8 7 f 7 d c 5 4 9 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   9 7 9 7 a 9 b 5 - 8 6 c 3 - 4 9 a e - 8 8 0 e - b 7 c a 3 f d 5 8 6 0 9 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   9 8 3 8 6 9 d 3 - c 3 2 a - 4 2 5 1 - b 3 7 7 - b 1 a 2 0 7 c 3 b 9 9 c . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   9 9 e 9 7 6 f 8 - 7 a f 8 - 4 e 0 8 - 9 0 6 a - e c c 0 7 a d 8 c d 8 c . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   a f 0 b 1 3 f 9 - f c 2 3 - 4 e f 8 - 9 c 9 1 - 2 6 8 5 7 e d 8 8 0 f 1 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   b 4 e 2 e 7 7 0 - 2 c e 8 - 4 8 3 5 - a 8 5 7 - 1 f 6 5 9 4 5 5 8 7 9 a . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   b f 6 0 5 c 8 d - a 6 a d - 4 7 9 2 - 9 8 8 c - 1 e 5 4 3 d d 1 4 8 c d . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   c 2 7 1 8 a e 8 - e 2 5 d - 4 9 b 1 - 8 c 0 2 - d 7 f c 5 a 2 2 4 b c 2 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   c 7 7 4 1 1 e d - 5 1 f c - 4 0 3 0 - 8 2 8 2 - 1 8 2 d 5 8 b 9 a 9 c d . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   d 4 0 7 3 a 8 e - d f 7 d - 4 d 1 e - 8 e 3 a - e 0 f 0 0 2 3 5 f 1 8 f . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   e 3 a 4 1 4 f b - 3 6 2 9 - 4 e 9 7 - b 5 b e - b 5 7 1 5 4 d 6 8 8 3 7 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   e a c 7 8 a a 3 - 4 7 a c - 4 2 3 8 - b 1 8 f - a f 5 e 1 7 c a 2 8 2 f . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   f 0 1 2 2 9 5 2 - 6 8 d 2 - 4 a b 6 - 9 1 1 e - 2 f d b 3 b f 8 4 8 a 4 . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   f d 4 9 c 5 6 a - 9 0 5 a - 4 8 0 5 - 9 3 6 3 - a d 2 9 7 b 7 8 1 a c f . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p (   f d b 9 5 a a 9 - 9 5 5 3 - 4 6 4 5 - a b 5 4 - b 4 e 4 f 0 c a 9 c 1 a . t m p     âÇ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     b b 2 4 9 3 5 2 b 6 f 9 5 2 9 e 4 3 e f 9 1 b 7 4 6 6 5 8 e a 8     ®Ç        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     d d 0 f 3 0 9 0 2 f c 6 c e 2 2 b 9 a 4 1 d a e 3 8 5 3 f 0 6 1     •Æ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     2 0 e e 9 8 e b 3 7 c 4 1 7 a c b 9 5 3 3 5 0 a 0 6 d e 5 9 2 2     dÆ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 1 2 7 3 3 7 1 6 5 1 5 4 7 5 3 7 1 6 1 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 1 5 2 3 9 7 7 3 6 6 6 5 4 7 0 1 9 2 6 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 2 0 9 4 5 5 6 7 2 7 6 2 2 3 5 4 5 0 7 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 3 0 8 0 2 6 1 1 6 7 0 6 0 6 8 8 7 8 9 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 3 2 2 7 0 6 2 0 6 9 3 0 2 4 8 1 1 1 7 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 3 3 7 4 0 4 2 4 6 0 2 6 6 3 5 9 2 0 8 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 3 5 4 6 3 3 7 8 6 8 7 6 1 4 6 2 3 7 2 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 3 7 8 3 8 8 8 5 2 3 1 0 7 0 2 3 1 1 3 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 4 3 4 1 2 0 7 2 8 6 3 9 8 9 7 7 1 2 2 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 4 5 3 5 9 3 2 3 7 7 0 1 4 2 2 3 9 3 0 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 4 8 7 5 5 1 9 3 9 8 1 2 1 6 6 5 3 5 8 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 5 2 4 7 4 5 2 7 0 0 5 3 3 2 6 7 9 3 8 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 6 0 3 2 8 6 6 1 3 0 0 4 2 1 3 8 4 9 6 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 6 6 9 4 9 5 2 0 6 3 1 5 2 4 1 0 4 3 9 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 7 0 5 9 4 0 9 9 4 7 6 6 1 7 6 9 9 5 8 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 7 0 8 9 8 9 2 3 6 5 7 9 1 6 3 9 0 5 1 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 7 3 2 4 3 7 1 3 8 8 6 1 6 3 4 6 5 8 4 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 7 9 9 8 5 7 9 7 6 2 7 7 7 7 9 1 3 0 9 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 8 3 6 5 6 6 2 7 6 2 2 5 1 7 5 4 1 2 6 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 8 3 7 4 3 7 8 2 0 5 6 6 6 3 0 6 2 3 9 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    + ~ J F 9 6 8 6 8 7 7 3 3 3 3 7 6 9 2 4 6 0 . t m p     ”Å        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     4 f 9 4 b 8 4 e c a 1 e 3 f 6 8 6 f 5 d f d 2 6 e c 4 9 2 2 a 7     rÅ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     3 3 f c 7 4 d d 5 b c b 4 9 d 4 7 e c c 5 2 6 c e e a c 9 2 e 6     ÀÃ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     3 c 3 9 8 c f 2 2 9 7 4 8 8 8 a a 8 2 9 6 d f 1 a 5 a 0 1 3 d d     óÀ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     3 9 7 4 a e 2 4 5 e 2 6 f e 7 4 b 8 1 b 1 a c a 3 7 9 3 f 1 2 4     ‚¾        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     3 1 f 8 d 3 4 b e 2 4 d 1 3 e 6 4 b 1 e 2 4 e 5 c 1 1 c 6 8 8 e     4½        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     f d 9 a 2 1 1 b 1 c 7 8 5 6 3 c b a c 8 a 7 b d 8 3 1 8 5 d 7 d     ñ¼        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     1 5 d c 1 b e 8 5 0 0 0 8 3 d c 2 4 2 c 6 4 3 8 6 f 9 f 9 d 8 3     à¼        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     7 0 a 0 e 5 4 c c b 3 d 6 3 e 6 0 f b 4 9 c f c a 2 a b c 9 3 c     ´¼        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     5 1 8 3 3 9 6 c 6 e e f a e 2 1 d 9 6 e a c e c b a 7 4 7 f 5 e     ^¼        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     8 6 8 5 a e 0 a e 6 3 2 4 1 8 a e e f 9 0 e f 3 c c 8 e 8 6 d 1     vº        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     c 4 4 2 e f 5 3 8 a b 8 3 d a d e 4 7 8 3 e 7 8 9 8 8 5 2 f 2 9     ø¹        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     3 e 2 6 5 2 9 8 1 0 b c 2 b 5 6 3 b 2 1 e 8 b f 9 1 0 5 9 c e 7     2¹        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     1 c 5 d 4 2 6 a 0 6 7 c 8 a 5 8 4 c e 9 b 0 e a 9 3 1 6 e 7 3 4     ¸        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     8 b 5 c 4 d f f 6 1 4 6 4 3 3 1 f 5 f 1 a 4 9 1 a 6 7 5 3 e c d     y¶        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     7 d 5 b 9 c 0 1 9 d e 7 8 b 8 7 b 0 1 8 5 7 8 6 5 4 d 1 1 c 7 d     Èµ        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     7 1 c 6 3 5 c 2 b 3 9 b 0 2 a e 9 d 0 f 4 2 8 0 b a 5 2 1 e 4 b     h´        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     7 5 b 7 c 4 7 0 3 f 1 c d 2 b 7 c a f 5 d a 8 a 3 2 0 8 a d c 3     T³        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     9 8 3 c 8 4 2 a 2 d f 3 d d c 7 c 6 d 1 0 6 b 2 f 1 5 c b 8 b c     -³        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p    R B X - B A 2 6 A 5 F 1 . l o g     ¼²        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     b d 2 5 0 4 d 4 2 9 1 b 2 4 4 7 f 6 0 2 8 e e 3 3 b 8 f a 4 5 4     œ±        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     a e 0 2 c 4 a 6 7 8 8 2 d c a e 3 f 0 2 2 7 9 a 2 d d 1 e 7 8 1     ˜±        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     4 9 c 7 2 6 7 7 2 d b a 3 b 5 9 c f 1 e e f f 1 1 0 1 1 f f d 5     Š±        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  .   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p \ R o b l o x \ h t t p     d 7 5 e 2 d 3 b d c 3 e b 9 c c 5 6 d 1 f 3 1 0 a 3 a 3 2 f 1 e     Y±        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   1 7 8 9 0 9 b a - c 4 8 7 - 4 0 e f - b 4 d 1 - 4 d 7 2 7 7 9 5 9 b 3 a . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   2 c 9 6 0 0 0 d - 3 d 4 6 - 4 0 e c - 9 6 0 e - 0 9 0 3 e a 9 1 6 3 1 1 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   3 2 1 b c d 4 f - c a f 7 - 4 4 2 7 - b e f f - f e 6 a a d 9 d f 7 3 c . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   3 a 7 8 3 c d 5 - c a b 7 - 4 c 3 6 - 8 e 6 d - 1 d 6 8 1 7 d c 3 d d 1 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   3 f 1 4 3 3 1 f - 5 1 8 d - 4 f 8 5 - a c d d - c e 1 3 3 1 5 9 1 4 5 f . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   4 e c f 2 9 7 d - 3 a 2 a - 4 c 0 8 - 9 7 4 9 - 1 d 3 c a 8 d 8 e c 1 1 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   5 0 f e 2 4 0 c - 2 8 9 7 - 4 9 4 2 - 9 0 2 f - f 3 3 3 0 a 8 a 0 3 f 0 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   5 d 0 2 f a 5 1 - 1 d 3 2 - 4 8 6 d - a 9 7 e - 1 f c 8 2 0 5 a f 5 9 9 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   6 3 d e 6 4 5 d - b 5 6 9 - 4 e 8 9 - a 4 f 0 - a e a a 0 6 8 5 e 4 2 5 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   7 b 4 0 b b 4 2 - a c f 5 - 4 d 6 8 - b 5 8 9 - b 0 c 3 d e 8 e 1 6 9 c . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   7 d 2 3 9 7 7 7 - b 6 8 0 - 4 5 4 e - 9 5 1 7 - c 3 e c e 9 5 c 0 2 8 0 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   8 0 a b 2 d 0 5 - f 6 f c - 4 6 6 9 - a b 3 5 - 1 6 9 1 0 a f 8 0 d 2 a . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   9 3 5 e c e b 6 - b 9 c c - 4 f 5 f - 8 4 e 2 - 1 3 7 e 0 d f 5 a d 2 e . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   9 3 9 6 b d 4 1 - 0 c d 4 - 4 7 9 6 - b 2 7 d - e e e 2 7 3 a 5 d 8 0 6 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   9 d 1 b 3 c 1 5 - a 4 6 9 - 4 2 e e - 8 6 8 a - 5 2 b 5 a d 1 0 3 8 4 3 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   9 d b 6 6 d 0 c - f e 9 1 - 4 d 5 f - a 2 4 b - 5 2 5 4 0 7 f d 4 4 b 3 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   a f a 3 b 6 d 9 - d 5 b a - 4 c 9 2 - 9 3 8 b - f f a 6 a a a d f b 3 5 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   b 8 6 0 1 6 d b - 8 f e 0 - 4 6 6 3 - b b f 4 - 5 8 4 2 0 6 1 e 5 f 9 a . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   b b 6 d c 4 5 1 - e 9 b 4 - 4 7 2 2 - 9 1 3 0 - d c 9 3 9 7 2 6 d 9 8 1 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   e e c 6 6 0 2 1 - 5 4 3 2 - 4 2 e 6 - b 2 2 8 - f c b c b c f 8 3 c 6 f . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   f 0 4 d f 3 1 b - 9 2 5 f - 4 a a 9 - b 6 9 0 - 6 e 6 b f e f 2 5 4 a 7 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l e s  "   C : \ U s e r s \ 0 A 3 6 ~ 1 \ A p p D a t a \ L o c a l \ T e m p -   f 7 9 6 f 1 5 2 - d 6 0 4 - 4 3 a d - 8 6 4 9 - 6 6 c 3 7 6 c 6 2 8 e 3 . t m p . n o d e      °        W i n T e m p F i l e s    D i s k C l e a n u p _ W i n d o w s T e m p F i l e s #   D i s k C l e a n u p _ W i n d o w s T e m p F i l e s T o o l t i p    t e m p o r a r y F i l e s T e m p    T e m p o r a r y   f i l------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var CLASS_PREFIX = 'bs-popover';
  var BSCLS_PREFIX_REGEX = new RegExp('(^|\\s)' + CLASS_PREFIX + '\\S+', 'g');

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Popover = function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
    }

    // overrides

    Popover.prototype.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    Popover.prototype.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + '-' + attachment);
    };

    Popover.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Popover.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      // we use append for html objects to maintain js events
      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);
    };

    // private

    Popover.prototype._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
    };

    Popover.prototype._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    // static

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: 'VERSION',


      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  }(Tooltip);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}(jQuery);


})();