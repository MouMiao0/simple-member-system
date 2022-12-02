/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 00:26:08
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 15:56:03
 * @FilePath: \electron-vite-vue\src\router\index.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import {createRouter, createWebHashHistory} from 'vue-router'
import homeVue from '@/view/home.vue'
import memberContentsVue from '@/components/member_contents.vue'
import addMemberVue from '@/components/member_add.vue'
import memberRecharge from '@/components/member_recharge.vue'
import memberModified from '@/components/member_modified.vue'
import goodsContentsVue from '@/components/goods_contents.vue'
import goodsAdd from '@/components/goods_add.vue'
import employeeTableVue from '@/components/employee_table.vue'
import employeeAddVue from '@/components/employee_add.vue'
import employeeModifiedVue from '@/components/employee_modified.vue'
import logRevenueVue from '@/components/log_revenue.vue'
import logGoodsVue from '@/components/log_goods.vue'
import logMemberVue from '@/components/log_member.vue'
import logEmployeeVue from '@/components/log_employee.vue'

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