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

    <hr>
    <zh-row>
      <zh-col :span="12">
        <div class="red">aaa</div>
      </zh-col>
      <zh-col :span="12">
        <div class="red">bbb</div>
      </zh-col>
    </zh-row>
    <zh-row>
      <zh-col :span="24">
        <div class="green"></div>
      </zh-col>
    </zh-row>

    <hr>

    <zh-row>
      <zh-col :span="6">
        <div class="red">aaa</div>
      </zh-col>
      <zh-col :span="6" :offset="12">
        <div class="green">bbb</div>
      </zh-col>
    </zh-row>

    <hr>

    <div style="width: 95%; margin: 0 auto;">
      <zh-row :gutter="20">
        <zh-col :span="6">
          <div class="red">aaa</div>
        </zh-col>
        <zh-col :span="6">
          <div class="green">bbb</div>
        </zh-col>
        <zh-col :span="6">
          <div class="red">aaa</div>
        </zh-col>
        <zh-col :span="6">
          <div class="green">bbb</div>
        </zh-col>
      </zh-row>

      <hr>

      <zh-row justify="space-around">
        <zh-col :span="3">
          <div class="red">aaa</div>
        </zh-col>
        <zh-col :span="3">
          <div class="red">aaa</div>
        </zh-col>
      </zh-row>
    </div>


    <zh-container>
      <zh-header>Header</zh-header>
      <zh-container>
        <zh-aside width="200px">Aside</zh-aside>
        <zh-container>
          <zh-main>Main</zh-main>
          <zh-footer>Footer</zh-footer>
        </zh-container>
      </zh-container>
    </zh-container>

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

<style lang="scss">
.red {
  background: red;
}

.green {
  background: green;
}

.zh-header,
.zh-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.zh-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.zh-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body>.zh-container {
  margin-bottom: 40px;
}

.zh-container:nth-child(5) .zh-aside,
.zh-container:nth-child(6) .zh-aside {
  line-height: 260px;
}

.zh-container:nth-child(7) .zh-aside {
  line-height: 320px;
}
</style>
