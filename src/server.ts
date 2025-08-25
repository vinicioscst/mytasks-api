import { app } from './app'
import { env } from './shared/config/env'
import {
  consumeTaskNotifications,
  consumeWelcomeEmails
} from './shared/workers/email-worker'

consumeWelcomeEmails()
consumeTaskNotifications()

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`API running on port ${env.PORT}`)
})
