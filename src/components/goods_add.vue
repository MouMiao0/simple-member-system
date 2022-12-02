<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 23:53:30
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 11:57:15
 * @FilePath: \electron-vite-vue\src\components\goods_add.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElRow justify="space-evenly">
        <ElCol :span="10">
            <ElCard header="商品入库">
                <GoodsModuleVue :counts-min="minGoodsCount" v-model="currentGoods" :disable-auto-complete="false"
                    :readonly="true" />
                <ElFormItem label="入库数量:">
                    <ElInputNumber min="0" />
                </ElFormItem>
                <ElRow>
                    <ElCol :lg="18" :md="16" :sm="10"/>
                    <ElCol :lg="4" :md="6" :sm="14">
                        <ElButton size="large" type="primary">确定入库</ElButton>
                    </ElCol>
                </ElRow>
            </ElCard>
        </ElCol>
        <ElCol :span="10">
            <ElCard header="添加商品">
                <GoodsModuleVue :counts-min="0" v-model="newGoods" :disable-auto-complete="true" />
                <ElRow>
                    <ElCol :lg="18" :md="16" :sm="10" />
                    <ElCol :lg="4" :md="6" :sm="14" >
                        <ElButton size="large" type="primary">确定添加</ElButton>
                    </ElCol>
                </ElRow>
            </ElCard>
        </ElCol>
    </ElRow>
</template>
<script setup lang="ts">
import GoodsModuleVue from '@/components/goods_module.vue'
import Goods from '@/db/model/goods';
import { onUnmounted, ref, watch } from 'vue';

const currentGoods = ref({} as Goods);
const newGoods = ref({} as Goods);
let minGoodsCount = ref(0);

const stopwatch = watch(currentGoods.value, (goods) => {
    let count = goods.count;
    console.log(currentGoods.value)
    minGoodsCount.value = count ?? 0;
})

onUnmounted(() => {
    stopwatch();
})
</script>