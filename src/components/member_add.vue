<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 16:42:48
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 04:36:09
 * @FilePath: \electron-vite-vue\src\components\member_add.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElForm>
        <ElDescriptions title="注册会员" :border=true>
            <ElDescriptionsItem :span=3 label="手机号:">
                <ElInput type="number" v-model="member.phone" />
            </ElDescriptionsItem>
            <ElDescriptionsItem :span="3" label="车牌号">
                <ElInput v-model="member.plate_code" />
            </ElDescriptionsItem>
            <ElDescriptionsItem :span=3 label="名称:">
                <ElInput v-model="member.name" />
            </ElDescriptionsItem>
            <ElDescriptionsItem :span=3 label="性别:">
                <ElRadioGroup v-model="member.sex">
                    <ElRadioButton label="1">男</ElRadioButton>
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
                <ElButton size="large" type="primary" @click="add_member">确认注册</ElButton>
            </ElDescriptionsItem>
        </ElDescriptions>
    </ElForm>
</template>
<script setup lang="ts">
import Member from '@/db/model/member'
import { ref } from 'vue';
import { useServiceStore } from '@/service';
import { ElNotification } from 'element-plus';

const member = ref({} as Member)

const add_member = () => {
    useServiceStore().member_services.add_member(member.value)
        .then((code) => {
            switch (code) {
                case 0:
                    ElNotification({
                        title: '注册失败',
                        message: '手机号位数不对',
                        duration: 2000,
                    })
                    break;
                case 1:
                    ElNotification({
                        title: '注册成功',
                        message: '车牌' + member.value.plate_code + "的会员注册成功,余额" + member.value.credit + "元",
                        duration: 2000,
                    })
                    break;
                case 2:
                    ElNotification({
                        title: '注册失败',
                        message: '手机号为' + member.value.phone + '的会员已存在',
                        duration: 2000,
                    })
                    break;
                case 3:
                    ElNotification({
                        title: '注册失败',
                        message: '车牌号为' + member.value.plate_code + '的会员已存在',
                        duration: 2000,
                    })
            }

        })
};

</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>