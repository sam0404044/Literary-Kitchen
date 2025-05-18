import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as Sentry from '@sentry/vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

if (import.meta.env.PROD) {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    sendDefaultPii: true
  })
}

app.mount('#app')
