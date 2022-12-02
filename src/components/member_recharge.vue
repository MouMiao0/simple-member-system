<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 16:50:15
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 05:32:28
 * @FilePath: \electron-vite-vue\src\components\member_recharge.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElCard>
        <ElCol>
            <memberModuleVue v-model="member" />
            <ElRow>
                <ElCol :offset="18" :span="4">
                    <ElButton size="large" type="primary" @click="open" style="margin-top: 20px;">充值</ElButton>
                </ElCol>
            </ElRow>
        </ElCol>
    </ElCard>
</template>
<script setup lang="ts">
import memberModuleVue from '@/components/member_module.vue';
import Member from '@/db/model/member';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import { useServiceStore } from '@/service';

const member = ref({} as Member);
const memberServices = useServiceStore().member_services;

const open = () => {
    ElMessageBox.prompt('请输入金额', 'Tip', {
        confirmButtonText: '确认充值',
        cancelButtonText: '取消',
        inputPattern:
            /^[0-9]*$/,
        inputErrorMessage: '无效金额',
    })
        .then((value) => {
            const amount = Number(value.value);
            memberServices.pay(member.value, amount)
                .then((state) => {
                    if (state) {
                        ElMessage({
                            type: 'info',
                            message: `充值成功`,
                        })
                        
                        if(member.value.credit) member.value.credit += amount
                        else member.value.credit = amount;
                    } else {
                        ElMessage({
                            type: 'info',
                            message: `充值失败`,
                        })
                    }
                })

        })
}
</script>