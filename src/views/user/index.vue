<script setup lang="ts">
import { RolePageVO, RoleQuery } from "@/api/role/types";
import { UserInfo } from "./user.type";

import UserForm from "./userForm.vue";

defineOptions({
  name: "User",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const UserFormRef = ref(UserForm);

const loading = ref(false);
const ids = ref<number[]>([]);
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

/** 行checkbox 选中事件 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

/** 打开表单弹窗 */
function openDialog(item?: UserInfo) {
  UserFormRef.value.openDialog(item);
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
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item prop="keywords" label="用户名">
              <el-input
                v-model="queryParams.keywords"
                maxlength="20"
                placeholder="请输入用户名"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="keywords" label="姓名">
              <el-input
                v-model="queryParams.keywords"
                maxlength="20"
                placeholder="请输入姓名"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="keywords" label="手机号">
              <el-input
                v-model="queryParams.keywords"
                placeholder="请输入手机号"
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
      <template #header>
        <el-button type="success" @click="openDialog()">新建用户</el-button>
      </template>

      <el-table
        stripe
        ref="dataTableRef"
        v-loading="loading"
        :data="userList"
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" width="55" label="序号" align="center" />
        <el-table-column label="用户名" prop="username" min-width="100" />
        <el-table-column label="姓名" prop="realname" width="150" />
        <el-table-column label="手机号" prop="phone" width="150" />
        <el-table-column label="添加人" prop="createName" width="150" />
        <el-table-column label="添加时间" prop="createTime" width="150" />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
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
              @click="handleResetPassword"
            >
              重置密码
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
    <UserForm ref="UserFormRef" @submit="handleDialogSubmit" />
  </div>
</template>
