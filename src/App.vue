<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 00:02:42
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-15 09:47:47
 * @FilePath: \electron-vite-vue\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">
import UserHeaderBarVue from '/src/components/UserHeaderBar.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useServiceStore } from './Services';

const services = useServiceStore();
const router = useRouter();



const handleBack = () => {
  router.replace({ path: '/home' })
}

onMounted(() => {
  handleBack();
})
</script>

<template>
  <el-page-header @back="handleBack">
    <template #extra>
      <UserHeaderBarVue />
    </template>
  </el-page-header>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
