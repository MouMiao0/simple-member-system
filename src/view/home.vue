<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 15:34:37
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-13 13:34:26
 * @FilePath: \electron-vite-vue\src\view\home.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">
import Login_module from '/src/components/login_module.vue';
import { useServiceStore } from '../../src/Services';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const serviceStore = useServiceStore();

/**
 * 菜单子项
 */
interface menu_item {
    name: string
    path: string
}

/**菜单项 */
interface menus {
    title: string
    sub_menu: menu_item[]
}

const menu_list: menus[] = reactive([
    {
        title: "会员管理",
        sub_menu: [
            { name: "会员消费", path: "/home/member" },
            { name: "添加会员", path: "/home/add_member" },
            { name: "会员充值", path: "/home/member_recharge" },
            { name: "修改信息", path: "/home/member_modified" }
        ]
    },
    {
        title: "商品管理",
        sub_menu: [
            { name: "查看商品", path: "/home/goods" },
            { name: "商品添增", path: "/home/add_goods" },
        ]
    },
    {
        title: "员工管理",
        sub_menu: [
            { name: "查看员工", path: "/home/employees" },
            { name: "添加员工", path: "/home/add_employee" },
            { name: "员工信息修改", path: "/home/employee_modified" },
        ]
    },
    {
        title: "统计",
        sub_menu: [
            { name: "营收", path: "/home/log_revenue" },
            { name: "会员消费记录", path: "/home/log_member" },
            { name: "货物入库消费", path: "/home/log_goods" },
            { name: "员工工资支出", path: "/home/log_employee" },
        ]
    },
])

</script>
<template>
    <el-drawer direction="ltr" tiltle="登陆" :close-on-click-modal=false :close-on-press-escape=false :show-close=false
        v-model="serviceStore.not_login">
        <Login_module />
    </el-drawer>
    <ElContainer>
        <ElAside width="200px">
            <el-menu :router=true>
                <el-sub-menu v-for="(menu, index) in menu_list" :index="String(index)">
                    <template #title>
                        <span>{{ menu.title }}</span>
                    </template>
                    <el-menu-item v-for="item in menu.sub_menu" :index=item.path>{{ item.name }}</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </ElAside>
        <ElMain>
            <router-view />
        </ElMain>
    </ElContainer>
</template>
<style>

</style>