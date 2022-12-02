<template>
    <ElTable :data="employeeLogs">
        <ElTableColumn label="员工名称" prop="employee.name"/>
        <ElTableColumn label="手机号" prop="employee.phone"/>
        <ElTableColumn label="员工工资" prop="amount"/>
        <ElTableColumn label="发放时间" prop="createdTime"/>
    </ElTable>
</template>
<script setup lang="ts">
import { useServiceStore } from '@/service';
import { ref } from 'vue';
import IPage from '@/db/model/Ipage';
import Logs from '@/db/model/logs';

const logService = useServiceStore().log_services;

const employeeLogsPage =  ref<IPage<Logs>>(logService.employee_salaries());
const employeeLogs = ref<Logs[]>(employeeLogsPage.value.record)
</script>