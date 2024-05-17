<template>
  <div id="app">
    <!-- 默认按钮 -->
    <zh-button>按钮</zh-button>

    <!-- 带类型的按钮 -->
    <zh-button type="primary">主要按钮</zh-button>
    <zh-button type="warning">警告按钮</zh-button>
    <zh-button type="danger">危险按钮</zh-button>
    <zh-button type="success">成功按钮</zh-button>
    <zh-button type="info">信息按钮</zh-button>

    <br />

    <!-- 带icon的按钮 -->
    <zh-button type="info" icon="search">信息按钮</zh-button>
    <zh-button type="primary" icon="search"></zh-button>
    <zh-button type="primary" icon="search" icon-position="right">内容</zh-button>

    <br />

    <!-- loading按钮 -->
    <zh-button type="success" loading>加载中</zh-button>

    <br />

    <!-- 触发事件 -->
    <zh-button type="success" @click="fn">加载中</zh-button>

    <br />

    <zh-button-group>
      <zh-button icon="pullleft" icon-position="left">上一页</zh-button>
      <zh-button icon="pullright" icon-position="right">下一页</zh-button>
    </zh-button-group>

    <zh-icon icon="taxi"></zh-icon>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    fn(e) {
      console.log(e);
    }
  }
}
</script>

<style lang="scss"></style>
