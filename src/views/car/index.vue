<script setup lang="ts">
import { CarInfo } from "./car.type";
import { statusList, statusMap } from "./car.data";
import { Calendar } from "@element-plus/icons-vue";

import CarFormVue from "./carForm.vue";
import RentForm from "./rentForm.vue";
import CarDetail from "./carDetail.vue";
import setStatusForm from "./setStatusForm.vue";

import StatusCalendar from "./components/StatusCalendar/index.vue";
import { CarPageVO, CarQuery, CarForm } from "@/api/car/types";
import { deleteCar, getCarPage, updateCar, updateCarStatus } from "@/api/car";

defineOptions({
  name: "Car",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const CarFormRef = ref(CarFormVue);
const RentFormRef = ref(RentForm);
const CarDetailRef = ref(CarDetail);
const SetStatusFormRef = ref(setStatusForm);

const loading = ref(false);
const ids = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<CarQuery>({
  current: 1,
  size: 10,

  carName: "",
  operateStatus: undefined,
});

const carList = ref<CarPageVO[]>();

/** 查询 */
function handleQuery() {
  loading.value = true;
  getCarPage(queryParams)
    .then(({ data }) => {
      carList.value = data.records;
      total.value = +data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/**
 * 切换上架状态
 */
function exChangeCarStatus(item: CarForm) {
  const msg = item.status == 0 ? "上架" : "下架";
  updateCarStatus({
    id: item.id as string,
    status: item.status as number,
  })
    .then(() => {
      ElMessage.success(msg + "成功");
      handleQuery();
    })
    .catch(() => {
      item.status = item.status == 1 ? 0 : 1;
    });
}

/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  queryParams.current = 1;
  handleQuery();
}

/** 行checkbox 选中事件 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

/** 打开表单弹窗 */
function openDialog(item?: CarInfo) {
  CarFormRef.value.openDialog(item);
}

/** 打开租金弹窗 */
function openRentDialog(item?: CarInfo) {
  RentFormRef.value.openDialog(item);
}

/** 打开租赁状态弹窗 */
function openStatusDialog(item?: CarInfo) {
  SetStatusFormRef.value.openDialog(item);
}

/**
 * 打开详情
 */
function handleDetail(item: CarInfo) {
  CarDetailRef.value.openDialog(item);
}

/** 删除 */
function handleDelete(roleId: string) {
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    loading.value = true;
    deleteCar(roleId)
      .then(() => {
        ElMessage.success("删除成功");
        resetQuery();
      })
      .finally(() => (loading.value = false));
  });
}

function handleDialogSubmit() {
  handleQuery();
}

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item prop="carName" label="车辆名称">
              <el-input
                class="w-[100%]"
                v-model="queryParams.carName"
                maxlength="20"
                placeholder="请输入车辆名称"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="operateStatus" label="当日运营状态">
              <el-select
                class="w-[100%]"
                v-model="queryParams.operateStatus"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="6">
            <el-form-item class="control-btns">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-card shadow="never" class="table-container">
      <template #header>
        <el-button color="#3470ff" @click="openDialog()" plain
          >添加车辆</el-button
        >
      </template>

      <el-table
        stripe
        ref="dataTableRef"
        v-loading="loading"
        :data="carList"
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed="left"
          type="index"
          width="55"
          label="序号"
          align="center"
        />
        <el-table-column
          fixed="left"
          label="车辆名称"
          prop="carName"
          show-overflow-tooltip
          min-width="250"
        />
        <el-table-column label="品牌" prop="brand" width="150" />
        <el-table-column label="款式" prop="style" width="150" />
        <el-table-column label="年款" prop="modelYear" width="150" />
        <el-table-column label="厢式" prop="boxType" width="150" />
        <el-table-column label="座位数" prop="seats" width="150" />
        <el-table-column label="排量" prop="displacement" width="150" />
        <el-table-column
          fixed="right"
          label="当日运营状态"
          prop="createTime"
          width="150"
        >
          <template #default="scope">
            <div class="flex items-center">
              <el-tag
                :class="`status-${scope.row.operateStatus} car-status-tag`"
                >{{ statusMap[scope.row.operateStatus] }}</el-tag
              >

              <el-popover placement="right" :width="600" trigger="hover">
                <template #reference>
                  <el-icon class="ml-[5px]"><Calendar /></el-icon>
                </template>
                <StatusCalendar :calendar-data="scope.row.calendar" />
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="上架情况" prop="isVisible">
          <template #default="scope">
            <el-switch
              :active-value="0"
              :inactive-value="1"
              v-model="scope.row.status"
              @change="exChangeCarStatus(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              @click="handleDetail(scope.row)"
            >
              详情
            </el-button>
            <el-button
              type="primary"
              size="small"
              link
              @click="openDialog(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              size="small"
              link
              @click="openRentDialog(scope.row)"
            >
              租金
            </el-button>
            <el-button
              type="primary"
              size="small"
              link
              @click="openStatusDialog(scope.row)"
            >
              租赁状态
            </el-button>
            <el-button
              type="primary"
              size="small"
              class="del-btn"
              link
              @click="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.current"
        v-model:limit="queryParams.size"
        @pagination="handleQuery"
      />
    </el-card>
  </div>

  <!-- 新增、修改 -->
  <CarFormVue ref="CarFormRef" @submit="handleDialogSubmit" />

  <!-- 详情 -->
  <CarDetail ref="CarDetailRef" />

  <!-- 租金 -->
  <RentForm ref="RentFormRef" @submit="handleDialogSubmit" />

  <!-- 租赁状态 -->
  <setStatusForm ref="SetStatusFormRef" @submit="handleDialogSubmit" />
</template>
