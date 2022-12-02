<template>
    <ElTable :data="goodsLogs">
        <ElTableColumn label="货物名" prop="goods.name" />
        <ElTableColumn label="入库数量" prop="goods.count"/>
        <ElTableColumn label="花费金额" prop="amount"/>
        <ElTableColumn label="记录时间" prop="createdTime"/>
    </ElTable>
</template>
<script setup lang="ts">
import { useServiceStore } from '@/service';
import { ref } from 'vue';
import IPage from '@/db/model/Ipage';
import Logs from '@/db/model/logs';

const logService = useServiceStore().log_services;

const goodsLogsPage =  ref<IPage<Logs>>(logService.goods_storaged());
const goodsLogs = ref<Logs[]>(goodsLogsPage.value.record)

</script>