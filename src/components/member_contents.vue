<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 00:38:11
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-11 10:56:33
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
                    <ElButton type="primary" size="large" @click="(GoodsModuleVueVisible = true)">下一步</ElButton>
                </ElCol>
            </ElRow>
        </el-card>
    </el-row>
    <ElDialog v-model="GoodsModuleVueVisible" title="选择商品">
        <ElCard>
            <GoodsModuleVue v-model="goods" :disable-auto-complete="false" :readonly="true" />
        </ElCard>
        <ElFormItem label="选择数量" style="margin-top: 20px;">
            <ElInputNumber v-model="consumeCount" :max="goods.count" :min="0" />
        </ElFormItem>
        <ElButton size="large" type="primary" @click="handleConsume">确定</ElButton>
        <ElButton size="large" @click="(GoodsModuleVueVisible = false)">取消</ElButton>
    </ElDialog>
    <el-row>
        <el-table :data="members" :border=true style="width: 100%" @cell-click="show" :max-height=280>
            <el-table-column prop="phone" label="手机号" width="180" />
            <el-table-column prop="plate_code" label="车牌号" width="180" />
            <el-table-column prop="name" label="会员名" width="180" />
            <el-table-column label="性别">
                <template #default="scope">
                    {{ (scope.row.sex == 0 ? "女" : scope.row.sex == 1 ? "男" : '') }}
                </template>
            </el-table-column>
            <el-table-column prop="credit" label="余额" width="180" />
            <el-table-column prop="Logs.month_consum" label="月消费" width="180" />
            <el-table-column prop="sum_consum" label="总消费" width="180" />
            <el-table-column prop="consum_count" label="消费总次数" width="180" />
            <el-table-column label="创建时间" width="180">
                <template #default="scope">
                    {{ (Util.getYYMMDD(scope.row.createAt)) }}
                </template>
            </el-table-column>
        </el-table>
        <ElDivider />
        <el-pagination background layout="prev, pager, next" :current-page="page.currentPage"
            @current-change="updatePage" :page-count="page.pageCounts" />
    </el-row>
</template>
<script setup lang="ts">
import { useServiceStore } from '../../src/Services'
import { h, onMounted, ref } from 'vue';
import MemberModuleVue from '/src/components/member_module.vue';
import GoodsModuleVue from '/src/components/goods_module.vue';
import { ElNotification } from 'element-plus';
import Util from '../util/Util';

const serviceStore = useServiceStore();
const memberServices = serviceStore.memberServices;

const page = ref({} as Page<IMember>);

const members = ref([{}] as IMember[]);

const goods = ref({ name: '' } as IGoods);

const consumeCount = ref(0);

const GoodsModuleVueVisible = ref(false)

let member = ref({} as IMember)

function show(row?: IMember) {
    member.value = row as IMember;
}

const updatePage = (index: number) => {
    memberServices.getMembers(index).then((newPage: Page<IMember>) => {
        page.value = newPage;
        members.value = newPage.record;
    }).catch((e) => {
        // console.log(e)
    })
}

onMounted(() => {
    updatePage(1);
})

const handleConsume = () => {
    if (!member.value.id || consumeCount.value == 0) {
        ElNotification({
            title: '提示',
            duration: 1500,
            message: h('i', { style: 'color: teal' }, '请选择会员,和输入物品数量'),
        })
        GoodsModuleVueVisible.value = false
        return;
    }

    const consumeGoods: IGoods = JSON.parse(JSON.stringify(goods.value));
    const theMember: IMember = JSON.parse(JSON.stringify(member.value));
    consumeGoods.count = -1 * consumeCount.value;
    memberServices.consume(theMember, consumeGoods)
        .then((log) => {
            // console.log(log)
            if (log != null) {
                ElNotification({
                    title: '提示',
                    duration: 1500,
                    message: h('i', { style: 'color: teal' }, log.Member?.name + '会员,消费了' + -log.amount + '购买' + log.Good?.name)
                })
                if (log.Member && log.Good) {
                    member.value = log.Member;
                    goods.value = log.Good;
                    updatePage(1);
                }
            } else {
                ElNotification({
                    title: '提示',
                    duration: 1500,
                    message: h('i', { style: 'color: teal' }, "库存或余额不足")
                })
            }
        })

}


</script>

<style>
.credit_label {
    width: 90px;
}
</style>