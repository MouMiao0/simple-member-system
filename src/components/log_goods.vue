<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:51:42
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-11 11:16:09
 * @FilePath: \electron-vite-vue\src\components\log_goods.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElTable :data="goodsLogs">
        <ElTableColumn label="货物名" prop="Good.name" />
        <ElTableColumn label="入库数量" prop="goods_count" />
        <ElTableColumn label="花费金额" prop="amount" />
        <ElTableColumn label="记录时间" prop="createdTime" >
            <template #default="scope">
                {{ (Util.getYYMMDD(scope.row.createAt)) }}
            </template>
        </ElTableColumn>
    </ElTable>
    <ElDivider />
    <el-pagination background layout="prev, pager, next" :current-page="goodsLogsPage.currentPage" @current-change="updatePage"
        :page-count="goodsLogsPage.pageCounts" />

</template>
<script setup lang="ts">
import { useServiceStore } from '../../src/Services';
import { onMounted, ref } from 'vue';
import Util from '../util/Util';



const logService = useServiceStore().logsServices;

const goodsLogsPage = ref({} as Page<ILogs>);
const goodsLogs = ref([] as ILogs[])

const updatePage = (index: number) => {
    logService.goodsStoraged(index)
        .then((page) => {
            goodsLogsPage.value = page;
            goodsLogs.value = goodsLogsPage.value?.record;
        })
}
onMounted(() => {
    updatePage(1);
})
</script>