<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 00:38:11
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 02:15:37
 * @FilePath: \electron-vite-vue\src\components\member_contents.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <el-row>
        <el-card style="width:100%">
            <MemberModuleVue v-model="member"/>
            <ElRow style="margin-top: 10px;">
                <ElCol :offset=18 :span=4>
                    <ElButton type="primary" size="large" >下一步</ElButton>
                </ElCol>
            </ElRow>
        </el-card>
    </el-row>
    <el-row>
        <el-table :data="members" :border=true style="width: 100%" @cell-click="show">
            <el-table-column prop="phone" label="手机号" width="180" />
            <el-table-column prop="name" label="会员名" width="180" />
            <el-table-column label="性别">
                <template #default="scope">
                    {{ (scope.row.sex == 0 ? "女" : "男") }}
                </template>
            </el-table-column>
            <el-table-column prop="credit" label="余额" width="180" />
            <el-table-column prop="month_consume" label="月消费" width="180" />
            <el-table-column prop="sum_consum" label="总消费" width="180" />
            <el-table-column prop="consum_count" label="消费总次数" width="180" />
            <el-table-column prop="created_time" label="创建时间" width="180" />
        </el-table>
    </el-row>
</template>
<script setup lang="ts">
import { useServiceStore } from '@/service'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Member from '@/db/model/member'
import MemberModuleVue from '@/components/member_module.vue';

const serviceStore = useServiceStore();

const page = serviceStore.member_services.get_members();

const members = page.record;

const router = useRouter();

let member = ref({} as Member)

function show(row?: Member) {
    member.value = row as Member;
}

</script>

<style>
.credit_label {
    width: 90px;
}
</style>