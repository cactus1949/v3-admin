<template>
  <el-drawer
    v-model="dialogVisible"
    :title="title"
    size="40%"
    @close="emitClose"
  >
    <el-form
      ref="formRef"
      :model="localFormData"
      :rules="rules"
      label-width="auto"
      label-position="top"
    >
      <el-form-item
        v-for="(item, index) in localFormData.carRentTimeList"
        :key="`specialPrice-${index}`"
        :label="`状态${index + 1}`"
      >
        <div class="flex w-[100%] items-center">
          <el-form-item label-width="0" :prop="'item.' + index + '.dateRange'">
            <el-date-picker
              class="flex-1"
              v-model="item.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
              clearable
              @change="onDateChange(item)"
            />
          </el-form-item>
          <el-select
            class="!w-[10em] ml-[10px]"
            v-model="item.operateStatus"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusList.slice(1)"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-icon class="ml-[10px] cursor-pointer" @click="addItem"
            ><CirclePlusFilled
          /></el-icon>
          <el-icon
            v-show="localFormData.carRentTimeList.length > 1"
            class="ml-[10px] cursor-pointer"
            @click="removeItem(index)"
            ><RemoveFilled
          /></el-icon>
        </div>
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
import { CirclePlusFilled, RemoveFilled } from "@element-plus/icons-vue";
import { getCarRentById, getCarStatusById, setCarRent } from "@/api/car";
import { CarInfo, CarRentForm, carRentTimeItem } from "@/api/car/types";
import { statusList, statusMap } from "./car.data";

const emits = defineEmits(["submit"]);

const title = ref("设置状态");
const dialogVisible = ref(false);

const formRef = ref();
const addCarRentItemInit = {
  preferentialPrice: "",
  startTime: "",
  endTime: "",
  dateRange: [],
};
const currentCarId = ref("");
const addFormDataInit = {} as CarRentForm;
const localFormData = ref<any>({});

const rules = reactive({
  rent: [{ required: true, message: "请输入租金", trigger: "blur" }],
  deposit: [{ required: true, message: "请输入押金", trigger: "blur" }],
});

function emitClose() {
  dialogVisible.value = false;
  resetForm();
}

function addItem() {
  localFormData.value.carRentTimeList.push({ ...addCarRentItemInit });
}

function onDateChange(item: carRentTimeItem) {
  if (item.dateRange && item.dateRange.length === 2) {
    item.startTime = item.dateRange[0];
    item.endTime = item.dateRange[1];
  }
}

function removeItem(index: number) {
  localFormData.value.carRentTimeList.splice(index, 1);
}

function resetForm() {
  localFormData.value = { ...addFormDataInit };
  formRef.value.resetFields();
  formRef.value.clearValidate();
}

function openDialog(item: CarInfo) {
  dialogVisible.value = true;
  currentCarId.value = item.id;
  getCarStatus();
}

function getCarStatus() {
  return new Promise<void>(async (resolve) => {
    const { data } = await getCarStatusById(currentCarId.value);
    localFormData.value = data;
    resolve();
  });
}

function handleSubmit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      let formData = { ...localFormData.value };
      formData.carRentTimeList = formData.carRentTimeList.filter(
        (item: carRentTimeItem) => {
          return item.dateRange && item.dateRange.length === 2;
        }
      );

      setCarRent({
        ...formData,
        informationId: currentCarId.value,
      }).then(() => {
        ElMessage.success("设置成功");
        emitClose();
        emits("submit");
      });
    }
  });
}

defineExpose({
  openDialog,
});
</script>

<style scoped>
/* Your styles here */
</style>
