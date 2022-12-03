<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 23:46:21
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 11:29:47
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
                        <ElCol :span=10>
                            <ElButton type="primary" @click="editGoods(scope.$index)">编辑</ElButton>
                        </ElCol>
                        <ElCol :span=10>
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
        <ElDivider/>
        <el-pagination background layout="prev, pager, next" :current-page="page.currentPage" @current-change="updatePage" :page-count="page.pageCounts" />
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
import { onMounted, ref } from 'vue';
import goodsModuleVue from '@/components/goods_module.vue'
import Goods from '@/db/model/goods';
import IPage from '@/db/model/Ipage';

const goodsModuleVisible = ref(false);
let currentIndex: number;
let editingGoods: Goods;

const serviceStore = useServiceStore();
const goodsServices = serviceStore.goods_services;
const page = ref({} as IPage<Goods>);
const goodsList = ref([] as Goods[]);

const editGoods = (index: number) => {
    let goods = goodsList.value[index];
    currentIndex = index;
    editingGoods = JSON.parse(JSON.stringify(goods));
    goodsModuleVisible.value = true;
}

const doEditGoods = () => {
    goodsServices.modified(editingGoods).then((state) => {
        if (state) {
            goodsList.value[currentIndex] = editingGoods;
            goodsModuleVisible.value = false;
        } else {

        }
    })
}

const delGoods = (index: number) => {
    goodsServices.remove(goodsList.value[index]).then((state)=>{
        if(state) goodsList.value.splice(index,1);
    })
}

onMounted(()=>{
    goodsServices.get_goods()
    .then((resPage)=>{
        page.value = resPage;
        goodsList.value = page.value.record;
    })
})

const updatePage = (index:number)=>{
    goodsServices.get_goods(index)
    .then((resPage)=>{
        page.value = resPage;
        goodsList.value = page.value.record;
    })
}
</script>