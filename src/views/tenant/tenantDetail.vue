<template>
  <el-drawer
    v-model="dialogVisible"
    :title="title"
    width="500px"
    @close="emitClose"
  >
    <div class="content">
      <el-form>
        <el-form-item label="承租人：">
          <div>{{ localData.name || defaultEmptyText }}</div>
        </el-form-item>
        <el-form-item label="承租人电话：">
          <div>{{ localData.phone || defaultEmptyText }}</div>
        </el-form-item>
        <el-form-item label="承租次数：">
          <div>{{ localData.count || defaultEmptyText }}</div>
        </el-form-item>
        <el-form-item label="完成订单资金总额：">
          <div>{{ localData.total || defaultEmptyText }}</div>
        </el-form-item>
        <el-form-item label="完成订单：" v-if="localData.orders?.length">
          <div class="order_list">
            <div
              class="order_item"
              v-for="(item, index) in localData.orders"
              :key="`order-${index}`"
            >
              {{ item }}
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="异常订单："
          v-if="localData.abnormalOrders?.length"
        >
          <div class="order_list">
            <div
              class="order_item"
              v-for="(item, index) in localData.abnormalOrders"
              :key="`abnormalOrder-${index}`"
            >
              {{ item }}
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="emitClose">取 消</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TenantInfo } from "./tenant.type";

const title = ref("租客详情");
const dialogVisible = ref(false);
const defaultEmptyText = "-";

const localData = ref<TenantInfo>({} as TenantInfo);

function emitClose() {
  dialogVisible.value = false;
  resetForm();
}

function resetForm() {
  localData.value = {} as TenantInfo;
}

function openDialog(item: TenantInfo) {
  dialogVisible.value = true;
  localData.value = { ...item };
}

function handleSubmit() {
  emitClose();
}

defineExpose({
  openDialog,
});
</script>

<style scoped>
.content {
  .order_list {
    .order_item {
      color: #409eff;
      cursor: pointer;
    }
  }
}
</style>
