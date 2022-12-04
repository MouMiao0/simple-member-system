<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 00:02:42
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 00:45:47
 * @FilePath: \electron-vite-vue\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">

import { useServiceStore } from '@/service';
import { ElLoading } from 'element-plus';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';



const router = useRouter();

onMounted(() => {
  router.push({ path: "/home" });
})
const loading = ElLoading.service({
  lock: true,
  text: '服务加载中',
  background: 'rgba(0, 0, 0, 0.7)',
})
const serviceStore = useServiceStore();

serviceStore.initDB().then(()=>{
  loading.close();
})

</script>

<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
