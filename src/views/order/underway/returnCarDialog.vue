<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="500px"
    @close="emitClose"
  >
    <el-form
      ref="formRef"
      :model="localFormData"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model.trim="localFormData.remark"
          placeholder="请输入备注"
          clearable
          maxlength="200"
          show-word-limit
          type="textarea"
          :rows="4"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="emitClose">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emits = defineEmits(["submit"]);

const title = ref("还车");
const dialogVisible = ref(false);

interface cancelOrderFormProps {
  id: string;
  remark: string;
}

const formRef = ref();
const addFormDataInit = shallowRef<cancelOrderFormProps>({
  id: "",
  remark: "",
});
const localFormData = ref<cancelOrderFormProps>({
  ...addFormDataInit.value,
});

const rules = {
  remark: [
    { required: false, message: "请输入备注", trigger: ["change", "blur"] },
  ],
};

function emitClose() {
  dialogVisible.value = false;
  resetForm();
}

function resetForm() {
  localFormData.value = { ...addFormDataInit.value };
  formRef.value.resetFields();
  formRef.value.clearValidate();
}

function openDialog(item?: any) {
  dialogVisible.value = true;
  localFormData.value = { id: item.id, remark: "" };
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
