<template>
    <ElAutocomplete v-model="value" :fetch-suggestions="querySearch" value-key="phone" @select="select_member"  />
</template>
<script setup lang="ts">
import member from '@/db/model/member';
import { useServiceStore } from "@/service"
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return (props.modelValue as member).phone
    },
    set(value) {
        emit('update:modelValue', { phone: value } as member)
    }
})

const select_member = (item: Record<string, any>) => {
    emit('update:modelValue', item as member)
}


const serviceStore = useServiceStore();
const memberServices = serviceStore.member_services;

const querySearch = (queryString: string, cb: any) => {
    const phoneNumber = Number(queryString);
    const headerNumber = Number(queryString[0]);
    const results = isNaN(headerNumber)
        ? []
        : (
            headerNumber == 1
                ? memberServices.search_by_phone(phoneNumber)
                : memberServices.search_by_phone_last_iv(phoneNumber)
        )
    cb(results)
}


</script>
<style>
.col {
    align-items: center;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

</style>