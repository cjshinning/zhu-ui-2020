<template>
  <transition>
    <div class="zh-carousel-item" v-if="isShow" :class="{ reverse }">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "zh-carousel-item",
  data() {
    let children = this.$parent.$children.filter(
      (child) => child.$options.name === "zh-carousel-item"
    );
    return {
      index: children.length - 1,
      reverse: false,
    };
  },
  // 我需要知道当前要显示的是谁，我还要知道自己是第几个
  computed: {
    isShow() {
      return this.$parent.currentSelected == this.index;
    },
  },
};
</script>

<style lang="scss">
.zh-carousel-item {
  width: 100%;
  height: 100%;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s linear;
}
.v-leave-to {
  transform: translateX(-100%);
}
.v-enter {
  transform: translateX(100%);
}
.v-leave-to.reverse {
  transform: translateX(100%);
}
.v-enter.reverse {
  transform: translateX(-100%);
}
.v-enter-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
