import { app } from './app'
import { env } from './shared/config/env'
import { consumeEmails } from './shared/workers/email-worker'

consumeEmails()

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`API running on port ${env.PORT}`)
})
