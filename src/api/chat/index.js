import { chatController } from "./controllers/chat.js"
  
const chat = {
    plugin: {
        name: 'chat',
        register: (server) => {
        server.route([
            {
            method: 'POST',
            path: '/chat',
            ...chatController
            }
        ])
        }
    }
}

export { chat }