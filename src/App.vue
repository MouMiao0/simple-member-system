<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 00:02:42
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-14 21:55:34
 * @FilePath: \electron-vite-vue\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">
import UserHeaderBarVue from '/src/components/UserHeaderBar.vue';
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useServiceStore } from './Services';
import { ElLoading } from 'element-plus';

const loading = ElLoading.service({
  lock: true,
  text: '加载中',
  background: 'rgba(0, 0, 0, 0.7)',
})

const services = useServiceStore();
const router = useRouter();

if(services) loading.close();

onMounted(() => {
  handleBack();
})

const handleBack = () => {
  router.replace({ path: '/home' })
}
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
