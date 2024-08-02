import { shallowMount } from "@vue/test-utils";

import Carousel from "@/packages/carousel/carousel.vue";
import CarouselItem from "@/packages/carousel/carousel-item.vue";
import Button from "@/packages/button/button.vue";
import Icon from "@/packages/icon.vue";

import { expect } from "chai";
// 套件
describe("测试当前Carousel组件", () => {
  it("测试 initialIndex 传入后是否符合预期 1", () => {
    let wrapper = shallowMount(Carousel, {
      attachToDocument: true, //启动浏览器，跑在浏览器上
      stubs: {
        "zh-carousel-item": CarouselItem,
        "zh-button": Button,
        "zh-icon": Icon,
      },
      slots: {
        default: `
            <zh-carousel-item>
                <div class="content" style="background: red">内容1</div>
            </zh-carousel-item>
            <zh-carousel-item>
                <div class="content" style="background: blue">内容2</div>
            </zh-carousel-item>
            <zh-carousel-item>
                <div class="content" style="background: yellow">内容3</div>
            </zh-carousel-item>
                `,
      },
      propsData: {
        initialIndex: 0,
      },
    });
    let item = wrapper.findAll(".content");
    expect(item.length).to.eq(1);
    expect(item.at(0).text()).to.eq("内容1");
  });

  // 触发点击事件
});
