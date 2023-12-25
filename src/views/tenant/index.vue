<script setup lang="ts">
import { RoleQuery } from "@/api/role/types";
import { TenantInfo } from "./tenant.type";

import TenantDetail from "./tenantDetail.vue";

defineOptions({
  name: "Tenant",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const TenantDetailRef = ref(TenantDetail);

const loading = ref(false);
const total = ref(0);

const queryParams = reactive<RoleQuery>({
  pageNum: 1,
  pageSize: 10,
});

const userList = ref<TenantInfo[]>();

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
        name: "承租人",
        phone: "手机号",
        count: 10,
        total: 1999,
        orders: [
          "202001011232",
          "202001011232",
          "202001011232",
          "202001011232",
        ],
        abnormalOrders: ["202001011232"],
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
function openDialog(item: TenantInfo) {
  TenantDetailRef.value.openDialog(item);
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
            <el-form-item prop="keywords" label="承租人">
              <el-input
                v-model="queryParams.keywords"
                maxlength="20"
                placeholder="请输入承租人"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="keywords" label="承租人电话">
              <el-input
                v-model="queryParams.keywords"
                maxlength="20"
                placeholder="请输入承租人电话"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="keywords" label="承租次数">
              <el-input
                v-model="queryParams.keywords"
                placeholder="请输入承租次数"
                maxlength="20"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="control-btns">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-card shadow="never" class="table-container">
      <el-table
        stripe
        ref="dataTableRef"
        v-loading="loading"
        :data="userList"
        highlight-current-row
      >
        <el-table-column type="index" width="55" label="序号" align="center" />
        <el-table-column label="承租人" prop="name" />
        <el-table-column label="承租人电话" prop="phone" />
        <el-table-column label="承租次数" prop="count" />
        <el-table-column label="完成订单资金总额" prop="total" />
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              @click="openDialog(scope.row)"
            >
              详情
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
    <TenantDetail ref="TenantDetailRef" @submit="handleDialogSubmit" />
  </div>
</template>
