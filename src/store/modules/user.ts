import { defineStore } from "pinia";

import { loginApi, logoutApi } from "@/api/auth";
// import { getUserInfoApi } from "@/api/user";
import { resetRouter } from "@/router";
import { store } from "@/store";

import { LoginData } from "@/api/auth/types";
import { UserInfo } from "@/api/user/types";

import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  const user: UserInfo = {
    roles: [],
    perms: [],
  };

  const token = useStorage("accessToken", "");

  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      // loginApi(loginData)
      //   .then((response) => {
      //     const { tokenType, accessToken } = response.data;
      //     token.value = tokenType + " " + accessToken; // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
      //     resolve();
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
      const response = {
        accessToken:
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjE2YWJkNTlkOTAxNzQwZDliYmI3ZjczODBhZDkyNzNhIiwidXNlcklkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZGVwdElkIjoxLCJkYXRhU2NvcGUiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiZXhwIjoxNjkxMTAzMzgyfQ.P4cuIfmPepl3HuguhMS7NXn5a7IUPpsLbmtA_rHOhHk",
        tokenType: "Bearer",
        refreshToken: null,
        expires: null,
      };
      const { tokenType, accessToken } = response;
      token.value = tokenType + " " + accessToken; // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
      resolve();
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      // getUserInfoApi()
      //   .then(({ data }) => {
      //     if (!data) {
      //       reject("Verification failed, please Login again.");
      //       return;
      //     }
      //     if (!data.roles || data.roles.length <= 0) {
      //       reject("getUserInfo: roles must be a non-null array!");
      //       return;
      //     }
      //     Object.assign(user, { ...data });
      //     resolve(data);
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
      const data = {
        userId: 2,
        nickname: "系统管理员",
        avatar:
          "https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif",
        roles: ["ADMIN"],
        perms: [
          "sys:menu:delete",
          "sys:dept:edit",
          "sys:dict_type:add",
          "sys:dict:edit",
          "sys:dict:delete",
          "sys:dict_type:edit",
          "sys:menu:add",
          "sys:user:add",
          "sys:role:edit",
          "sys:dept:delete",
          "sys:user:edit",
          "sys:user:delete",
          "sys:user:reset_pwd",
          "sys:dept:add",
          "sys:role:delete",
          "sys:dict_type:delete",
          "sys:menu:edit",
          "sys:dict:add",
          "sys:role:add",
        ],
      };
      Object.assign(user, { ...data });
      resolve(data);
    });
  }

  // user logout
  function logout() {
    return new Promise<void>((resolve, reject) => {
      // logoutApi()
      //   .then(() => {
      //     token.value = "";
      //     location.reload(); // 清空路由
      //     resolve();
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });

      token.value = "";
      location.reload(); // 清空路由
      resolve();
    });
  }

  // remove token
  function resetToken() {
    return new Promise<void>((resolve) => {
      token.value = "";
      resetRouter();
      resolve();
    });
  }

  return {
    token,
    user,
    login,
    getUserInfo,
    logout,
    resetToken,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
