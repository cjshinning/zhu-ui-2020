import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import zhuUi from './packages/index';

Vue.use(zhuUi);

new Vue({
  render: h => h(App),
}).$mount('#app')
