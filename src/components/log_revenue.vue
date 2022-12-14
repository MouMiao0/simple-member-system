<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:47:55
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-13 15:12:31
 * @FilePath: \electron-vite-vue\src\components\log_revenue.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElCard>
        <ElDescriptions title="营收统计" :border="true">
            <ElDescriptionsItem label="月收入">{{ revenue.monthIncome }}</ElDescriptionsItem>
            <ElDescriptionsItem label="月支出">{{ revenue.monthExpend }}</ElDescriptionsItem>
            <ElDescriptionsItem label="月收益">{{ revenue.monthRevenue }}</ElDescriptionsItem>
            <ElDescriptionsItem label="总收入">{{ revenue.sumIncome }}</ElDescriptionsItem>
            <ElDescriptionsItem label="总支出">{{ revenue.sumExpend }}</ElDescriptionsItem>
            <ElDescriptionsItem label="总收益">{{ revenue.sumRevenue }}</ElDescriptionsItem>
        </ElDescriptions>
    </ElCard>
    <ElCard>
        <ElTable :data="logs">
            <ElTableColumn label="信息">
                <template #default="scope">
                    {{ getInfoByLog(scope.row as ILogs) }}
                </template>
            </ElTableColumn>
            <ElTableColumn label="消费">
                <template #default="scope">
                    {{ (((scope.row as ILogs).operation == 0 ? "收入" : "支出") + (scope.row as ILogs).amount) }}
                </template>
            </ElTableColumn>
            <ElTableColumn label="时间">
                <template #default="scope">
                    {{ (Util.getYYMMDD(scope.row.createAt)) }}
                </template>
            </ElTableColumn>
        </ElTable>
        <ElDivider />
        <el-pagination background layout="prev, pager, next" :current-page="page.currentPage"
            @current-change="updatePage" :page-count="page.pageCounts" />
    </ElCard>
</template>
<script setup lang="ts">
import { useServiceStore } from '../../src/Services';
import { onMounted, ref } from 'vue';
import Util from '../util/Util';


const logService = useServiceStore().logsServices;

const page = ref({} as Page<ILogs>);

const revenue = ref({
    sumExpend: 0,
    sumIncome: 0,
    sumRevenue: 0,
    monthExpend: 0,
    monthIncome: 0,
    monthRevenue: 0
} as Revenue);

const logs = ref([] as ILogs[]);

const getInfoByLog = (row: ILogs): string => {
    switch (row.operation) {
        case 0:
            if (row.Member == null || row.Good == null) return '';
            return row.Member.name + "消费了" + row.Good.name;

        case 1:
            if (row.Good == null) return '';
            return "入库了" + row.Good.name;

        case 2:
            return "给" + row.Employee?.name + "发工资";

        default:
            return '未知消费'
    }
}

const updatePage = (index: number) => {
    logService.getLogs(index).then((newPage: Page<ILogs>) => {
        // console.log(newPage)
        page.value = newPage;
        logs.value = newPage.record;
        logService.info().then((v) => {
            revenue.value = v
        })
    }).catch((e) => {
        // console.log(e)
    })

}

onMounted(() => {
    updatePage(1);
})

</script>