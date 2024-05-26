import { shallowMount } from '@vue/test-utils';
import Row from '@/packages/layout/row.vue';
import Col from '@/packages/layout/col.vue';
import { expect } from 'chai';

describe('row.vue', async () => {
  it('1.测试gutter是否ok？', () => {
    let wrapper = shallowMount(Row, {
      attachToDocument: true,
      stubs: {
        'zh-col': Col
      },
      slots: {
        default: '<zh-col></zh-col>'
      },
      propsData: {
        gutter: 20
      }
    })
    expect(getComputedStyle(wrapper.vm.$el).marginLeft).to.eq('-10px');
    expect(getComputedStyle(wrapper.vm.$el).marginRight).to.eq('-10px');

    await wrapper.vm.$nextTick();
    let col = wrapper.vm.$el.querySelector('.zh-col');
    expect(getComputedStyle(el).paddingLeft).to.eq('10px');
    expect(getComputedStyle(col).paddingRight).to.eq('10px');
  })

  it('2.测试justify属性', () => {
    let wrapper = shallowMount(Row, {
      attachToDocument: true,
      stubs: {
        'zh-col': Col
      },
      slots: {
        default: '<zh-col></zh-col>'
      },
      propsData: {
        justify: 'start'
      }
    })
    expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('flex-start');
  })
})