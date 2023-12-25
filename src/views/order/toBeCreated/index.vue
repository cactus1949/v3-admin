<script setup lang="ts">
import { RolePageVO, RoleQuery } from "@/api/role/types";
import { CreateOrderForm } from "./order.type";

import OrderForm from "./orderForm.vue";
import CancelDialog from "./cancelDialog.vue";

defineOptions({
  name: "OrderToBeCreated",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const OrderFormRef = ref(OrderForm);
const CancelDialogRef = ref();

const loading = ref(false);
const total = ref(0);

const queryParams = reactive<RoleQuery>({
  pageNum: 1,
  pageSize: 10,
});

const userList = ref<RolePageVO[]>();

/** 查询 */
function handleQuery() {
  loading.value = true;
  // getRolePage(queryParams)
  //   .then(({ data }) => {
  //     userList.value = data.list;
  //     total.value = data.total;
  //   })
  //   .finally(() => {
  //     loading.value = false;
  //   });
  // TODO: 请求接口获取用户列表
  setTimeout(() => {
    loading.value = false;
    total.value = 2;
    userList.value = [
      {
        id: 1,
        username: "用户名",
        realname: "真实姓名",
        phone: "手机号",
        createTime: "2020-01-01",
        createName: "创建人",
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

/** 打开表单弹窗 */
function openDialog(item?: CreateOrderForm) {
  OrderFormRef.value.openDialog(item);
}

/**
 * 取消预约
 */
function cancelOrder(item: CreateOrderForm) {
  CancelDialogRef.value.openDialog(item);
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
            <el-form-item prop="keywords" label="预约时间">
              <el-date-picker
                v-model="queryParams.keywords"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="keywords" label="预约人电话">
              <el-input
                v-model="queryParams.keywords"
                maxlength="20"
                placeholder="请输入预约人电话"
                clearable
                @keyup.enter="handleQuery"
              />
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
        <el-button type="success" @click="openDialog()">创建订单</el-button>
      </template>

      <el-table
        stripe
        ref="dataTableRef"
        v-loading="loading"
        :data="userList"
        highlight-current-row
      >
        <el-table-column type="index" width="55" label="序号" align="center" />
        <el-table-column label="预约时间" prop="name1" />
        <el-table-column label="预约人电话" prop="realname" />
        <el-table-column label="取还车时间" prop="phone" />
        <el-table-column label="租期" prop="createName" />
        <el-table-column label="预定车辆" prop="createTime">
          <template #default="scope">
            <div>{{ scope.row.createTime }}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              @click="openDialog(scope.row)"
            >
              创建订单
            </el-button>
            <el-button
              type="primary"
              size="small"
              link
              @click="cancelOrder(scope.row)"
            >
              取消预约
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
    <OrderForm ref="OrderFormRef" @submit="handleDialogSubmit" />

    <!-- 取消预约 -->
    <CancelDialog ref="CancelDialogRef" @submit="handleDialogSubmit" />
  </div>
</template>
