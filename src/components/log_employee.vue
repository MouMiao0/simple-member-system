<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:52:04
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-06 05:13:15
 * @FilePath: \electron-vite-vue\src\components\log_employee.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElTable :data="employeeLogs">
        <ElTableColumn label="员工名称" prop="employee.name"/>
        <ElTableColumn label="手机号" prop="employee.phone"/>
        <ElTableColumn label="员工工资" prop="amount"/>
        <ElTableColumn label="发放时间" prop="createdTime"/>
    </ElTable>
</template>
<script setup lang="ts">
import { useServiceStore } from '../../src/Services';
import { onMounted, ref } from 'vue';


const logService = useServiceStore().logsServices;

const employeeLogsPage =  ref<Page<ILogs>>();
const employeeLogs = ref<ILogs[]>()

onMounted(()=>{
    logService.employeeSalaries()
    .then((page)=>{
        employeeLogsPage.value  = page;
        employeeLogs.value   = employeeLogsPage.value?.record;
    })
})
</script>