<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 23:53:30
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 06:48:42
 * @FilePath: \electron-vite-vue\src\components\goods_add.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElRow justify="space-evenly">
        <ElCol :span="10">
            <ElCard header="商品入库">
                <GoodsModuleVue v-model="currentGoods" :disable-auto-complete="false"
                    :readonly="true" />
                <ElFormItem label="入库数量:">
                    <ElInputNumber min="0" v-model="currentGoodscount"/>
                </ElFormItem>
                <ElFormItem label="入库花费:">
                    <ElInputNumber min="0" v-model="amount" />
                </ElFormItem>
                <ElRow>
                    <ElCol :lg="18" :md="16" :sm="10" />
                    <ElCol :lg="4" :md="6" :sm="14">
                        <ElButton size="large" type="primary" @click="storage">确定入库</ElButton>
                    </ElCol>
                </ElRow>
            </ElCard>
        </ElCol>
        <ElCol :span="10">
            <ElCard header="添加商品">
                <GoodsModuleVue :counts-min="0" v-model="newGoods" :disable-auto-complete="true" />
                <ElRow>
                    <ElCol :lg="18" :md="16" :sm="10" />
                    <ElCol :lg="4" :md="6" :sm="14">
                        <ElButton size="large" type="primary" @click="addGoods">确定添加</ElButton>
                    </ElCol>
                </ElRow>
            </ElCard>
        </ElCol>
    </ElRow>
</template>
<script setup lang="ts">
import GoodsModuleVue from '@/components/goods_module.vue'
import Goods from '@/db/model/goods';
import { h, onUnmounted, ref, watch } from 'vue';
import { useServiceStore } from '@/service';
import { stat } from 'fs';
import { ElNotification } from 'element-plus';

const goosdService = useServiceStore().goods_services;
const currentGoods = ref({} as Goods);
const newGoods = ref({} as Goods);
const amount = ref(0)
const currentGoodscount = ref(0)


const addGoods = () => {
    goosdService.addGoods(newGoods.value)
        .then((state) => {
            if (state) {
                ElNotification({
                    title: '提示',
                    message: h('i', { style: 'color: teal' }, '添加成功'),
                    duration: 1200
                })
            }else{
                ElNotification({
                    title: '提示',
                    message: h('i', { style: 'color: teal' }, '添加失败'),
                    duration: 1200
                })
            }
        })
}

const storage = () => {
    const goods : Goods =  JSON.parse(JSON.stringify(currentGoods.value));
    if(goods!=null){
        if(goods.count == null) goods.count = currentGoodscount.value;
        else goods.count += currentGoodscount.value;
    } 
    goosdService.storage(goods,amount.value)
        .then((state) => {
            if (state) {
                ElNotification({
                    title: '提示',
                    message: h('i', { style: 'color: teal' }, '入库成功'),
                    duration: 1200
                })
            }else{
                ElNotification({
                    title: '提示',
                    message: h('i', { style: 'color: teal' }, '入库失败'),
                    duration: 1200
                })
            }
        })
}
</script>