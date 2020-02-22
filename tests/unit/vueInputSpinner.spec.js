import { mount } from '@vue/test-utils'
import VueInputSpinner from '@/VueInputSpinner'

describe('VueInputSpinner', () => {
  const wrapper = mount(VueInputSpinner)

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('wrapping class named vue-input-spinner', () => {
    expect(wrapper.classes('vue-input-spinner')).toBe(true)
  })

  test('value equals zero default', () => {
    expect(wrapper.props('value')).toBe(0)
  })

  test('value equals zero default', () => {
    wrapper.setProps({ value: 5 })
    expect(wrapper.vm.value).toBe(5)
  })
})
