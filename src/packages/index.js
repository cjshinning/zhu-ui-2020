// 所有组件如克

import Button from './button.vue';
import Icon from './icon.vue';
import ButtonGroup from './button-group.vue';

const install = (Vue) => {
  Vue.component(Button.name, Button);
  Vue.component(Icon.name, Icon);
  Vue.component(ButtonGroup.name, ButtonGroup);
}

// 有可能通过script标签的引入方式
if (typeof window.Vue !== 'undefined') {
  install(Vue);
}

export default {
  install
}