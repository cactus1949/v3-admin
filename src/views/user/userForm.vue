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
      <el-form-item label="用户名" prop="name">
        <el-input
          maxlength="20"
          v-model="localFormData.name"
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
      <el-form-item label="姓名" prop="username">
        <el-input
          maxlength="20"
          v-model="localFormData.username"
          placeholder="请输入姓名"
          clearable
        />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          maxlength="20"
          v-model="localFormData.mobile"
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
import { UserForm } from "@/api/user/types";
import { addUser, updateUser } from "@/api/user";
import { sha256 } from "js-sha256";

const emits = defineEmits(["submit"]);

const dialogType = ref("add");
const title = computed(() => {
  return dialogType.value === "add" ? "新增用户" : "修改用户";
});
const dialogVisible = ref(false);

const formRef = ref();
const addFormDataInit = shallowRef<UserForm>({
  username: "",
  name: "",
  password: "",
  mobile: "",

  status: 1,
  gender: 1,
  salt: "123456",
  roleId: 0,
});
const localFormData = ref<UserForm>({
  ...addFormDataInit.value,
});

const rules = reactive({
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
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
  const method = dialogType.value === "add" ? addUser : updateUser;
  const msg = dialogType.value === "add" ? "新增" : "修改";
  let params = { ...localFormData.value };
  if (dialogType.value === "add") {
    params = {
      ...params,
      password: sha256(params.password as string),
    };
  }
  method(params).then(() => {
    ElMessage.success(`${msg}成功`);
    emitClose();
    emits("submit");
  });
}

defineExpose({
  openDialog,
});
</script>

<style scoped>
/* Your styles here */
</style>
