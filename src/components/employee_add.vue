<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 12:59:25
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-12 23:04:35
 * @FilePath: \electron-vite-vue\src\components\employee_add.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElCard header="添加员工">
        <EmployeeModuleVue v-model="employee" />
        <ElButton type="primary" @click="hanlderAddEmployee">确认添加</ElButton>
    </ElCard>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import EmployeeModuleVue from '/src/components/employee_module.vue';
import { useServiceStore } from '../Services';
import { ElNotification } from 'element-plus';
import Util from '../util/Util';

const employeesServices = useServiceStore().employeesServices;

const employee = ref({} as IEmployee);

const addEmployee = () => {
    return new Promise<boolean>((resolve, reject) => {
        const theEmployee: IEmployee = JSON.parse(JSON.stringify(employee.value))
        employeesServices.addEmployee(theEmployee)
            .then((newEmployee) => {
                ElNotification({
                    title: '提示',
                    message: '添加' + newEmployee.name + '员工成功,月薪为' + newEmployee.salary
                })
                resolve(true)
            }).catch(e=>reject(e))
    })
}

const hanlderAddEmployee = () => { Util.verfiy(addEmployee,JSON.parse(JSON.stringify(employee.value))) }

</script>