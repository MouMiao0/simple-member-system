<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 11:59:04
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 14:47:04
 * @FilePath: \electron-vite-vue\src\components\employee_table.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElCard>
            <ElTable :data="employees" @cell-click="(row) => { emit('selectRow', row as Employee)}" >
                <ElTableColumn prop="name" label="名字" />
                <ElTableColumn prop="phone" label="手机号" />
                <ElTableColumn prop="salary" label="薪资" />
                <ElTableColumn prop="createdTime" label="创建时间" />
            </ElTable>
            <ElDivider/>
            <ElPagination :total="page.total" :page-count="page.pageCounts" 
                :current-page="page.currentPage" @current-change="updateCurrentPage" background />
    </ElCard>
</template>
<script setup lang="ts">
import Employee from '@/db/model/employee';
import { useServiceStore } from '@/service'
import { ref } from 'vue'

const employeesServices = useServiceStore().employees_services;
const emit = defineEmits<{
    (e: 'selectRow', theEmployees: Employee): void
}>()

const page = ref(employeesServices.get_employees());
const employees = page.value.record;

const updateCurrentPage = (index: number = page.value.currentPage)=>{
    console.log("调用了");
    page.value = employeesServices.get_employees(index)
}

defineExpose({updateCurrentPage})

</script>