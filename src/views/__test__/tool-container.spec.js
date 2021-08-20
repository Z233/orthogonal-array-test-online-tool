
import ToolContainer from '../../components/tool-container.vue'
import Input from '../input.vue'
import { shallowMount } from '@vue/test-utils'
import { expect } from '@jest/globals'
import Vue from 'vue'

// 隐藏不必要的警告
Vue.config.silent = true

test('renders tool container props', () => {
  const wrapper = shallowMount(Input)
  expect(wrapper.findComponent(ToolContainer).props().title).toBe('输入数据')
})