<template>
  <el-drawer
    v-model="dialogVisible"
    :title="title"
    width="500px"
    @close="emitClose"
  >
    <el-form
      ref="formRef"
      :model="localFormData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          maxlength="20"
          v-model="localFormData.username"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item>
      <el-form-item v-if="dialogType === 'add'" label="密码" prop="password">
        <el-input
          maxlength="20"
          v-model="localFormData.password"
          placeholder="请输入密码"
          clearable
        />
      </el-form-item>
      <el-form-item label="姓名" prop="realname">
        <el-input
          maxlength="20"
          v-model="localFormData.realname"
          placeholder="请输入姓名"
          clearable
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          maxlength="20"
          v-model="localFormData.phone"
          placeholder="请输入手机号"
          clearable
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="emitClose">取 消</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { UserInfo } from "./user.type";

const emits = defineEmits(["submit"]);

const dialogType = ref("add");
const title = computed(() => {
  return dialogType.value === "add" ? "新增用户" : "修改用户";
});
const dialogVisible = ref(false);

const formRef = ref();
const addFormDataInit = shallowRef({
  username: "",
  realname: "",
  password: "",
  phone: "",
});
const localFormData = ref<UserInfo>({
  ...addFormDataInit.value,
});

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

function emitClose() {
  dialogVisible.value = false;
  resetForm();
}

function resetForm() {
  localFormData.value = { ...addFormDataInit.value };
  formRef.value.resetFields();
  formRef.value.clearValidate();
}

function openDialog(item?: UserInfo) {
  dialogVisible.value = true;
  if (item) {
    localFormData.value = { ...item };
    dialogType.value = "edit";
  } else {
    dialogType.value = "add";
  }
}

function handleSubmit() {
  // TODO: 修改 添加 提交
  console.log("提交数据", localFormData.value);
  emitClose();
  emits("submit");
}

defineExpose({
  openDialog,
});
</script>

<style scoped>
/* Your styles here */
</style>
