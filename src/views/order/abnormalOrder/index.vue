<script setup lang="ts">
import { RolePageVO, RoleQuery } from "@/api/role/types";

defineOptions({
  name: "OrderAbnormal",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);

const loading = ref(false);
const total = ref(0);

const queryParams = reactive<RoleQuery>({
  pageNum: 1,
  pageSize: 10,
});

const userList = ref<RolePageVO[]>();

// 详情
function handleDetail(item: any) {
  console.log(item);
}

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
                v-model.trim="queryParams.keywords"
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
                v-model.trim="queryParams.keywords"
                maxlength="20"
                placeholder="请输入承租人电话"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="keywords" label="承租车辆">
              <el-input
                v-model.trim="queryParams.keywords"
                maxlength="20"
                placeholder="请输入承租车辆"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="keywords" label="订单号">
              <el-input
                v-model.trim="queryParams.keywords"
                maxlength="20"
                placeholder="请输入订单号"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="keywords" label="异常原因">
              <el-input
                v-model.trim="queryParams.keywords"
                maxlength="20"
                placeholder="请输入异常原因"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="12">
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
        <el-table-column
          fixed="left"
          type="index"
          width="55"
          label="序号"
          align="center"
        />
        <el-table-column fixed="left" label="订单号" prop="name1" />
        <el-table-column fixed="left" label="承租人" prop="realname" />
        <el-table-column label="承租人电话" prop="realname" width="150" />
        <el-table-column label="取还车时间" prop="phone" width="150" />
        <el-table-column label="租期" prop="createName" />
        <el-table-column
          label="承租车辆"
          prop="createTime"
          show-overflow-tooltip
          width="150"
        />
        <el-table-column label="异常原因" prop="phone" width="150" />
        <el-table-column label="取消时间" prop="phone" width="150" />
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              @click="handleDetail(scope.row)"
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
  </div>
</template>
