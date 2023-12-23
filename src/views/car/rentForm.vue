<template>
  <el-drawer
    v-model="dialogVisible"
    :title="title"
    size="45%"
    @close="emitClose"
  >
    <el-form
      ref="formRef"
      :model="localFormData"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="租金" prop="name1">
        <el-input
          maxlength="20"
          v-model.trim="localFormData.name1"
          placeholder="请输入租金"
          clearable
        >
          <template #append>元/日</template>
        </el-input>
      </el-form-item>
      <el-form-item label="押金" prop="name2">
        <el-input
          maxlength="20"
          v-model.trim="localFormData.name2"
          placeholder="请输入押金"
          clearable
        >
          <template #append>元</template>
        </el-input>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in localFormData.name3"
        :key="`specialPrice-${index}`"
        label="优惠价"
        :prop="'item.' + index + '.name1'"
      >
        <div class="flex w-[100%] items-center">
          <el-date-picker
            class="flex-1"
            v-model="item.name2"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            format="YYYY-MM-DD"
            clearable
          />
          <el-input
            maxlength="4"
            placeholder="优惠价"
            clearable
            class="w-[6em] ml-[10px]"
            v-model="item.name1"
          />
          <span class="ml-[10px]">元/日</span>
          <el-icon class="ml-[10px] cursor-pointer" @click="addItem"
            ><CirclePlusFilled
          /></el-icon>
          <el-icon
            v-show="localFormData.name3.length > 1"
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
import { CarInfo, CarRentForm, SpecialPriceProps } from "./car.type";
import { CirclePlusFilled, RemoveFilled } from "@element-plus/icons-vue";

const emits = defineEmits(["submit"]);

const title = ref("设置租金");
const dialogVisible = ref(false);

const formRef = ref();
const addFormDataInit = shallowRef({
  name1: "",
  name2: "",
  name3: [
    {
      name1: "123",
      name2: ["2022-01-01", "2022-01-02"],
    },
  ],
});
const localFormData = ref<CarRentForm>({
  ...addFormDataInit.value,
});

const rules = reactive({
  name1: [{ required: true, message: "请输入租金", trigger: "blur" }],
  name2: [{ required: true, message: "请输入押金", trigger: "blur" }],
});

function emitClose() {
  dialogVisible.value = false;
  resetForm();
}

function addItem() {
  localFormData.value.name3.push({ name1: "", name2: [] });
}

function removeItem(index: number) {
  localFormData.value.name3.splice(index, 1);
}

function resetForm() {
  localFormData.value = { ...addFormDataInit.value };
  formRef.value.resetFields();
  formRef.value.clearValidate();
}

function openDialog(item: CarInfo) {
  dialogVisible.value = true;
  // TODO: 请求接口获取租金
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

<style scoped>
/* Your styles here */
</style>
