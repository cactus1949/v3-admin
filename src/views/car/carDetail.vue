<template>
  <el-drawer
    v-model="dialogVisible"
    :title="title"
    size="50%"
    @close="emitClose"
  >
    <el-form ref="formRef" label-width="100px">
      <StatusCalendar
        :calendarData="localFormData?.operateStatusList"
        :priceCalendar="priceCalendar"
      />
      <el-row>
        <el-col :span="12">
          <el-form-item label="上架状态" prop="name1">
            <el-switch
              :value="localFormData?.status"
              :active-value="0"
              :inactive-value="1"
              active-text="已上架"
              inactive-text="已下架"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="品牌" prop="name2">
            {{ localFormData?.brand }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="款式" prop="name3">
            {{ localFormData?.style }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年款" prop="name4">
            {{ localFormData?.modelYear }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="厢式" prop="name5">
            {{ localFormData?.boxType }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="座位数" prop="name6">
            {{ localFormData?.seats }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排量" prop="name7">
            {{ localFormData?.displacement }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排挡" prop="name8">
            {{ localFormData?.gear === 1 ? "自动" : "手动" }}
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="name9">
            {{ localFormData?.remark }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="车辆照片">
        <el-image
          class="w-[150px] object-cover mr-2 mb-2"
          :src="item.pictureName"
          v-for="(item, index) in localFormData?.pictureList"
          :key="`picture-${index}`"
          :preview-src-list="
            localFormData?.pictureList?.map((o) => o.pictureName)
          "
        />
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
import { ReturnCarInfo, carRentTimeItem } from "@/api/car/types";
import { getCarInfoById, getCarRentById } from "@/api/car";

const emits = defineEmits(["submit"]);

const title = ref("车辆详情");
const dialogVisible = ref(false);

const formRef = ref();
const localFormData = ref<ReturnCarInfo>();

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
  localFormData.value = {};
}

function openDialog(item: CarInfo) {
  dialogVisible.value = true;
  returnCarInfo(item.id as string);
  getCarRent(item.id as string);
}

function returnCarInfo(id: string): Promise<ReturnCarInfo> {
  return new Promise(async (resolve) => {
    const { data } = await getCarInfoById(id);
    localFormData.value = data;
    resolve(data);
  });
}

const priceCalendar = reactive<{
  rent: number | string;
  carRentTimeList: carRentTimeItem[];
}>({
  rent: 0,
  carRentTimeList: [],
});

function getCarRent(id: string) {
  return new Promise<void>(async (resolve) => {
    const { data } = await getCarRentById(id);
    const { rent, carRentTimeList } = data;
    priceCalendar.carRentTimeList = carRentTimeList;
    priceCalendar.rent = rent;
    resolve();
  });
}

defineExpose({
  openDialog,
});
</script>

<style scoped>
/* Your styles here */
</style>
