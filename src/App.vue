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

    <!-- 带icon的按钮 -->
    <zh-button type="info" icon="search">信息按钮</zh-button>
    <zh-button type="primary" icon="search"></zh-button>
    <zh-button type="primary" icon="search" icon-position="right">内容</zh-button>

    <zh-icon icon="taxi"></zh-icon>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss"></style>
