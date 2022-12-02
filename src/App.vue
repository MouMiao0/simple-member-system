<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 00:02:42
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 04:48:21
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
import Logs from '@/db/model/logs';
import Member from '@/db/model/member';
import Employee from '@/db/model/employee';
import Goods from '@/db/model/goods';
import sequelize from '@/db/SequelizeDb';




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

serviceStore.initFin(() => {
  loading.close();
  Logs.hasMany(Member, {
    foreignKey: 'm_id'
  })
  Logs.hasMany(Employee, {
    foreignKey: 'e_id'
  });
  Logs.hasMany(Goods, {
    foreignKey: 'g_id'
  });

  Member.belongsTo(Logs)
  Employee.belongsTo(Logs)
  Goods.belongsTo(Logs)

  // sequelize.sync({force:true}).then().catch();
});

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
