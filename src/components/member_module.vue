<template>
    <ElDescriptions title="会员信息" :border=true>
        <ElDescriptionsItem :span=3 label="手机号:">
            <memberPhoneAutocompleteVue v-model="value" />
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
import member from '@/db/model/member';
import { computed } from 'vue';
import memberPhoneAutocompleteVue from '@/components/member_phone_autocomplete.vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get(){
        return (props.modelValue as member)
    },
    set(value){
        emit('update:modelValue',value as member)
    }

})

</script>