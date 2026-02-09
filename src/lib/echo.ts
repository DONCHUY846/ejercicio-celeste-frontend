import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher: any
    Echo: any
  }
}

let echoInstance: Echo<any> = {} as Echo<any>

if (typeof window !== 'undefined') {
  window.Pusher = Pusher

  echoInstance = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY || 'app-key',
    wsHost: import.meta.env.VITE_REVERB_HOST || 'localhost',
    wsPort: import.meta.env.VITE_REVERB_PORT
      ? parseInt(import.meta.env.VITE_REVERB_PORT)
      : 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT
      ? parseInt(import.meta.env.VITE_REVERB_PORT)
      : 8080,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'http') === 'https',
    enabledTransports: ['ws', 'wss'],
    authorizer: (channel: any) => {
      return {
        authorize: (
          socketId: string,
          callback: (error: any, data: any) => void,
        ) => {
          fetch('http://localhost:8000/broadcasting/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              socket_id: socketId,
              channel_name: channel.name,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              callback(false, data)
            })
            .catch((error) => {
              callback(true, error)
            })
        },
      }
    },
  })
}

export const echo = echoInstance
