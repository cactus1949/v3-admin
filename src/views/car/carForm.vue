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
      <el-form-item label="上架状态" prop="name1">
        <el-radio-group v-model="localFormData.name1">
          <el-radio
            v-for="(item, index) in onSaleOptions"
            :key="`onSale-${index}`"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="品牌" prop="name2">
        <el-input
          maxlength="20"
          v-model.trim="localFormData.name2"
          placeholder="请输入品牌"
          clearable
        />
      </el-form-item>
      <el-form-item label="款式" prop="name3">
        <el-input
          maxlength="20"
          v-model.trim="localFormData.name3"
          placeholder="请输入款式"
          clearable
        />
      </el-form-item>
      <el-form-item label="年款" prop="name4">
        <el-input
          maxlength="20"
          v-model.trim="localFormData.name4"
          placeholder="请输入年款"
          clearable
        />
      </el-form-item>
      <el-form-item label="厢式" prop="name5">
        <el-select v-model="localFormData.name5" placeholder="请选择" clearable>
          <el-option
            :value="item.label"
            v-for="(item, index) in boxTypeOptions"
            :key="`boxType-${index}`"
            >{{ item.label }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="座位数" prop="name6">
        <el-input
          maxlength="20"
          v-model.trim="localFormData.name6"
          placeholder="请输入座位数"
          clearable
        >
          <template #append>座</template>
        </el-input>
      </el-form-item>
      <el-form-item label="排量" prop="name7">
        <el-input
          maxlength="20"
          v-model.trim="localFormData.name7"
          placeholder="请输入排量"
          clearable
        >
          <template #append>L</template>
        </el-input>
      </el-form-item>
      <el-form-item label="排挡" prop="name8">
        <el-select v-model="localFormData.name8" placeholder="请选择" clearable>
          <el-option
            :value="item.label"
            v-for="(item, index) in gearTypeOptions"
            :key="`gearType-${index}`"
            >{{ item.label }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="name9">
        <el-input
          type="textarea"
          :rows="2"
          show-word-limit
          maxlength="200"
          v-model.trim="localFormData.name9"
          placeholder="请输入备注"
          clearable
        />
      </el-form-item>
      <el-form-item label="车辆照片">
        <multi-upload v-model="multiPicUrls" />
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
import { CarInfo } from "./car.type";
import { boxTypeOptions, gearTypeOptions, onSaleOptions } from "./car.data";
import MultiUpload from "@/components/Upload/MultiUpload.vue";

const emits = defineEmits(["submit"]);

const multiPicUrls = ref<string[]>([]);

const dialogType = ref("add");
const title = computed(() => {
  return dialogType.value === "add" ? "新增车辆" : "修改车辆";
});
const dialogVisible = ref(false);

const formRef = ref();
const addFormDataInit = shallowRef({
  name1: true,
  name2: "",
  name3: "",
  name4: "",
  name5: "",
  name6: "",
  name7: "",
  name8: "",
  name9: "",
});
const localFormData = ref<CarInfo>({
  ...addFormDataInit.value,
});

const rules = reactive({
  name1: [{ required: true, message: "请选择上架状态", trigger: "blur" }],
  name2: [{ required: true, message: "请输入品牌", trigger: "blur" }],
  name3: [{ required: true, message: "请输入款式", trigger: "blur" }],
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

function openDialog(item?: CarInfo) {
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
