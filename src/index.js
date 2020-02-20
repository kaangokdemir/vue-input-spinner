import VueInputSpinner from './VueInputSpinner.vue'

export default {
  install(Vue, options = {}) {
    let props = { ...VueInputSpinner.props }
    Object.keys(options).forEach(k => {
      props[k] = { default: options[k] }
    })
    Vue.component('vue-input-spinner', { ...VueInputSpinner, props })
  }
}
