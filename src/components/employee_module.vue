<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 13:16:19
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 14:55:39
 * @FilePath: \electron-vite-vue\src\components\employee_module.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElForm :disabled="props.disabled">
        <ElFormItem label="名字:">
            <ElInput v-model="value.name"/>
        </ElFormItem>
        <ElFormItem label="手机号:">
            <ElInput type="number" v-model="value.phone"/>
        </ElFormItem>
        <ElFormItem label="月薪:">
            <ElInput type="number" v-model="value.salary"/> 
        </ElFormItem>
    </ElForm>
</template>
<script setup lang="ts">
import Employee from '@/db/model/employee';
import { computed } from 'vue';


const props = defineProps<{
    modelValue : Employee
    disabled ?: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get(){
        return props.modelValue
    },
    set(value){
        emit('update:modelValue', value)
    }
})

</script>