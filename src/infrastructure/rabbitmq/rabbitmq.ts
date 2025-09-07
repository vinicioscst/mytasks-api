import amqp, { type Channel, type ChannelModel } from 'amqplib'
import { env } from '@/shared/config/env'

const RABBITMQ_URL = env.RABBITMQ_URL
let connection: ChannelModel | null = null
let channel: Channel | null = null

async function connect() {
  if (channel) {
    return channel
  }

  try {
    connection = await amqp.connect(RABBITMQ_URL, {
      clientProperties: {
        connection_name: 'EmailSender'
      }
    })
    channel = await connection.createChannel()
    return channel
  } catch (error) {
    console.error('Erro ao conectar ao RabbitMQ:', error)
    throw error
  }
}

async function publishToQueue(queueName: string, data: unknown) {
  try {
    const currentChannel = await connect()

    await currentChannel.assertQueue(queueName, { durable: true })

    currentChannel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
      persistent: true
    })
  } catch (error) {
    console.error('Erro ao publicar a mensagem:', error)
    throw new Error()
  }
}

export { connect, publishToQueue }
