import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const chatData = ref([
    {
      id: 1,
      role: 'bot',
      content:
        '您好，我是臺北城市儀表板 - 聊天機器人，很高興為您服務 ! 以下是常見問題按鈕，您可以點擊常見問題按鈕或自行輸入文字內容。',
      button: [
        { id: 1, text: '站臺簡介' },
        { id: 2, text: '如何自行佈署網站' },
        { id: 3, text: '站臺資料主題類型' },
      ],
    },
    // {
    //   id: 2,
    //   role: 'user',
    //   content: '我想詢問關於臺北城市儀表板的黑客松競賽資訊',
    // },
  ])

  const addChatData = (newChatData) => {
    chatData.value.push({ id: chatData.value.length + 1, ...newChatData })
  }

  return { chatData, addChatData }
})
