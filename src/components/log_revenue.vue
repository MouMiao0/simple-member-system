<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:47:55
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 11:44:07
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
        <ElDivider/>
        <el-pagination background layout="prev, pager, next" :current-page="page.currentPage" @current-change="updatePage" :page-count="page.pageCounts" />
    </ElCard>
</template>
<script setup lang="ts">
import { useServiceStore } from '@/service';
import IPage from '@/db/model/Ipage';
import Logs from '@/db/model/logs';
import Revenue from '@/db/model/revenue';
import { stringify } from 'querystring';
import { onMounted, ref } from 'vue';

const logService = useServiceStore().log_services;

const page = ref({} as IPage<Logs>);

const revenue = ref({} as Revenue);

const logs =  ref([] as Logs[]);

const getInfoByLog = (row: Logs): string=>{
    switch(row.operation){
        case 0:
            if(row.member == null || row.goods==null) return '';
            return row.member.name  + "消费了" + row.goods.name;

        case 1:
            if(row.goods == null) return '';
            return "入库了"+row.goods.name;

        case 2:
            return "给"+row.employee?.name+"发工资";
            
        default:
            return ''
    }
}

const updatePage = (index:number)=>{
    logService.get_logs(index).then((newPage: IPage<Logs>) => {
        console.log(newPage)
        page.value = newPage;
        logs.value = newPage.record;
    }).catch((e) => {
        // console.log(e)
    })

}

onMounted(() => {
    logService.get_logs().then((newPage: IPage<Logs>) => {
        page.value = newPage;
        logs.value = newPage.record;
    }).catch((e) => {
        // console.log(e)
    })
    logService.info().then((v)=>{
        revenue.value = v
    })
})

</script>