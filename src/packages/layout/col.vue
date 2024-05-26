<template>
  <div class="zh-col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'zh-col',
  data() {
    return { gutter: 0 }
  },
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      offset: 0
    }
  },
  computed: {
    colClass() {  //统一管理我们的样式
      let classes = [];
      classes.push(`zh-col-${this.span}`);
      if (this.offset) {
        classes.push(`zh-col-offset-${this.offset}`)
      }
      return classes;
    },
    colStyle() {
      let style = {};
      if (this.gutter) {
        style = {
          ...style,
          paddingLeft: this.gutter / 2 + 'px',
          paddingRight: this.gutter / 2 + 'px'
        }
      }
      return style;
    }
  }
}
</script>

<style lang="scss">
@for $i from 1 through 24 {
  .zh-col-#{$i} {
    width: $i/24*100%;
  }

  .zh-col-offset-#{$i} {
    margin-left: $i/24*100%;
  }
}
</style>