<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
import { useSettingsStore } from "@/store/modules/settings";

const appStore = useAppStore();

const settingsStore = useSettingsStore();

const { title } = settingsStore;

/**
 * 左侧菜单栏显示/隐藏
 */
function toggleSideBar() {
  appStore.toggleSidebar();
}
</script>

<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <!-- 左侧面包屑 -->
    <div class="flex ml-[20px]">
      <!-- <hamburger
        :is-active="appStore.sidebar.opened"
        @toggle-click="toggleSideBar"
      /> -->
      <!-- <breadcrumb /> -->
      <div class="title">{{ title }}</div>
    </div>

    <!-- 右侧导航设置 -->
    <div class="flex">
      <NavRight />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background-color: #f6fafc;
  // box-shadow: 0 0 1px #0003;
  .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 33px;
    color: #3470ff;
  }
}
</style>
