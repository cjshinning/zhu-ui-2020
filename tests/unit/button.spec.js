import { shallowMount } from '@vue/test-utils'; //vue提供的快速测试的方法
import { expect } from 'chai';

import Button from '@/packages/button.vue';
import Icon from '@/packages/icon.vue';

describe('button.vue', () => {
  it('1.测试button能否正常显示', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'zhu-ui'
      }
    });
    expect(wrapper.text()).to.eq('zhu-ui');
  })
  it('2.测试icon传入能否正常显示', () => {
    const wrapper = shallowMount(Button, {
      stubs: {
        'zh-icon': Icon
      },
      propsData: {
        icon: 'edit'
      }
    });
    expect(wrapper.find('use').attributes('href')).to.eq('#icon-edit');
  })
  it('3.测试loading按钮是否禁用', () => {
    const wrapper = shallowMount(Button, {
      stubs: {
        'zh-icon': Icon
      },
      propsData: {
        loading: true
      }
    });
    expect(wrapper.find('use').attributes('href')).to.eq('#icon-loading');
    expect(wrapper.find('use').attributes('disabled')).to.eq('disabled');
  })
  it('4.测试按钮是否能正常点击', () => {
    const wrapper = shallowMount(Button, {
      stubs: ['zh-icon'], //不去渲染icon
      propsData: {
        loading: true
      }
    });
    console.log(wrapper.vm.$el);
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click').length).to.eq(1);
  })
  it('5.按钮传入position是否正常显示', () => {
    const wrapper = shallowMount(Button, {
      stubs: {
        'zh-icon': Icon
      },
      slotsL: {
        default: 'zhu-ui'
      },
      propsData: {
        iconPosition: 'left',
        icon: 'edit'
      }
    });
    let ele = wrapper.vm.$el.querySelector('span');
    expect(getComputedStyle(ele).order).to.eq(2);
    wrapper.setProps({ iconPosition: 'right' });
    return wrapper.vm.$nextTick().then(() => {
      expect(getComputedStyle(ele).order).to.be('1');
    })
  })
})