<!--
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-13 13:40:37
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-14 15:41:42
 * @FilePath: \electron-vite-vue\src\components\UserHeaderBar.Vue
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
-->
<template>
    <ElDropdown trigger="click">
        <ElIcon :size="20" class="moreIco">
            <More />
        </ElIcon>
        <template #dropdown>
            <ElDropdownMenu>
                <ElDropdownItem @click="handlerModifingUserName">修改登陆用户名</ElDropdownItem>
                <ElDropdownItem @click="handlerModifingPW">修改登陆密码</ElDropdownItem>
                <ElDropdownItem @click="handlerLogout">退出登出</ElDropdownItem>
            </ElDropdownMenu>
        </template>
    </ElDropdown>

    <ElDialog v-model="fromDisable">
        <ElCard>
            <ElForm :rules="fromRules" label-width="150px" ref="verifyForm" :model="fromInputs">
                <ElFormItem :label="'原' + fromContent + ':'" prop="inp0">
                    <ElInput :type="(isPw ? 'password' : 'text')" :show-password="isPw" v-model="fromInputs.inp0"
                        :formatter="noSpace" />
                </ElFormItem>
                <ElFormItem :label="'修改后' + fromContent + ':'" prop="inp1">
                    <ElInput :type="(isPw ? 'password' : 'text')" :show-password="isPw" v-model="fromInputs.inp1"
                        :formatter="noSpace" />
                </ElFormItem>
                <ElFormItem :label="'确认修改后' + fromContent + ':'" prop="inp1Check">
                    <ElInput :type="(isPw ? 'password' : 'text')" :show-password="isPw" v-model="fromInputs.inp1Check"
                        :formatter="noSpace" />
                </ElFormItem>
                <ElFormItem>
                    <ElButton type="primary" @click="submitFrom(verifyForm)">确认</ElButton>
                    <ElButton @click="(fromDisable = false)">取消</ElButton>
                </ElFormItem>
            </ElForm>
        </ElCard>
    </ElDialog>
</template>
    
<script lang='ts' setup>
import { More } from '@element-plus/icons-vue';
import { type FormInstance, FormItemRule, FormRules, ElNotification } from 'element-plus';
import { ref, reactive, computed } from 'vue';
import { useServiceStore } from '../Services';

const isPw = ref(false);
const verifyForm = ref<FormInstance>()
const serviceStore = useServiceStore();
const userServices = serviceStore.userServices;
const fromContent = computed(() => isPw.value ? "密码" : "用户名");
const fromDisable = ref(false);
const fromInputs = reactive({
    inp0: '',
    inp1: '',
    inp1Check: '',
});

const validatorInput = (rules: any, value: any, callback: any) => {
    if (fromInputs.inp1Check !== '') {
        if (!verifyForm.value) return;
        verifyForm.value.validateField('inp1Check', () => null)
    }
    callback()
}

const validatorInput1 = (rules: any, value: any, callback: any) => {
    if (fromInputs.inp1 === fromInputs.inp1Check) callback();
    else callback(new Error('两次输入不相同'))
}

const fromRules: FormRules = reactive({
    inp0: [
        { required: true, message: '请输入内容', trigger: 'change' }
    ] as FormItemRule[],
    inp1: [
        { required: true, message: '请输入内容', trigger: 'change' },
        { validator: validatorInput, trigger: 'blur' }
    ] as FormItemRule[],
    inp1Check: [
        { required: true, message: '请输入内容', trigger: 'change' },
        { validator: validatorInput1, trigger: 'blur' }
    ] as FormItemRule[],
})


const noSpace = (value: string | number) => {
    if (typeof value === 'number') return new String(value)
    return value.replace(/\W/g, '');
}


const submitFrom = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            if (isPw.value) {
                userServices.modifedUserPw(fromInputs.inp0, fromInputs.inp1)
                    .then((state) => {
                        if (state === 1) {
                            ElNotification({
                                message: '修改密码成功'
                            })
                            fromDisable.value = false;
                            handlerLogout();
                        }else{
                            ElNotification({
                                message: '原密码不正确'
                            })
                        }
                    })
            } else {
                userServices.modifiedUserName(fromInputs.inp0, fromInputs.inp1)
                    .then((state) => {
                        if (state === 1) {
                            ElNotification({
                                message: '修改用户名成功'
                            })
                            fromDisable.value = false;
                            handlerLogout();
                        }else{
                            ElNotification({
                                message: '原用户名不正确'
                            })
                        }
                    })
            }
        } else {
            console.log('数据格式不对')
        }
    })
}

const showForm = () => {
    verifyForm.value?.resetFields();
    fromDisable.value = true;
}

const handlerModifingUserName = () => {
    isPw.value = false;
    showForm();
}

const handlerModifingPW = () => {
    isPw.value = true;
    showForm();
}

const handlerLogout = () => {
    serviceStore.user_info = {};
    serviceStore.not_login = true;
}



</script>
    
<style >
.moreIco {
    margin: 10px
}
</style>
    