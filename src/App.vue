<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 00:02:42
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 10:58:03
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
import User from '@/db/model/user';
import { DataTypes } from 'sequelize';




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

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.TEXT,
    pw: DataTypes.TEXT
  }, {
    sequelize: sequelize, tableName: 'user'
  })

  Member.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.TEXT,
    plate_code: {
      type: DataTypes.TEXT,
      unique: true
    },
    phone: { type: DataTypes.INTEGER, unique: true },
    sex: DataTypes.BLOB,
    credit: DataTypes.INTEGER,
    month_consume: DataTypes.INTEGER,
    sum_consum: DataTypes.INTEGER,
    consum_count: DataTypes.INTEGER,
    createAt: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }
  }, { sequelize: sequelize, tableName: 'member', timestamps: false })

  Goods.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataTypes.TEXT, unique: true },
    price: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    createAt: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }
  }, { sequelize: sequelize, tableName: 'goods', timestamps: false })

  Employee.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
    createAt: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }
  }, { sequelize: sequelize, tableName: 'employee', timestamps: false })

  Logs.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    operation: DataTypes.INTEGER,
    e_id:  { type: DataTypes.INTEGER, references: { model: Employee, key: 'id' } },
    m_id: { type: DataTypes.INTEGER, references: { model: Member, key: 'id' } },
    g_id: { type: DataTypes.INTEGER, references: { model: Goods, key: 'id' } },
    goods_count: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    createAt: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }
  }, { sequelize: sequelize, tableName: 'logs', timestamps: false })

  Employee.hasMany(Logs,{foreignKey:'e_id'})
  Logs.belongsTo(Employee)
  Goods.hasMany(Logs,{foreignKey:'g_id'})
  Logs.belongsTo(Goods)
  Member.hasMany(Logs,{foreignKey:'m_id'})
  Logs.belongsTo(Member)


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
