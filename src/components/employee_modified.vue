<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 13:00:20
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-12 23:19:17
 * @FilePath: \electron-vite-vue\src\components\employee_modified.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElCard header="员工信息">
        <EmployeeModuleVue v-model="editingEmployees" />
        <ElRow>
            <ElCol :lg="18" :md="18" :sm="10" />
            <ElCol :lg="6" :md="6" :sm="14">
                <ElButton size="large" type="primary" @click="handleEdit">确定修改</ElButton>
            </ElCol>
        </ElRow>
    </ElCard>
    <EmployeeTableVue ref="tableRef" @select-row="selectRow" />
</template>
<script setup lang="ts">
import EmployeeTableVue from '/src/components/employee_table.vue';
import EmployeeModuleVue from '/src/components/employee_module.vue'
import { ref } from 'vue';
import { useServiceStore } from '../../src/Services';
import Util from '../util/Util';

const tableRef = ref();
const editingEmployees = ref({} as IEmployee)
const currentEmployees = ref({} as IEmployee)
const employeesServices = useServiceStore().employeesServices;

const selectRow = (employee: IEmployee) => {
    editingEmployees.value = JSON.parse(JSON.stringify(employee));
    currentEmployees.value = employee;
}

const handleEdit = () => {
    Util.verfiy(() => {
        return new Promise<boolean>((resolve, reject) => {
            employeesServices.modifiedEmployee(editingEmployees.value).then(() => {
                tableRef.value.updateCurrentPage();
                resolve(true)
            }).catch(e=>reject(e))
        }
        )
    })
}


</script>