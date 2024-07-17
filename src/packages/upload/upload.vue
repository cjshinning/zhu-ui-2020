<template>
  <div class="zh-upload">
    <div class="zh-upload-btn" @click="handleClick">
      <slot></slot>
    </div>
    <input
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange"
      :name="name"
      ref="input"
      class="input"
    />
    <div>
      <slot name="tip"></slot>
    </div>

    {{ files.length }}
  </div>
</template>

<script>
export default {
  name: "zh-upload",
  props: {
    name: {
      type: String,
      default: "file",
    },
    action: {
      type: String,
      required: true,
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    limit: Number,
    accept: String,
    multiple: Boolean,
    onExceed: Function,
    onChange: Function,
    onSuccess: Function,
    onError: Function,
    onProgress: Function,
    beforeUpload: Function,
  },
  data() {
    return {
      tempIndex: 1,
      files: [], //存储要展示的列表
    };
  },
  watch: {
    // 将用户传递过来的props转换成组件的data，以后可以直接操作data，这样就不涉及子同步父的数据问题
    fileList: {
      immediate: true, //立即执行处理函数
      handler(fileList) {
        this.files = fileList.map((item) => {
          item.uid = Date.now() + this.tempIndex++;
          item.status = "success";
          return item;
        });
      },
    },
  },
  methods: {
    handleClick() {
      //   点击之前，先还原输入框
      this.$refs.input.values = "";
      this.$refs.input.click();
    },
    handleStart(rawFile) {
      // 给文件生成一个唯一的id标识
      rawFile.uid = Math.random() + this.tempIndex++;
      let file = {
        //自己构建一条文件信息
        status: "ready", //默认准备上传
        name: rawFile.name, //上传的文件名
        size: rawFile.size, //上传的文件大小
        percentage: 0, //上传的进度
        uid: rawFile.uid,
        raw: rawFile,
      };
      this.files.push(file); //将当前用户上传的文件Push到列表中，过一会儿要显示
      this.onChange && this.onChange(file);
    },
    post() {
      // 真正的上传逻辑
    },
    upload(rawFile) {
      // 上传文件
      // 先判断这个文件是否能上传，没有任何限制的话直接上传即可
      if (!this.beforeUpload) {
        // 直接上传
        return this.post(rawFile);
      } else {
        // 否则需要调用用户的函数，获取他的返回值
        let flag = this.beforeUpload(rawFile);
        if (flag) {
          //用户返回true，标识需要上传
          // 直接上传
          return this.post(rawFile);
        }
      }
    },
    uploadFiles(files) {
      // 限制上传是否达到最大条件
      if (this.limit && this.fileList.length + files.length > this.limit) {
        return this.onExceed && this.onExceed(files, this.fileList);
      }
      [...files].forEach((rawFile) => {
        // 用户的文件，需要做一些处理，可能用户频繁上传同一个文件
        // 将文件格式化成我想要的结果
        this.handleStart(rawFile); //处理上传之前
        this.upload(rawFile); //真正的上传
      });
    },
    handleChange(e) {
      // 获取选中的文件
      const files = e.target.files;
      // 多个文件如何上传 多创建几个ajax 一起传入就可以
      this.uploadFiles(files);
    },
  },
};
</script>

<style lang="scss">
.zh-upload {
  .zh-upload-btn {
    display: inline-block;
  }
  .input {
    display: none;
  }
}
</style>
