<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 16:46:29
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 13:33:22
 * @FilePath: \electron-vite-vue\src\components\member_modified.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElForm>
        <ElDescriptions title="会员信息修改" :border=true>
            <ElDescriptionsItem :span=3 label="手机号:">
                <memberPhoneAutocompleteVue v-model="member" />
                <ElButton type="damage" @click="delMember" style="position:absolute; right: 5rem">注销会员</ElButton>
            </ElDescriptionsItem>
            <ElDescriptionsItem :span="3" label="车牌号">
                <ElInput v-model="member.plate_code" />
            </ElDescriptionsItem>
            <ElDescriptionsItem :span=3 label="名称:">
                <ElInput v-model="member.name" />
            </ElDescriptionsItem>
            <ElDescriptionsItem :span=3 label="性别:">
                <ElRadioGroup v-model="member.sex">
                    <ElRadioButton :label="1">男</ElRadioButton>
                    <ElRadioButton :label="0">女</ElRadioButton>
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
                <ElButton size="large" type="primary" @click="modified">确认修改</ElButton>
            </ElDescriptionsItem>
        </ElDescriptions>
    </ElForm>
</template>
<script setup lang="ts">
import memberPhoneAutocompleteVue from '@/components/member_phone_autocomplete.vue';
import Member from '@/db/model/member';
import { ref } from 'vue';
import { useServiceStore } from '@/service'
import { ElMessage, ElMessageBox } from 'element-plus';

const member = ref({} as Member)

const userServices = useServiceStore().user_services;
const memberServices = useServiceStore().member_services;


const verfiy = (service: Promise<boolean>) => {
    ElMessageBox.prompt('请输入密码', 'Tip', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    })
        .then(({ value }) => {
            userServices.verfiy(value)
                .then((state) => {
                    if (state) {
                        service
                            .then((flag) => {
                                if (flag) {
                                    ElMessage({
                                        type: 'success',
                                        message: `操作成功`,
                                    })
                                    member.value = {} as Member;
                                } else {
                                    ElMessage({
                                        type: 'info',
                                        message: `操作失败`,
                                    })
                                }
                            })

                    } else {
                        ElMessage({
                            type: 'info',
                            message: `密码错误`,
                        })
                    }
                })
        })
}

const modified = ()=>{verfiy(memberServices.modified_member(member.value))}

const delMember = ()=>{verfiy(memberServices.remove_member(member.value))}


</script>