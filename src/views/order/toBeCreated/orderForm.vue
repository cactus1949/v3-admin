<template>
  <el-drawer
    v-model="dialogVisible"
    :title="title"
    width="500px"
    @close="emitClose"
  >
    <el-form
      ref="formRef"
      :model="localFormData"
      :rules="rules"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="订单来源" prop="name1">
        <el-radio-group v-model="localFormData.name1">
          <el-radio
            v-for="(item, index) in orderSourceList"
            :key="`orderSource-${index}`"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="承租人" prop="name2">
        <el-input
          v-model.trim="localFormData.name2"
          placeholder="请输入承租人"
          clearable
          maxlength="20"
        />
      </el-form-item>
      <el-form-item label="承租人电话" prop="name3">
        <el-input
          v-model.trim="localFormData.name3"
          placeholder="请输入承租人电话"
          clearable
          maxlength="20"
        />
      </el-form-item>
      <el-form-item label="取还车时间" prop="name4">
        <el-date-picker
          v-model="localFormData.name4"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          clearable
        />
      </el-form-item>
      <el-form-item label="承租车辆" prop="name5">
        <el-select v-model="localFormData.name5" class="w-[100%]">
          <el-option
            v-for="(item, index) in carList"
            :key="`car-${index}`"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车牌号" prop="name6">
        <el-input
          v-model.trim="localFormData.name6"
          placeholder="请输入车牌号"
          clearable
          maxlength="20"
        />
      </el-form-item>
      <div class="flex amount">
        <el-form-item label="应支付金额" prop="name7">
          <el-input
            disabled
            v-model.trim="localFormData.name7"
            placeholder="租金："
            clearable
            maxlength="20"
            v-number-format
          />
        </el-form-item>
        <el-form-item label=" " prop="name8">
          <div class="flex">
            <span> + </span>
            <el-input
              disabled
              v-model.trim="localFormData.name8"
              placeholder="押金："
              clearable
              maxlength="20"
              v-number-format
            />
          </div>
        </el-form-item>
        <el-form-item label=" " prop="name9">
          <div class="flex">
            <span> = </span>
            <el-input
              disabled
              v-model.trim="localFormData.name9"
              placeholder=""
              clearable
              maxlength="20"
            />
          </div>
        </el-form-item>
      </div>
      <div class="flex amount">
        <el-form-item label="实际支付金额" prop="name10">
          <el-input
            class="w-[100%]"
            v-model.trim="localFormData.name10"
            placeholder="租金："
            clearable
            maxlength="20"
            v-number-format
          />
        </el-form-item>
        <el-form-item label=" " prop="name11">
          <div class="flex w-[100%]">
            <span> + </span>
            <el-input
              v-model.trim="localFormData.name11"
              placeholder="押金："
              clearable
              maxlength="20"
              v-number-format
            />
          </div>
        </el-form-item>
        <el-form-item label=" ">
          <div class="flex w-[100%]">
            <span> = </span>
            <el-input
              disabled
              v-model.trim="actualPaymentAmount"
              placeholder=""
              clearable
              maxlength="20"
            />
          </div>
        </el-form-item>
      </div>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model.trim="localFormData.remark"
          placeholder="请输入备注"
          clearable
          maxlength="200"
          show-word-limit
          type="textarea"
          :rows="4"
        />
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
import { ref, defineEmits, Directive } from "vue";
import { CreateOrderForm } from "./order.type";
import { orderSourceList } from "./index.data";

const emits = defineEmits(["submit"]);

const dialogType = ref("add");
const title = ref("创建订单");
const dialogVisible = ref(false);

const formRef = ref();
const addFormDataInit = shallowRef<CreateOrderForm>({
  name1: "门店预约",
  name2: "",
  name3: "",
  name4: "",
  name5: "",
  name6: "",
  name7: "",
  name8: "",
  name9: "",
  name10: "",
  name11: "",
});
const localFormData = ref<CreateOrderForm>({
  ...addFormDataInit.value,
});

const carList = ref<any>([]);

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const actualPaymentAmount = computed(() => {
  const name9 = parseFloat(localFormData.value.name9) || 0; // 如果为空或无效，则默认为0
  const name10 = parseFloat(localFormData.value.name10) || 0; // 如果为空或无效，则默认为0
  return (name9 + name10).toFixed(2); // 结果保留两位小数
});

function emitClose() {
  dialogVisible.value = false;
  resetForm();
}

function resetForm() {
  localFormData.value = { ...addFormDataInit.value };
  formRef.value.resetFields();
  formRef.value.clearValidate();
}

function openDialog(item?: UserInfo) {
  dialogVisible.value = true;
  if (item) {
    localFormData.value = { ...item };
    dialogType.value = "edit";
  } else {
    dialogType.value = "add";
  }
}

function handleSubmit() {
  // TODO: 修改 添加 提交
  console.log("提交数据", localFormData.value);
  emitClose();
  emits("submit");
}

defineExpose({
  openDialog,
});
</script>

<style lang="scss" scoped>
/* Your styles here */
.amount {
  display: flex;

  ::v-deep(.el-form-item) {
    flex: 1;

    .el-form-item__label {
      height: 22px;
    }
  }

  span {
    margin: 0 5px;
  }
}
</style>
