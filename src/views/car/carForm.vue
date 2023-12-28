<template>
  <el-drawer
    v-model="dialogVisible"
    :title="title"
    size="50%"
    @close="emitClose"
  >
    <el-form
      ref="formRef"
      :model="localFormData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="上架状态" prop="status">
        <el-radio-group v-model="localFormData.status">
          <el-radio
            v-for="(item, index) in onSaleOptions"
            :key="`onSale-${index}`"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input
          maxlength="20"
          v-model.trim="localFormData.brand"
          placeholder="请输入品牌"
          clearable
        />
      </el-form-item>
      <el-form-item label="款式" prop="style">
        <el-input
          maxlength="20"
          v-model.trim="localFormData.style"
          placeholder="请输入款式"
          clearable
        />
      </el-form-item>
      <el-form-item label="年款" prop="modelYear">
        <el-input
          maxlength="20"
          v-model.trim="localFormData.modelYear"
          placeholder="请输入年款"
          clearable
        />
      </el-form-item>
      <el-form-item label="厢式" prop="boxType">
        <el-select
          v-model="localFormData.boxType"
          placeholder="请选择"
          clearable
          class="w-[100%]"
        >
          <el-option
            :value="item.label"
            v-for="(item, index) in boxTypeOptions"
            :key="`boxType-${index}`"
            >{{ item.label }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="座位数" prop="seats">
        <el-input
          maxlength="20"
          v-model.trim="localFormData.seats"
          placeholder="请输入座位数"
          clearable
        >
          <template #append>座</template>
        </el-input>
      </el-form-item>
      <el-form-item label="排量" prop="displacement">
        <el-input
          maxlength="20"
          v-model.trim="localFormData.displacement"
          placeholder="请输入排量"
          clearable
        >
          <template #append>L</template>
        </el-input>
      </el-form-item>
      <el-form-item label="排挡" prop="gear">
        <el-select
          v-model="localFormData.gear"
          placeholder="请选择"
          clearable
          class="w-[100%]"
        >
          <el-option
            :value="item.label"
            v-for="(item, index) in gearTypeOptions"
            :key="`gearType-${index}`"
            >{{ item.label }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          :rows="2"
          show-word-limit
          maxlength="200"
          v-model.trim="localFormData.remark"
          placeholder="请输入备注"
          clearable
        />
      </el-form-item>
      <el-form-item label="车辆照片">
        <multi-upload v-model="localFormData.pictureList" />
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
import { boxTypeOptions, gearTypeOptions, onSaleOptions } from "./car.data";
import MultiUpload from "@/components/Upload/MultiUpload.vue";
import { CarForm, CarInfo, ReturnCarInfo } from "@/api/car/types";
import { addCar, getCarInfoById, updateCar } from "@/api/car";
import { returnPictureItem } from "@/api/file/types";

const emits = defineEmits(["submit"]);

const dialogType = ref("add");
const title = computed(() => {
  return dialogType.value === "add" ? "新增车辆" : "修改车辆";
});
const dialogVisible = ref(false);

const formRef = ref();
const addFormDataInit = shallowRef({
  status: 0,
});
const localFormData = ref<CarForm>({
  ...addFormDataInit.value,
});

const rules = reactive({
  status: [{ required: true, message: "请选择上架状态", trigger: "blur" }],
  brand: [{ required: true, message: "请输入品牌", trigger: "blur" }],
  style: [{ required: true, message: "请输入款式", trigger: "blur" }],
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

async function openDialog(item?: CarInfo) {
  dialogVisible.value = true;
  if (item) {
    const data = await returnCarInfo(item.id);

    // 处理图片
    let urlList: string[] = [];
    const { pictureList } = data;
    if (pictureList && pictureList.length > 0) {
      urlList = pictureList.map((o: returnPictureItem) => o.pictureName);
    }

    localFormData.value = {
      ...data,
      pictureList: urlList,
    };
    dialogType.value = "edit";
  } else {
    dialogType.value = "add";
  }
}

function handleSubmit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      let method = dialogType.value === "add" ? addCar : updateCar;
      let msg = dialogType.value === "add" ? "新增" : "修改";
      method(localFormData.value).then(() => {
        ElMessage.success(`${msg}成功`);
        emitClose();
        emits("submit");
      });
    }
  });
}

function returnCarInfo(id: string): Promise<ReturnCarInfo> {
  return new Promise(async (resolve) => {
    const { data } = await getCarInfoById(id);
    resolve(data);
  });
}

defineExpose({
  openDialog,
});
</script>

<style scoped>
/* Your styles here */
</style>
