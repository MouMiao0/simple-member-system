<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:47:55
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 16:28:59
 * @FilePath: \electron-vite-vue\src\components\log_revenue.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElCard>
        <ElDescriptions title="营收统计" :border="true" >
            <ElDescriptionsItem label="月收入" >{{revenue.monthIncome}}</ElDescriptionsItem>
            <ElDescriptionsItem label="月支出" >{{revenue.monthExpend}}</ElDescriptionsItem>
            <ElDescriptionsItem label="月收益" >{{revenue.monthRevenue}}</ElDescriptionsItem>
            <ElDescriptionsItem label="总收入" >{{revenue.sumIncome}}</ElDescriptionsItem>
            <ElDescriptionsItem label="总支出" >{{revenue.sumExpend}}</ElDescriptionsItem>
            <ElDescriptionsItem label="总收益" >{{revenue.sumRevenue}}</ElDescriptionsItem>
        </ElDescriptions>
    </ElCard>
    <ElCard>
        <ElTable :data="logs">
            <ElTableColumn label="信息">
                <template #default="scope" >
                    {{getInfoByLog(scope.row as Logs)}}
                </template>
            </ElTableColumn>
            <ElTableColumn label="消费">
                <template #default="scope" >
                    {{(((scope.row as Logs).operation == 0 ? "收入" : "支出")+(scope.row as Logs).amount)}}
                </template>
            </ElTableColumn>
            <ElTableColumn prop="createdTime" label="时间"/>
        </ElTable>
    </ElCard>
</template>
<script setup lang="ts">
import { useServiceStore } from '@/service';
import IPage from '@/db/model/Ipage';
import Logs from '@/db/model/logs';
import Revenue from '@/db/model/revenue';
import { stringify } from 'querystring';

const logService = useServiceStore().log_services;

const page:IPage<Logs> = logService.get_logs();

const revenue = logService.info();

const logs = page.record;

const getInfoByLog = (row: Logs): string=>{
    switch(row.operation){
        case 0:
            return row.member.name + "消费了" + row.goods.name;

        case 1:
            return "入库了"+row.goods.name;

        case 2:
            return "给"+row.employee?.name+"发工资";
            
        default:
            return ''
    }
}

</script>