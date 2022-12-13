/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 00:26:08
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-09 23:22:49
 * @FilePath: \electron-vite-vue\src\router\index.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import {createRouter, createWebHashHistory} from 'vue-router'
import homeVue from '/src/view/home.vue'
import memberContentsVue from '/src/components/member_contents.vue'
import addMemberVue from '/src/components/member_add.vue'
import memberRecharge from '/src/components/member_recharge.vue'
import memberModified from '/src/components/member_modified.vue'
import goodsContentsVue from '/src/components/goods_contents.vue'
import goodsAdd from '/src/components/goods_add.vue'
import employeeTableVue from '/src/components/employee_table.vue'
import employeeAddVue from '/src/components/employee_add.vue'
import employeeModifiedVue from '/src/components/employee_modified.vue'
import logRevenueVue from '/src/components/log_revenue.vue'
import logGoodsVue from '/src/components/log_goods.vue'
import logMemberVue from '/src/components/log_member.vue'
import logEmployeeVue from '/src/components/log_employee.vue'

const routes = [
    {
        path :'/home',
        component: homeVue,
        children:[
            {
                path: 'member',
                component: memberContentsVue
            },
            {
                path: 'add_member',
                component: addMemberVue
            },
            {
                path: 'member_recharge',
                component: memberRecharge
            },
            {
                path: 'member_modified',
                component: memberModified
            },
            {
                path: 'goods',
                component: goodsContentsVue
            },
            {
                path: 'add_goods',
                component: goodsAdd
            },
            {
                path: 'employees',
                component: employeeTableVue
            },
            {
                path: 'add_employee',
                component: employeeAddVue
            },
            {
                path: 'employee_modified',
                component: employeeModifiedVue
            },
            {
                path: 'log_revenue',
                component: logRevenueVue
            },            {
                path: 'log_member',
                component: logMemberVue
            },            {
                path: 'log_employee',
                component: logEmployeeVue
            },            {
                path: 'log_goods',
                component: logGoodsVue
            },
        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})