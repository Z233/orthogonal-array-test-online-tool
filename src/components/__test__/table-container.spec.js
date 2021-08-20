import TableContainer from '../table-container.vue'
import Vue from 'vue'

describe('table-container.vue', () => {
  test('renders table container', () => {
    const Ctor = Vue.extend(TableContainer)
    const vm = new Ctor().$mount()
    expect(vm._vnode.data.staticClass).toBe('table-container')
  })
})