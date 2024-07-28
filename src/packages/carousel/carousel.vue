<template>
  <div class="zh-carousel" :style="{ height }">
    <div class="viewport">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "zh-carousel",
  props: {
    height: {
      type: String,
      default: "200px",
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 3000,
    },
    initialIndex: {
      //默认用户传递的这个值，不会变
      type: Number,
      default: 0,
    },
    loop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // currentSelected 这个值是可以被更改的
      currentSelected: this.initialIndex,
      len: 0,
      reverse: false,
    };
  },
  methods: {
    run() {
      if (this.autoplay) {
        //如果自动播放，就开始运行
        this.timer = setInterval(() => {
          let index = this.currentSelected;
          let newIndex = index - 1;
          if (newIndex === this.len) newIndex = 0;
          if (newIndex === -1) newIndex = this.len - 1;

          // 0 1 正 1 0 反
          this.reverse = index > newIndex ? true : false; //控制了正反

          // 如果是无缝滚动 0 3 反
          // 2 0 正
          if (this.loop) {
            if (index == 0 && newIndex == this.len - 1) this.reverse = true;
            if (index == this.len - 1 && newIndex == 0) this.reverse = false;
          }

          // 告诉子组件是正向移动还是返现移动
          this.children.forEach((vm) => {
            //更改子组件的数据
            console.log(vm);
            vm.reverse = this.reverse;
          });

          this.$nextTick(() => {
            this.currentSelected = newIndex;
          });
        }, this.delay);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  mounted() {
    // 让currentSelected不停地增加
    this.children = this.$children.filter(
      (item) => item.$options.name == "zh-carousel-item"
    );
    this.len = this.children.length;
    this.run();
  },
};
</script>

<style lang="scss">
.zh-carousel {
  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
