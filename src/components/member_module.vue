<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 22:13:58
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 03:11:17
 * @FilePath: \electron-vite-vue\src\components\member_module.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElDescriptions title="会员信息" :border=true>
        <ElDescriptionsItem :span=3 label="手机号:">
            <memberPhoneAutocompleteVue v-model="value" />
        </ElDescriptionsItem>
        <ElDescriptionsItem label="车牌号">
            {{value.plate_code}}
        </ElDescriptionsItem>
        <ElDescriptionsItem :span=3 label="名称:">{{ value.name }}</ElDescriptionsItem>
        <ElDescriptionsItem :span=1 label="性别:">{{ (value.sex == 0 ? "女" : value.sex == 1 ?
                "男" : "")
        }}</ElDescriptionsItem>
        <ElDescriptionsItem :span=2 label="余额:" label-class-name="credit_label">{{ value.credit }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="总消费:">{{ value.sum_consum }}</ElDescriptionsItem>
        <ElDescriptionsItem :span=2 label="月消费:">{{ value.month_consume }}</ElDescriptionsItem>
        <ElDescriptionsItem label="消费次数:">{{ value.consum_count }}</ElDescriptionsItem>
    </ElDescriptions>
</template>
<script setup lang="ts">
import Member from '@/db/model/member';
import { computed } from 'vue';
import memberPhoneAutocompleteVue from '@/components/member_phone_autocomplete.vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get(){
        return (props.modelValue as Member)
    },
    set(value){
        emit('update:modelValue',value as Member)
    }

})

</script>