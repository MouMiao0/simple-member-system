<template>
    <ElForm>
        <ElDescriptions title="注册会员" :border=true>
            <ElDescriptionsItem :span=3 label="手机号:">
                <ElInput type="number" v-model="member.phone" />
            </ElDescriptionsItem>
            <ElDescriptionsItem :span=3 label="名称:">
                <ElInput v-model="member.name" />
            </ElDescriptionsItem>
            <ElDescriptionsItem :span=3 label="性别:">
                <ElRadioGroup v-model="member.sex" >
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
                <ElButton size="large" type="primary" @click="add_member">确认注册</ElButton>
            </ElDescriptionsItem>
        </ElDescriptions>
    </ElForm>
</template>
<script setup lang="ts">
import Member from '@/db/model/member'
import { ref} from 'vue';
import { useServiceStore } from '@/service';

const member = ref({} as Member)

const add_member = ()=>{useServiceStore().member_services.add_member(member.value)};

</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

</style>