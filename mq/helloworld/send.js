const amqp = require('amqplib')

async function main() {
    const conn = await amqp.connect('amqp://localhost')
    const ch = await conn.createChannel()
    let q = 'hello'
    let msg = 'Hello World!'
    // 声明队列，非持久化
    let ok = await ch.assertQueue(q, { durable: false })
    // 发送消息，非持久化
    ch.sendToQueue(q, Buffer.from(msg))
    console.log(`发送：${msg}`)
    // 关闭频道
    ch.close()
    // 关闭连接
    process.once('SIGINT', () => { conn.close() })
}

main()