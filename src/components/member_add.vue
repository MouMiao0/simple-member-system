<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 16:42:48
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-09 18:07:29
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
                <ElButton size="large" type="primary" :disabled="addDisabled" @click="add_member">确认注册</ElButton>
            </ElDescriptionsItem>
        </ElDescriptions>
    </ElForm>
</template>
<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import { useServiceStore } from '../../src/Services';
import { ElNotification } from 'element-plus';

const member = ref({} as IMember)
const addDisabled = ref(true);

const stopW = watch(member.value,(m)=>{
    addDisabled.value = m.name == null || m.phone == null || m.sex == null || m.credit== null || m.plate_code== null;
})

const add_member = () => {
    useServiceStore().memberServices.addMember(member.value as Record<any,any>)
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
                        message: '请检查手机号和车牌号的会员是否已经存在',
                        duration: 2000,
                    })
                    break;
            }

        })
};

onUnmounted(()=>{
    stopW();
})

</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>