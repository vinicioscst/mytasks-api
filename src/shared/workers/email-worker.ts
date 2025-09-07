import { sendEmail } from '@/infrastructure/email/email-service'
import { connect } from '@/infrastructure/rabbitmq/rabbitmq'

export async function consumeEmails() {
  try {
    const channel = await connect()
    const queueName = 'email_queue'
    await channel.assertQueue(queueName, { durable: true })

    console.log(
      `Worker de e-mails aguardando mensagens na fila '${queueName}'...`
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
    console.error('Erro no worker de e-mails:', error)
  }
}
