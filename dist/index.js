/*!
 * vue-input-spinner v0.1.3
 * (c) Kaan Gökdemir <kaangokdemir01@gmail.com> (https://kaangokdemir.com)
 * Released under the MIT License.
 */
'use strict';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "VueInputSpinner",
  props: {
    value: {
      type: Number,
      "default": function _default() {
        return 0;
      }
    },
    minValue: {
      type: Number,
      "default": function _default() {
        return 0;
      }
    },
    maxValue: {
      type: Number,
      "default": function _default() {
        return Math.pow(10, 1000);
      }
    },
    step: {
      type: Number,
      "default": function _default() {
        return 1;
      }
    },
    buttonClass: {
      type: [String, Array],
      "default": function _default() {
        return "vis-default-button";
      }
    },
    buttonLeftClass: {
      type: [String, Array],
      "default": function _default() {
        return "";
      }
    },
    buttonRightClass: {
      type: [String, Array],
      "default": function _default() {
        return "";
      }
    },
    inputClass: {
      type: [String, Array],
      "default": function _default() {
        return "vis-default-input";
      }
    },
    buttonLeftText: {
      type: String,
      "default": function _default() {
        return "-";
      }
    },
    buttonRightText: {
      type: String,
      "default": function _default() {
        return "+";
      }
    },
    editable: {
      type: Boolean,
      "default": function _default() {
        return true;
      }
    },
    readonly: {
      type: Boolean,
      "default": function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      dataValue: this.value // For avoid mutating a prop directly

    };
  },
  watch: {
    dataValue: function dataValue(newValue, oldValue) {
      this.$emit("input", newValue, oldValue);
    }
  },
  methods: {
    inputValue: function inputValue(event) {
      if (event.target.value) this.dataValue = parseFloat(event.target.value);
    },
    decreaseValue: function decreaseValue() {
      if (this.dataValue - this.step >= this.minValue) {
        this.dataValue -= this.step;
      } else {
        this.dataValue = this.minValue;
      }
    },
    increaseValue: function increaseValue() {
      if (this.dataValue + this.step <= this.maxValue) {
        this.dataValue += this.step;
      } else {
        this.dataValue = this.maxValue;
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue-input-spinner"
  }, [_c('button', {
    "class": _vm.buttonLeftClass || _vm.buttonClass,
    attrs: {
      "disabled": _vm.dataValue == _vm.minValue
    },
    on: {
      "click": function click($event) {
        return _vm.decreaseValue();
      }
    }
  }, [_vm._v(_vm._s(_vm.buttonLeftText))]), _vm._v(" "), _vm.editable ? _c('input', {
    "class": _vm.inputClass,
    attrs: {
      "type": "number",
      "min": _vm.minValue,
      "max": _vm.maxValue,
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.dataValue
    },
    on: {
      "input": _vm.inputValue
    }
  }) : _c('label', {
    "class": _vm.inputClass
  }, [_vm._v(_vm._s(_vm.dataValue))]), _vm._v(" "), _c('button', {
    "class": _vm.buttonRightClass || _vm.buttonClass,
    attrs: {
      "disabled": _vm.dataValue == _vm.maxValue
    },
    on: {
      "click": function click($event) {
        return _vm.increaseValue();
      }
    }
  }, [_vm._v(_vm._s(_vm.buttonRightText))])]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-ad688d34_0", {
    source: ".vue-input-spinner input::-webkit-inner-spin-button,.vue-input-spinner input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.vis-default-input{width:50px;height:50px;text-align:center;font-size:24px}.vis-default-button{width:50px;height:50px}.vue-input-spinner{display:flex;justify-content:center;height:100%;align-items:center}.vue-input-spinner label{display:flex;justify-content:center;align-items:center;height:100%;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var index = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var props = Object.assign({}, __vue_component__.props);
    Object.keys(options).forEach(function (k) {
      props[k] = {
        "default": options[k]
      };
    });
    Vue.component('vue-input-spinner', Object.assign({}, __vue_component__, {
      props: props
    }));
  }
};

module.exports = index;
