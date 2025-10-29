<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import SendIcon from './icon/SendIcon.vue'

import { useChatStore } from '@/stores/chat'
import BotLogo from './icon/BotLogo.vue'
import UserLogo from './icon/UserLogo.vue'
const chatStore = useChatStore()
const { addChatData } = chatStore
const { chatData } = storeToRefs(chatStore)
const userMessage = ref('')
const chatAreaRef = ref(null)

const qaBtnHandler = (text) => {
  addChatData({
    role: 'user',
    content: text,
  })
}

const sendBtnHandler = (text) => {
  if (!text.trim()) return
  addChatData({
    role: 'user',
    content: text,
  })
  userMessage.value = ''
}

watch(
  () => chatData.value.length,
  async () => {
    // === 聊天區滾動邏輯 ===
    await nextTick()
    const chat = chatAreaRef.value
    if (!chat) return
    chat.scrollTop = chat.scrollHeight - chat.clientHeight
  },
  { deep: true },
)
</script>

<template>
  <div class="bg-[#090909] border boder-[#888787] w-[400px] rounded-[20px] overflow-hidden">
    <div class="p-[1rem] bg-[#494B4E] border-b-[3px] border-[#888787]">
      <h2 class="text-xl font-bold text-white">臺北城市儀表板 - 聊天機器人</h2>
    </div>
    <div ref="chatAreaRef" class="h-[400px] m-2 overflow-y-auto bg-[#090909] scrollbar-custom">
      <div v-for="chat in chatData" :key="chat.id" class="flex flex-col p-[0.75rem]">
        <!-- 機器人訊息 -->
        <div v-if="chat.role === 'bot'" class="flex flex-col gap-2">
          <div class="flex gap-2">
            <div class="w-[40px] h-[40px] flex items-center justify-center shrink-0">
              <BotLogo class="w-full h-auto" />
            </div>
            <div v-if="chat.content" class="flex flex-col gap-4">
              <div class="w-full border border-white rounded-[10px] p-2 bg-[#282A2C]">
                <p class="text-white whitespace-pre-line px-2">{{ chat.content }}</p>
              </div>
              <!-- 一般按鈕 -->
              <div
                v-if="chat.button"
                class="flex gap-2 overflow-x-auto scrollbar-x-hide"
                v-horizontal-wheel
              >
                <div v-for="(btn, index) in chat.button" :key="btn.id" class="shrink-0">
                  <button
                    @click="qaBtnHandler(btn.text)"
                    :key="index"
                    class="bg-[#494B4E] text-white py-1 px-4 rounded-[15px] hover:brightness-50"
                  >
                    {{ btn.text }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 使用者訊息 -->
        <div v-else class="flex flex-col">
          <div class="flex gap-2 flex-row-reverse">
            <div class="w-[40px] h-[40px] flex items-center justify-center shrink-0">
              <UserLogo class="w-full h-auto" />
            </div>
            <div v-if="chat.content" class="flex flex-col gap-4">
              <div class="w-full border border-white rounded-[10px] p-2 bg-[#282A2C]">
                <p class="text-white whitespace-pre-line px-2">{{ chat.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center gap-2 px-[1.125rem] py-[1.5rem] bg-[#494B4E]">
      <input
        type="text"
        v-model="userMessage"
        @keyup.enter="sendBtnHandler(userMessage)"
        class="bg-[#D9D9D9] h-[40px] w-full rounded-[20px] px-[1rem]"
      />
      <button
        class="h-[40px] flex items-center justify-center hover:brightness-50"
        @click="sendBtnHandler(userMessage)"
      >
        <SendIcon />
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-x-hide {
  scrollbar-width: none; /* Firefox */
}
.scrollbar-x-hide::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
.scrollbar-custom::-webkit-scrollbar {
  width: 2px;
  background: transparent;
}
.scrollbar-custom::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 8px;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: #ababab;
}
</style>
