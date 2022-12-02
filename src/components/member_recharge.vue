<template>
    <ElCard>
        <ElCol>
            <memberModuleVue v-model="member" />
            <ElRow>
                <ElCol :offset="18" :span="4">
                    <ElButton size="large" type="primary" style="margin-top: 20px;">确认充值</ElButton> 
                </ElCol>
            </ElRow>
        </ElCol>
    </ElCard>
</template>
<script setup lang="ts">
import memberModuleVue from '@/components/member_module.vue';
import Member from '@/db/model/member';
import { ref } from 'vue';

const member = ref({} as Member);

</script>