<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <div class="login-content">
      <div class="login-form-wrap">
        <div class="text-center relative">
          <!-- <h2>{{ title }}</h2> -->
          <img src="../../assets/login/logo.png" alt="logo" class="w-[156px]" />
        </div>
        <el-form
          ref="loginFormRef"
          :model="loginData"
          :rules="loginRules"
          class="login-form"
        >
          <el-form-item prop="username">
            <div class="p-2">
              <svg-icon icon-class="user" />
            </div>
            <el-input
              ref="username"
              v-model="loginData.username"
              class="flex-1"
              size="large"
              :placeholder="$t('login.username')"
              name="username"
            />
          </el-form-item>

          <el-tooltip
            :disabled="isCapslock === false"
            content="Caps lock is On"
            placement="right"
          >
            <el-form-item prop="password">
              <span class="p-2">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                v-model="loginData.password"
                class="flex-1"
                :placeholder="$t('login.password')"
                :type="passwordVisible === false ? 'password' : 'input'"
                size="large"
                name="password"
                @keyup="checkCapslock"
                @keyup.enter="handleLogin"
              />
              <span class="mr-2" @click="passwordVisible = !passwordVisible">
                <svg-icon
                  :icon-class="passwordVisible === false ? 'eye' : 'eye-open'"
                  class="cursor-pointer"
                />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-button
            :loading="loading"
            type="primary"
            class="w-full h-[72px] text-[24px]"
            @click.prevent="handleLogin"
            >{{ $t("login.login") }}
          </el-button>
        </el-form>
        <!-- 账号密码提示 -->
        <div class="text-center absolute bottom-[40px] w-[100%]">
          <span class="text-[18px] text-[#C2C7CC]"
            >登录即代表同意《鑫泰豪车隐私权政策》</span
          >
        </div>
      </div>
      <div class="login-bg">
        <h1 class="title">{{ title }}</h1>
      </div>
    </div>

    <!-- ICP备案 -->
    <div
      class="absolute bottom-1 text-[18px] text-center"
      v-show="useAppStore().device == 'desktop'"
    >
      <p>Copyright © 2023 xxxx</p>
      <p>xxxxxxx</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import router from "@/router";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useSettingsStore } from "@/store/modules/settings";

// 状态管理依赖
import { useUserStore } from "@/store/modules/user";
import { useAppStore } from "@/store/modules/app";

// API依赖
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";
import { LoginData } from "@/api/auth/types";
import { sha256 } from "js-sha256";

const settingsStore = useSettingsStore();

const { title } = settingsStore;

/**
 * 根据屏幕宽度切换设备模式
 */
const appStore = useAppStore();
const WIDTH = 992; // 响应式布局容器固定宽度  大屏（>=1200px） 中屏（>=992px） 小屏（>=768px）
const { width } = useWindowSize();
watchEffect(() => {
  if (width.value < WIDTH) {
    appStore.toggleDevice("mobile");
  } else {
    appStore.toggleDevice("desktop");
  }
});

const loading = ref(false); // 按钮loading
const isCapslock = ref(false); // 是否大写锁定
const passwordVisible = ref(false); // 密码是否可见
const loginFormRef = ref(ElForm); // 登录表单ref

const loginData = ref<LoginData>({
  username: "admin",
  password: "abc123456",
});

const { t } = useI18n();
const loginRules = computed(() => {
  const prefix = appStore.language === "en" ? "Please enter " : "请输入";
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: `${prefix}${t("login.username")}`,
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        validator: (rule: any, value: any, callback: any) => {
          if (value.length < 6) {
            callback(new Error("The password can not be less than 6 digits"));
          } else {
            callback();
          }
        },
        message: `${prefix}${t("login.password")}`,
      },
    ],
  };
});

/**
 * 检查输入大小写状态
 */
function checkCapslock(e: any) {
  const { key } = e;
  isCapslock.value = key && key.length === 1 && key >= "A" && key <= "Z";
}

/**
 * 登录
 */
const route = useRoute();
const userStore = useUserStore();
function handleLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log("login start");
      loading.value = true;
      userStore
        .login({
          ...loginData.value,
          password: sha256(loginData.value.password),
        })
        .then(() => {
          console.log("login success");
          const query: LocationQuery = route.query;

          const redirect = (query.redirect as LocationQueryValue) ?? "/";

          const otherQueryParams = Object.keys(query).reduce(
            (acc: any, cur: string) => {
              if (cur !== "redirect") {
                acc[cur] = query[cur];
              }
              return acc;
            },
            {}
          );

          router.push({ path: redirect, query: otherQueryParams });
        })
        .catch(() => {})
        .finally(() => {
          loading.value = false;
        });
    }
  });
}

onMounted(() => {
  // 主题初始化
  const theme = useSettingsStore().theme;
  useSettingsStore().changeSetting({ key: "theme", value: theme });
  if (theme == "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  // @apply w-full h-full flex-center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: url("@/assets/login/login-bg.png") no-repeat;
  background-size: cover;

  .login-content {
    display: flex;
    width: 60vw;
    height: 68vh;
    overflow: hidden;
    border-radius: 30px;

    .login-form-wrap {
      position: relative;
      width: 40%;
      padding: 36px;
      padding-top: 92px;
      background-color: white;
    }

    .login-bg {
      position: relative;
      display: flex;
      justify-content: center;
      width: 60%;
      background: url("@/assets/login/form-bg.png") no-repeat;
      background-color: #2d95f8;
      background-size: cover;

      .title {
        position: absolute;
        top: 37%;
        font-size: 36px;
        font-weight: 300;
        line-height: 50px;
        color: #fff;
        letter-spacing: 10px;
      }
    }
  }

  .login-form {
    padding: 30px 10px;

    .captcha {
      position: absolute;
      top: 0;
      right: 0;

      .image-slot {
        display: flex;
        align-items: center;
        justify-content: right;
        width: 100%;
        height: 100%;
        font-size: 18px;
        color: var(--el-text-color-secondary);
        background: var(--el-fill-color-light);

        svg {
          margin-right: 10px;
        }
      }
    }
  }
}

.el-form-item {
  height: 72px;
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;

  svg {
    font-size: 30px;
  }
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    font-size: 24px;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      transition: background-color 1000s ease-in-out 0s; /* 通过延时渲染背景色变相去除背景颜色 */
    }
  }
}
</style>
