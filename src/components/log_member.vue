<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:51:28
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 11:49:07
 * @FilePath: \electron-vite-vue\src\components\log_member.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->

<template>
    <ElTable :data="memberLogs">
        <ElTableColumn label="会员" prop="member.name" />
        <ElTableColumn label="消费货物" prop="goods.name" />
        <ElTableColumn label="消费数量" prop="goods.count" />
        <ElTableColumn label="金额" prop="amount" />
        <ElTableColumn label="记录时间" prop="createdTime" />
    </ElTable>
    <ElDivider />
    <el-pagination background layout="prev, pager, next" :current-page="memberLogsPage.currentPage" @current-change="updatePage"
        :page-count="memberLogsPage.pageCounts" />

</template>
<script setup lang="ts">
import { useServiceStore } from '@/service';
import { onMounted, ref } from 'vue';
import IPage from '@/db/model/Ipage';
import Logs from '@/db/model/logs';

const logService = useServiceStore().log_services;

const memberLogsPage = ref({}as IPage<Logs>);
const memberLogs = ref([] as Logs[]);

const updatePage = (index: number) => {
    logService.member_consumed()
        .then((page) => {
            memberLogsPage.value = page;
            memberLogs.value = memberLogsPage.value?.record;
        })
}
onMounted(() => {
    logService.member_consumed()
        .then((page) => {
            memberLogsPage.value = page;
            memberLogs.value = memberLogsPage.value?.record;
        })
})

</script>