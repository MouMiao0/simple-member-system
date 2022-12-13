<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:51:28
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-11 11:07:20
 * @FilePath: \electron-vite-vue\src\components\log_member.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->

<template>
    <ElTable :data="memberLogs">
        <ElTableColumn label="会员" prop="Member.name" />
        <ElTableColumn label="消费货物" prop="Good.name" />
        <ElTableColumn label="消费数量" prop="Good.count" />
        <ElTableColumn label="金额" prop="amount" />
        <ElTableColumn label="记录时间">
            <template #default="scope">
                {{ (Util.getYYMMDD(scope.row.createAt)) }}
            </template>
        </ElTableColumn>
    </ElTable>
    <ElDivider />
    <el-pagination background layout="prev, pager, next" :current-page="memberLogsPage.currentPage"
        @current-change="updatePage" :page-count="memberLogsPage.pageCounts" />

</template>
<script setup lang="ts">
import { useServiceStore } from '../../src/Services';
import { onMounted, ref } from 'vue';
import Util from '../util/Util';



const logsService = useServiceStore().logsServices;

const memberLogsPage = ref({} as Page<ILogs>);
const memberLogs = ref([] as ILogs[]);

const updatePage = (index:number) => {
    logsService.memberConsumed(index)
        .then((page) => {
            console.log(page);
            memberLogsPage.value = page;
            memberLogs.value = memberLogsPage.value?.record;
        })
}
onMounted(() => {
    updatePage(1)
})

</script>