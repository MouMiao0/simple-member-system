<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:51:42
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 11:47:12
 * @FilePath: \electron-vite-vue\src\components\log_goods.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElTable :data="goodsLogs">
        <ElTableColumn label="货物名" prop="goods.name" />
        <ElTableColumn label="入库数量" prop="goods.count" />
        <ElTableColumn label="花费金额" prop="amount" />
        <ElTableColumn label="记录时间" prop="createdTime" />
    </ElTable>
    <ElDivider />
    <el-pagination background layout="prev, pager, next" :current-page="goodsLogsPage.currentPage" @current-change="updatePage"
        :page-count="goodsLogsPage.pageCounts" />

</template>
<script setup lang="ts">
import { useServiceStore } from '@/service';
import { onMounted, ref } from 'vue';
import IPage from '@/db/model/Ipage';
import Logs from '@/db/model/logs';

const logService = useServiceStore().log_services;

const goodsLogsPage = ref({} as IPage<Logs>);
const goodsLogs = ref([] as Logs[])

const updatePage = (index: number) => {
    logService.goods_storaged()
        .then((page) => {
            goodsLogsPage.value = page;
            goodsLogs.value = goodsLogsPage.value?.record;
        })
}
onMounted(() => {
    logService.goods_storaged()
        .then((page) => {
            goodsLogsPage.value = page;
            goodsLogs.value = goodsLogsPage.value?.record;
        })
})
</script>