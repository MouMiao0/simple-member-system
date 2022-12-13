<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 17:07:10
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-10 09:09:46
 * @FilePath: \electron-vite-vue\src\components\member_phone_autocomplete.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElAutocomplete v-model="value" :fetch-suggestions="querySearch" value-key="phone" @select="select_member"  />
</template>
<script setup lang="ts">
import { useServiceStore } from "../../src/Services"
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return (props.modelValue as IMember).phone
    },
    set(value) {
        emit('update:modelValue', { phone: value } as IMember)
    }
})

const select_member = (item: Record<string, any>) => {
    emit('update:modelValue', item as IMember)
}


const serviceStore = useServiceStore();
const memberServices = serviceStore.memberServices;

const querySearch = (queryString: string, cb: any) => {
    const phoneNumber = Number(queryString);
    const headerNumber = Number(queryString[0]);
    const results = isNaN(headerNumber)
        ? []
        : (
            headerNumber === 1
                ? memberServices.searchByPhone(phoneNumber).then((members)=>{cb(members)})
                : memberServices.searchByPhoneLastIV(phoneNumber).then((members)=>{cb(members)})
        )
}


</script>
<style>
.col {
    align-items: center;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

</style>