<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 12:59:25
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 13:51:53
 * @FilePath: \electron-vite-vue\src\components\employee_add.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElCard header="添加员工">
        <EmployeeModuleVue v-model="employee" />
        <ElButton type="primary">确认添加</ElButton>
    </ElCard>
</template>
<script setup lang="ts">
import Employee from '@/db/model/employee';
import { ref } from 'vue';
import EmployeeModuleVue from '@/components/employee_module.vue';

const employee = ref( {} as Employee);

</script>