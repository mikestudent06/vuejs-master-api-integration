<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { defineModel, defineEmits } from "vue";

interface Props {
  title?: string;
  description?: string;
}
defineProps<Props>();

const isOpen = defineModel("isOpen", {
  required: true,
  type: Boolean
});
const emit = defineEmits(["onClose"]);
</script>

<template>
  <Dialog :open="isOpen" @update:open="emit('onClose')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle v-if="title">{{ title }}</DialogTitle>
        <DialogDescription v-if="description">{{
          description
        }}</DialogDescription>
      </DialogHeader>

      <slot />
    </DialogContent>
  </Dialog>
</template>
