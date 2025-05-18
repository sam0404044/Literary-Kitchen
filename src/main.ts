import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as Sentry from '@sentry/vue'

const app = createApp(App)

if (import.meta.env.PROD) {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    sendDefaultPii: true
  })
}

app.mount('#app')
