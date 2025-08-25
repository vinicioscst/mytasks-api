import { sendEmail } from '@/infrastructure/email/email-service'
import { connect } from '@/infrastructure/rabbitmq/rabbitmq'

export async function consumeWelcomeEmails() {
  try {
    const channel = await connect()
    const queueName = 'welcome_email_queue'
    await channel.assertQueue(queueName, { durable: true })

    console.log(
      `Worker de e-mails de boas-vindas aguardando mensagens na fila '${queueName}'...`
    )

    channel.consume(
      queueName,
      async (message) => {
        if (message) {
          const emailData = JSON.parse(message.content.toString())
          await sendEmail(emailData)
          channel.ack(message)
        }
      },
      { noAck: false }
    )
  } catch (error) {
    console.error('Erro no worker de e-mails de boas-vindas:', error)
  }
}

export async function consumeTaskNotifications() {
  try {
    const channel = await connect()
    const queueName = 'task_notification_queue'
    await channel.assertQueue(queueName, { durable: true })

    console.log(
      `Worker de notificações de tarefa aguardando mensagens na fila '${queueName}'...`
    )

    channel.consume(
      queueName,
      async (message) => {
        if (message) {
          const emailData = JSON.parse(message.content.toString())
          await sendEmail(emailData)
          channel.ack(message)
        }
      },
      { noAck: false }
    )
  } catch (error) {
    console.error('Erro no worker de notificações de tarefa:', error)
  }
}
