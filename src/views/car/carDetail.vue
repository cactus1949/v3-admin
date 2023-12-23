<template>
  <el-drawer
    v-model="dialogVisible"
    :title="title"
    size="50%"
    @close="emitClose"
  >
    <el-form ref="formRef" label-width="100px">
      <StatusCalendar :calendarData="calendarData" />
      <el-form-item label="上架状态" prop="name1">
        {{ localFormData.name1 }}
      </el-form-item>
      <el-form-item label="品牌" prop="name2">
        {{ localFormData.name2 }}
      </el-form-item>
      <el-form-item label="款式" prop="name3">
        {{ localFormData.name3 }}
      </el-form-item>
      <el-form-item label="年款" prop="name4">
        {{ localFormData.name4 }}
      </el-form-item>
      <el-form-item label="厢式" prop="name5">
        {{ localFormData.name5 }}
      </el-form-item>
      <el-form-item label="座位数" prop="name6">
        {{ localFormData.name6 }}
      </el-form-item>
      <el-form-item label="排量" prop="name7">
        {{ localFormData.name7 }}
      </el-form-item>
      <el-form-item label="排挡" prop="name8">
        {{ localFormData.name8 }}
      </el-form-item>
      <el-form-item label="备注" prop="name9">
        {{ localFormData.name9 }}
      </el-form-item>
      <el-form-item label="车辆照片">
        {{ localFormData.name10 }}
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="emitClose">确 定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { CarInfo } from "./car.type";

import StatusCalendar from "./components/StatusCalendar/index.vue";

const emits = defineEmits(["submit"]);

const title = ref("车辆详情");
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

const calendarData = ref<any>([
  {
    date: ["2023-12-07", "2023-12-11"],
    status: 1,
  },
  {
    date: ["2023-12-13", "2023-12-15"],
    status: 2,
  },
]);

function emitClose() {
  dialogVisible.value = false;
  resetForm();
}

function resetForm() {
  localFormData.value = { ...addFormDataInit.value };
}

function openDialog(item: CarInfo) {
  dialogVisible.value = true;
  localFormData.value = { ...item };
}

defineExpose({
  openDialog,
});
</script>

<style scoped>
/* Your styles here */
</style>
