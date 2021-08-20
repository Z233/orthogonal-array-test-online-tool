import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/main.less'
import * as CSV from 'csv-string';
import './plugins/shortid';
import {Input, Checkbox, Button, Tabs, TabPane, Icon, Message, MessageBox, Tooltip} from "element-ui";

Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Icon);
Vue.use(Tooltip);

Vue.prototype.$message = Message;
Vue.prototype.$csv = CSV;
Vue.config.productionTip = false;
Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
