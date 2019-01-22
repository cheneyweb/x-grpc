const amqp = require('amqplib')

async function main() {
    const conn = await amqp.connect('amqp://localhost')
    const ch = await conn.createChannel()
    let q = 'task_queue'
    // 声明队列，持久化
    let ok = await ch.assertQueue(q, { durable: true })
    // 发送消息，持久化
    for (let i = 0; i < 10; i++) {
        ch.sendToQueue(q, Buffer.from(i.toString()), { deliveryMode: true })
        console.log(`发送：${i}`)
    }
    // 关闭频道
    ch.close()
    // 关闭连接
    process.once('SIGINT', () => { conn.close() })
}

main()