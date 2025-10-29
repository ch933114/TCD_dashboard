<script setup>
import { RouterView } from 'vue-router'
import ChatBotIcon from './components/icon/ChatBotIcon.vue'
import ChatBox from './components/ChatBox.vue'
import { ref } from 'vue'

const isChatBoxShow = ref(true)
const chatbotBtnHandler = () => {
  isChatBoxShow.value = !isChatBoxShow.value
}
</script>

<template>
  <RouterView />
  <div class="fixed bottom-6 right-6 flex items-end gap-4">
    <!-- 聊天室 -->
    <ChatBox v-if="isChatBoxShow" class="w-[350px] h-full mb-[35px]" />

    <!-- 按鈕 -->
    <button
      @click="chatbotBtnHandler"
      class="w-[70px] h-[70px] flex items-center justify-center rounded-full bg-blue-500 brightness-150 hover:brightness-100"
    >
      <ChatBotIcon />
    </button>
  </div>
</template>
