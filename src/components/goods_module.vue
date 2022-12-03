<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 23:50:58
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 07:14:19
 * @FilePath: \electron-vite-vue\src\components\goods_module.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElForm>
        <ElFormItem label="商品名字:">
            <ElInput v-if="(props.disableAutoComplete)" v-model="value.name" />
            <ElAutocomplete v-else v-model="value.name" value-key="name" :fetch-suggestions="querySearch" @select="handleSelect"/>
        </ElFormItem>
        <ElFormItem label="商品价格:">
            <ElInputNumber :readonly="(props.readonly)" :controls="(!props.readonly)" v-model="value.price" :min="0" />
        </ElFormItem>
        <ElFormItem label="商品库存:">
            <ElInputNumber :readonly="(props.readonly)" :controls="(!props.readonly)" v-model="value.count" :min="( props.countsMin!=undefined ? props.countsMin : 0)"/>
        </ElFormItem>
    </ElForm>
</template>
<script setup lang="ts">
import Goods from '@/db/model/goods';
import { useServiceStore } from '@/service';
import { computed } from 'vue';

const goodsServices = useServiceStore().goods_services;

const props = defineProps<{
    modelValue?: Goods,
    disableAutoComplete?: boolean
    readonly?: boolean
    countsMin?: number
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.modelValue as Goods;
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const querySearch = (queryString: string, cb: any)=>{
    goodsServices.queryGoods(queryString)
    .then((res)=>{
        cb(res);
    })
}

const handleSelect = (goods: Record<string, any>)=>{
    emit('update:modelValue', goods as Goods)
}
</script>