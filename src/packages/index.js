// 所有组件如克

import Button from './button.vue';
import Icon from './icon.vue';

const install = (Vue) => {
  Vue.component(Button.name, Button);
  Vue.component(Icon.name, Icon);
}

// 有可能通过script标签的引入方式
if (typeof window.Vue !== 'undefined') {
  install(Vue);
}

export default {
  install
}