<template>
  <div :class="imageUrl ? 'cupload' : 'upload'">
    <el-upload
      action
      list-type="picture-card"
      :before-upload="beforeUpload"
      :http-request="uploadFile"
      :file-list="fileList"
      :imageUrl="imageUrl"
      :index="index"
      :limit="1"
      :auto-upload="true"
    >
      <i class="el-icon-plus"></i>
      <template #file>
        <div class="imgBox">
          <img
            v-show="!loading"
            class="el-upload-list__item-thumbnail"
            :src="`data:image/png;base64,${imageUrl}`"
            alt=""
          />
          <i v-show="loading" class="el-icon-loading"></i>
          <span v-show="!loading" class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </template>
      <template #tip>
        <div class="tip">图片大小1MB以内，支持jpg，png，pdf格式</div>
      </template>
    </el-upload>
    <el-dialog width="800px" v-model="dialogVisible">
      <img class="img" :src="`data:image/png;base64,${imageUrl}`" alt="" />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch, defineEmits } from "vue";
import { ElMessage } from "element-plus";
const props = defineProps({
  imageUrl: {
    type: String,
    default: "",
  },
  index: {
    type: Number,
    default: 0,
  },
  imgSize: {
    type: Number,
    default: 1,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
interface FileListType {
  url: string;
}
const emit = defineEmits(["uploadFile", "handleRemove"]);
let fileList = ref<FileListType[]>([]);
const dialogImageUrl = ref<string>("");
const dialogVisible = ref<boolean>(false);
const disabled = ref<boolean>(false);
if (!props.imageUrl) {
  fileList.value = [];
} else {
  fileList.value.push({ url: props.imageUrl });
}

watch(
  () => props.imageUrl,
  (newVal) => {
    if (!newVal) {
      fileList.value = [];
    } else {
      !fileList.value.length && fileList.value.push({ url: props.imageUrl });
    }
  }
);
function beforeUpload(file: { type: string; size: number }) {
  const typeArr = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
  const result = typeArr.filter((i) => file.type === i);
  const isJPGPNG = result.includes(file.type);
  if (!isJPGPNG) {
    ElMessage({
      center: true,
      duration: 2000,
      message: "上传图片只支持jpg，png，pdf格式!",
    });
    return false;
  }
  const isMaxM = file.size / 1024 / 1024 < props.imgSize;
  if (!isMaxM) {
    ElMessage({
      center: true,
      duration: 2000,
      message: `图片小不能超过 ${props.imgSize}MB!`,
    });
    return false;
  }
  return true;
}
function uploadFile(file: { file: File }) {
  emit("uploadFile", file.file, props.index);
}
function handleRemove() {
  emit("handleRemove", props.index);
}
function handlePictureCardPreview() {
  dialogImageUrl.value = props.imageUrl;
  dialogVisible.value = true;
}
</script>
<style scoped lang="scss">
.upload,
.cupload {
  /deep/ .el-upload {
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 0;
    border: 1px solid #e0e0e0;
    position: relative;
    .el-icon-plus {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 16px;
      color: #d8d8d8;
    }
  }
  .imgBox {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
  }
  /deep/ .el-upload-list {
    display: inline-block;
    height: 50px;
  }
  /deep/ .el-upload-list__item {
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 0;
    border: 1px solid #e0e0e0;
    position: relative;
    transition: none !important;
    div {
      width: 100%;
      height: 100%;
    }
    i {
      font-size: 16px;
    }
  }
  /deep/ .el-upload-list__item-delete {
    margin-left: 6px;
  }
  /deep/ .el-dialog__wrapper {
    text-align: center;
  }
}
.cupload {
  /deep/.el-upload--picture-card {
    width: 100%;
    height: 100%;
    display: none !important;
  }
}
.tip {
  color: #9f9f9f;
  font-size: 12px;
  white-space: nowrap;
}
.img {
  max-height: 800px;
}
</style>
