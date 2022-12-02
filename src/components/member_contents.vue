<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 00:38:11
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 04:50:08
 * @FilePath: \electron-vite-vue\src\components\member_contents.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <el-row>
        <el-card style="width:100%">
            <MemberModuleVue v-model="member" />
            <ElRow style="margin-top: 10px;">
                <ElCol :offset=18 :span=4>
                    <ElButton type="primary" size="large">下一步</ElButton>
                </ElCol>
            </ElRow>
        </el-card>
    </el-row>
    <el-row>
        <el-table :data="members" :border=true style="width: 100%" @cell-click="show">
            <el-table-column prop="phone" label="手机号" width="180" />
            <el-table-column prop="plate_code" label="车牌号" width="180" />
            <el-table-column prop="name" label="会员名" width="180" />
            <el-table-column label="性别">
                <template #default="scope">
                    {{ (scope.row.sex == 0 ? "女" : scope.row.sex == 1 ? "男" : '') }}
                </template>
            </el-table-column>
            <el-table-column prop="credit" label="余额" width="180" />
            <el-table-column prop="month_consume" label="月消费" width="180" />
            <el-table-column prop="sum_consum" label="总消费" width="180" />
            <el-table-column prop="consum_count" label="消费总次数" width="180" />
            <el-table-column prop="createAt" label="创建时间" width="180" />
        </el-table>
    </el-row>
</template>
<script setup lang="ts">
import { useServiceStore } from '@/service'
import { onMounted, ref } from 'vue';
import Member from '@/db/model/member'
import MemberModuleVue from '@/components/member_module.vue';
import IPage from '@/db/model/IPage';

const serviceStore = useServiceStore();
const memberServices = serviceStore.member_services;

const page = ref({} as IPage<Member>);

const members = ref([{}] as Member[]);

let member = ref({} as Member)

function show(row?: Member) {
    member.value = row as Member;
}

onMounted(() => {
    memberServices.get_members().then((newPage: IPage<Member>) => {
        page.value = newPage;
        members.value = newPage.record;
    }).catch((e) => {
        // console.log(e)
    })

})


</script>

<style>
.credit_label {
    width: 90px;
}
</style>