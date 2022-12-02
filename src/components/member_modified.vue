<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 16:46:29
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 04:42:17
 * @FilePath: \electron-vite-vue\src\components\member_modified.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElForm>
        <ElDescriptions title="会员信息修改" :border=true>
            <ElDescriptionsItem :span=3 label="手机号:">
                <memberPhoneAutocompleteVue v-model="member"/>
            </ElDescriptionsItem>
            <ElDescriptionsItem :span=3 label="名称:">
                <ElInput v-model="member.name" />
            </ElDescriptionsItem>
            <ElDescriptionsItem :span=3 label="性别:">
                <ElRadioGroup v-model="member.sex">
                    <ElRadioButton label="1" >男</ElRadioButton>
                    <ElRadioButton label="0">女</ElRadioButton>
                </ElRadioGroup>
            </ElDescriptionsItem>
            <ElDescriptionsItem :span=3 label="余额:" label-class-name="credit_label">
                <ElInput type="number" v-model="member.credit">
                    <template #append>
                        元
                    </template>
                </ElInput>
            </ElDescriptionsItem>
            <ElDescriptionsItem :align="'right'">
                <ElButton size="large" type="primary">确认修改</ElButton>
            </ElDescriptionsItem>
        </ElDescriptions>
    </ElForm>
</template>
<script setup lang="ts">
import memberPhoneAutocompleteVue from '@/components/member_phone_autocomplete.vue';
import Member from '@/db/model/member';
import { ref } from 'vue';

const member = ref({} as Member)

</script>