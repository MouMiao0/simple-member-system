<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 11:59:04
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-14 19:23:56
 * @FilePath: \electron-vite-vue\src\components\employee_table.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElCard>
        <ElRow>
            <ElCol :offset="20" :span="4">
                <ElButton v-show="(prop.hiddenButton == undefined || !prop.hiddenButton)" @click="handlePaySalary">发放工资</ElButton>
            </ElCol>
        </ElRow>
        <ElTable :data="employees" @cell-click="(row) => { emit('selectRow', row as IEmployee) }">
            <ElTableColumn prop="name" label="名字" />
            <ElTableColumn prop="phone" label="手机号" />
            <ElTableColumn prop="salary" label="薪资" />
            <ElTableColumn prop="creatAt" label="创建时间">
                <template #default="scope">
                    {{ (Util.getYYMMDD(scope.row.createAt)) }}
                </template>
            </ElTableColumn>
        </ElTable>
        <ElDivider />
        <ElPagination layout="prev, pager, next" :page-count="page.pageCounts" :current-page="page.currentPage"
            @current-change="updateCurrentPage" background />
    </ElCard>
</template>
<script setup lang="ts">
import { useServiceStore } from '../../src/Services'
import { onMounted, ref } from 'vue'
import Util from '../util/Util';
import { ElNotification } from 'element-plus';

const prop = defineProps<{
    hiddenButton?: boolean 
}>()
const employeesServices = useServiceStore().employeesServices;

const emit = defineEmits<{
    (e: 'selectRow', theEmployees: IEmployee): void
}>()

const page = ref({ currentPage: 1 } as Page<IEmployee>);
const employees = ref([] as IEmployee[]);

const updateCurrentPage = () => {
    employeesServices.getEmployees(page.value.currentPage).then((v) => {
        page.value = v;
        employees.value = page.value.record;
    })
}

defineExpose({ updateCurrentPage })

const handlePaySalary = ()=>{
    Util.verfiy(employeesServices.paySalary)
}

onMounted(() => {
    updateCurrentPage();
})

</script>