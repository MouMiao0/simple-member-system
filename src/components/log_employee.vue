<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:52:04
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-14 19:46:29
 * @FilePath: \electron-vite-vue\src\components\log_employee.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElTable :data="employeeLogs">
        <ElTableColumn label="员工名称" prop="Employee.name" />
        <ElTableColumn label="手机号" prop="Employee.phone" />
        <ElTableColumn label="员工工资" prop="amount" />
        <ElTableColumn label="发放时间"  >
            <template #default="scope">
                {{ (Util.getYYMMDD(scope.row.createAt)) }}
            </template>
        </ElTableColumn>
    </ElTable>
    <ElDivider/>
    <ElPagination :current-page="indexPage" background layout="prev, pager, next" @current-change="updatePage"
        :page-count="employeeLogsPage?.pageCounts"
    />
</template>
<script setup lang="ts">
import { useServiceStore } from '../../src/Services';
import { onMounted, ref } from 'vue';
import Util from '../../src/util/Util';


const logService = useServiceStore().logsServices;

const indexPage = ref(1);
const employeeLogsPage = ref<Page<ILogs>>();
const employeeLogs = ref<ILogs[]>()


const updatePage = () => {
    logService.employeeSalaries(indexPage.value)
        .then((page) => {
            // console.log(page)
            employeeLogsPage.value = page;
            employeeLogs.value = employeeLogsPage.value?.record;
        })
}


onMounted(() => {
    updatePage();
})
</script>