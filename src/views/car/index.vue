<script setup lang="ts">
import { CarInfo } from "./car.type";
import { statusList, statusMap } from "./car.data";
import { Calendar } from "@element-plus/icons-vue";

import CarForm from "./carForm.vue";
import RentForm from "./rentForm.vue";
import CarDetail from "./carDetail.vue";

import StatusCalendar from "./components/StatusCalendar/index.vue";

defineOptions({
  name: "Car",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const CarFormRef = ref(CarForm);
const RentFormRef = ref(RentForm);
const CarDetailRef = ref(CarDetail);

const loading = ref(false);
const ids = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<any>({
  pageNum: 1,
  pageSize: 10,

  name: "",
  status: "",
});

const carList = ref<CarInfo[]>();

/** 查询 */
function handleQuery() {
  loading.value = true;
  // getRolePage(queryParams)
  //   .then(({ data }) => {
  //     carList.value = data.list;
  //     total.value = data.total;
  //   })
  //   .finally(() => {
  //     loading.value = false;
  //   });
  // TODO: 请求接口获取用户列表
  setTimeout(() => {
    loading.value = false;
    total.value = 2;
    carList.value = [
      {
        id: "1",
        name1: true,
        name2: "品牌1",
        name3: "车型1",
        name4: "2021",
        name5: "轿车",
        name6: "7",
        name7: "2.0L",
        name8: "自动",
        name9: "xx",
        name10: [],

        status: "1",

        calendar: [
          {
            date: ["2023-12-07", "2023-12-11"],
            status: 1,
          },
          {
            date: ["2023-12-13", "2023-12-15"],
            status: 2,
          },
        ],
      },
      {
        id: "2",
        name1: true,
        name2: "品牌2",
        name3: "车型2",
        name4: "2023",
        name5: "轿车",
        name6: "7",
        name7: "2.0L",
        name8: "自动",
        name9: "xx",
        name10: [],

        status: "2",

        calendar: [
          {
            date: ["2023-12-18", "2023-12-31"],
            status: 3,
          },
          {
            date: ["2024-1-3", "2024-1-8"],
            status: 4,
          },
        ],
      },
    ];
  }, 2000);
}

/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  queryParams.pageNum = 1;
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

/**
 * 打开详情
 */
function handleDetail(item: CarInfo) {
  CarDetailRef.value.openDialog(item);
}

/** 删除 */
function handleDelete(roleId?: number) {
  const roleIds = [roleId || ids.value].join(",");
  if (!roleIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    loading.value = true;
    // deleteRoles(roleIds)
    //   .then(() => {
    //     ElMessage.success("删除成功");
    //     resetQuery();
    //   })
    //   .finally(() => (loading.value = false));
    // TODO: 请求接口删除
    setTimeout(() => {
      ElMessage.success("删除成功");
      resetQuery();
      loading.value = false;
    }, 2000);
  });
}

function handleDialogSubmit() {
  handleQuery();
}

/** 重置密码 */
function handleResetPassword() {
  ElMessageBox.confirm("是否确认重置该用户密码?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    loading.value = true;
    // deleteRoles(roleIds)
    //   .then(() => {
    //     ElMessage.success("重置成功");
    //   })
    //   .finally(() => (loading.value = false));
    // TODO: 请求接口
    setTimeout(() => {
      ElMessage.success("重置成功");
      loading.value = false;
    }, 2000);
  });
}

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="keywords" label="车辆名称">
          <el-input
            v-model="queryParams.name"
            maxlength="20"
            placeholder="请输入车辆名称"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item prop="keywords" label="当日运营状态">
          <el-select
            v-model="queryParams.status"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never" class="table-container">
      <template #header>
        <el-button type="success" @click="openDialog()">添加车辆</el-button>
      </template>

      <el-table
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
          prop="username"
          min-width="100"
        />
        <el-table-column label="品牌" prop="name2" width="150" />
        <el-table-column label="款式" prop="name3" width="150" />
        <el-table-column label="年款" prop="name4" width="150" />
        <el-table-column label="厢式" prop="name5" width="150" />
        <el-table-column label="座位数" prop="name6" width="150" />
        <el-table-column label="排量" prop="name7" width="150" />
        <el-table-column
          fixed="right"
          label="当日运营状态"
          prop="createTime"
          width="150"
        >
          <template #default="scope">
            <div class="flex items-center">
              <el-tag>{{ statusMap[scope.row.status] }}</el-tag>

              <el-popover placement="right" :width="600" trigger="hover">
                <template #reference>
                  <el-icon class="ml-[5px]"><Calendar /></el-icon>
                </template>
                <StatusCalendar :calendar-data="scope.row.calendar" />
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="上架情况"
          prop="isVisible"
          width="150"
        >
          <template #default="scope">
            <el-switch v-model="scope.row.name1" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
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
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
    </el-card>

    <!-- 新增、修改 -->
    <CarForm ref="CarFormRef" @submit="handleDialogSubmit" />

    <!-- 详情 -->
    <CarDetail ref="CarDetailRef" />

    <!-- 租金 -->
    <RentForm ref="RentFormRef" @submit="handleDialogSubmit" />
  </div>
</template>
