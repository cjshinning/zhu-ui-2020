<template>
  <div
    class="zh-upload-dragger"
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragleave.prevent
  >
    <zh-icon icon="upload" class="icon"></zh-icon>
    <span>将文件拖拽到此区域即可</span>
  </div>
</template>

<script>
export default {
  methods: {
    onDrop(e) {
      if (!this.accept) {
        this.$emit("file", e.dataTransfer.files);
      } else {
        // 这里可以自己进行过滤，看一下文件后缀，移除掉不需要的文件
        // [...e.dataTransfer.files].filter(file=>file.name.endsWith('jpg'))
        // 发射过滤后的文件
        this.$emit(file, e.dataTransfer.files);
      }
    },
  },
};
</script>

<style lang="scss">
.zh-upload-dragger {
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 360px;
  height: 180px;
  line-height: 180px;
  background: #eee;
  border: 1px solid #aaa;
  border-radius: 10px;
  .icon {
    width: 65px;
    height: 65px;
    margin: 65px auto 10px;
  }
}
</style>
