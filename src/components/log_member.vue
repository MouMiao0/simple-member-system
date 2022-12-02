
<template>
    <ElTable :data="memberLogs">
        <ElTableColumn label="会员" prop="member.name"/>
        <ElTableColumn label="消费货物" prop="goods.name"/>
        <ElTableColumn label="消费数量" prop="goods.count"/>
        <ElTableColumn label="金额" prop="amount"/>
        <ElTableColumn label="记录时间" prop="createdTime"/>
    </ElTable>
</template>
<script setup lang="ts">
import { useServiceStore } from '@/service';
import { ref } from 'vue';
import IPage from '@/db/model/Ipage';
import Logs from '@/db/model/logs';

const logService = useServiceStore().log_services;

const memberLogsPage =  ref<IPage<Logs>>(logService.member_consumed());
const memberLogs = ref<Logs[]>(memberLogsPage.value.record);


</script>