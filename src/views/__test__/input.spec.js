import { mount, createLocalVue } from '@vue/test-utils'
import Input from '../input.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import store from '../../store';
import * as CSV from 'csv-string'
import { Message } from 'element-ui'
import { expect } from '@jest/globals';

Vue.config.silent = true
Vue.prototype.$csv = CSV
Vue.prototype.$message = Message

const localVue = createLocalVue()
localVue.use(Vuex)

test('generate test case', () => {
  const wrapper = mount(Input, { store })
  wrapper.vm.getRes([["男","女"],["1 班","2 班"],["及格","不及格"]], [[0,0,0],[0,1,1],[1,0,1],[1,1,0]])
  expect(wrapper.vm.$store.state.res).toStrictEqual([
    [],
    ["男", "1 班", "及格"],
    ["男", "2 班", "不及格"],
    ["女", "1 班", "不及格"],
    ["女", "2 班", "及格"]
  ])
})