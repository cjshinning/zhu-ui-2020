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
    <zh-button type="primary" icon="search" icon-position="right"
      >内容</zh-button
    >

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

    <hr />
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

    <hr />

    <zh-row>
      <zh-col :span="6">
        <div class="red">aaa</div>
      </zh-col>
      <zh-col :span="6" :offset="12">
        <div class="green">bbb</div>
      </zh-col>
    </zh-row>

    <hr />

    <div style="width: 95%; margin: 0 auto">
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

      <hr />

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

    <hr />
    <zh-input
      v-model="value"
      type="text"
      placeholder="请输入内容"
      name="username"
    ></zh-input>
    <zh-input
      v-model="value"
      type="password"
      placeholder="请输入内容"
      name="username"
    ></zh-input>
    <zh-input
      v-model="value"
      type="password"
      :disabled="true"
      placeholder="请输入内容"
      name="username"
    ></zh-input>
    <zh-input
      v-model="value"
      type="password"
      placeholder="请输入内容"
      name="username"
      clearable
    ></zh-input>
    <zh-input
      v-model="value"
      type="password"
      placeholder="请输入内容"
      name="username"
      showPassword
    ></zh-input>
    <zh-input
      v-model="value"
      type="password"
      placeholder="请输入内容"
      name="username"
      prefix-icon="edit"
    ></zh-input>
    <zh-input
      v-model="value"
      type="password"
      placeholder="请输入内容"
      name="username"
      suffix-icon="edit"
    ></zh-input>
    {{ value }}

    <!-- 上传的功能 input type="file" name="" form ajax + formData -->
    <!-- 
      name 输入框提交到后台的字段名字 
      action 提交到后端的路径 
      limit 限制提交的个数
      on-exceed 如果超出限制后，会执行此方法
      on-change 如果上传文件的状态发生变化的时候，会触发此方法
      on-success 在上传成功的时候触发
      on-error 在上传失败的时候触发
      on-progress 上传时会多次触发
     -->
    <zh-upload
      name="avatar"
      action="http://localhost:3000/upload"
      :file-list="fileList"
      :limit="3"
      accept="image/jpeg"
      :multiple="true"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :beforeUpload="beforeUpload"
      :drag="true"
    >
      <zh-button type="primary" icon="upload">点击上传</zh-button>
      <div slot="tip">只能上传jpg文件，且不超过500kb</div>
    </zh-upload>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      value: "",
      fileList: [{ url: "xxx", name: "测试代码" }],
    };
  },
  methods: {
    fn(e) {
      console.log(e);
    },
    handleExceed(files, fileList) {
      // 超过限制
      console.log("用户传递的已经超过预期了");
    },
    handleChange(file) {
      // console.log(file);
    },
    handleSuccess() {},
    handleError() {},
    handleProgress() {},
    beforeUpload(rawFile) {
      let limitSize = rawFile.size / 1024 > 500;
      if (limitSize) {
        console.log("当前超过了最大限制");
        return false;
      } else if (!rawFile.name.endsWith(".jpg")) {
        console.log("文件类型不对");
        return false;
      }
      return true;
    },
  },
};
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
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.zh-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.zh-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .zh-container {
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
