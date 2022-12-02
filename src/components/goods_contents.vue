<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 23:46:21
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 11:50:00
 * @FilePath: \electron-vite-vue\src\components\goods_contents.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElCard header="商品目录">
        <ElTable :data="goodsList" style="width:100%" :border="true">
            <ElTableColumn prop="name" label="名称" />
            <ElTableColumn prop="price" label="价格" />
            <ElTableColumn prop="count" label="库存" />
            <ElTableColumn prop="created_time" label="创建时间" />
            <ElTableColumn label="操作" :min-width="150">
                <template #default="scope">
                    <ElRow justify="space-evenly">
                        <ElCol :span=10 >
                            <ElButton type="primary" @click="editGoods(scope.$index)">编辑</ElButton>
                        </ElCol>
                        <ElCol :span=10 >
                            <el-popconfirm title="确认删除?" @confirm="delGoods(scope.$index)" confirm-button-text="是"
                                cancel-button-text="否">
                                <template #reference>
                                    <el-button>删除</el-button>
                                </template>
                            </el-popconfirm>
                        </ElCol>
                    </ElRow>
                </template>
            </ElTableColumn>
        </ElTable>
    </ElCard>
    <ElDialog v-model="goodsModuleVisible">
        <goodsModuleVue v-model="editingGoods" :disable-auto-complete=true />
        <ElRow justify="end">
            <ElButton @click="doEditGoods" type="primary">确认修改</ElButton>
            <ElButton @click="(goodsModuleVisible = false)">取消</ElButton>
        </ElRow>
    </ElDialog>
</template>
<script setup lang="ts">
import { useServiceStore } from '@/service'
import { ref } from 'vue';
import goodsModuleVue from '@/components/goods_module.vue'
import Goods from '@/db/model/goods';

const goodsModuleVisible = ref(false);
let currentIndex: number;
let editingGoods: Goods;

const serviceStore = useServiceStore();
const goodsServices = serviceStore.goods_services;
const page = goodsServices.get_goods();
const goodsList = ref(page.record);

const editGoods = (index: number) => {
    let goods = goodsList.value[index];
    currentIndex = index;
    editingGoods = JSON.parse(JSON.stringify(goods));
    goodsModuleVisible.value = true;
}

const doEditGoods = () => {
    if (goodsServices.modified(editingGoods)) {
        goodsList.value[currentIndex] = editingGoods;
        goodsModuleVisible.value = false;
    } else {

    }
}

const delGoods = (index: number) => {

    if (goodsServices.remove(goodsList.value[index])) {

    } else {

    }
}
</script>