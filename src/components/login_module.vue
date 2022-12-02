<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 16:02:57
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 00:25:07
 * @FilePath: \electron-vite-vue\src\components\login_module.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">
import { h, reactive } from 'vue';
import { useServiceStore } from "@/service"
import { ElNotification } from 'element-plus';

const serviceStore = useServiceStore();

var user = reactive(serviceStore.user_info);

function login() {
    serviceStore.user_services.login(user.name as string, user.pw as string).then((state) => {
        ElNotification({
            title: '提示',
            duration: 1500,
            message: h('i', { style: 'color: teal' }, '登陆成功'),
        })
        serviceStore.not_login = false;

    }).catch(() => {
        ElNotification({
            title: '提示',
            duration: 1500,
            message: h('i', { style: 'color: teal' }, '用户名或密码错误'),
        })
    })
}
</script>
<template>
    <el-form label-position="top">
        <el-form-item label="用户名">
            <el-input type="text" v-model="user.name" />
        </el-form-item>

        <el-form-item label="密码">
            <el-input type="password" v-model="user.pw" />
        </el-form-item>

        <el-row justify="space-around" style="flex-flow: nowrap;">
            <el-button type="primary" @click="login">确认</el-button>
            <el-button type="info">取消</el-button>
        </el-row>
    </el-form>
</template>

<style>

</style>