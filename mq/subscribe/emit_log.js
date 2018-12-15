const amqp = require('amqplib')

async function main() {
    const conn = await amqp.connect('amqp://localhost')
    const ch = await conn.createChannel()
    let ex = 'logs'
    let msg = 'Hello World!'
    // 声明调度，调度方式fanout广播
    await ch.assertExchange(ex, 'fanout', { durable: false })
    // 发送消息
    ch.publish(ex, '', Buffer.from(msg))
    console.log(`发布：${msg}`)
    // 关闭频道
    ch.close()
    // 关闭连接
    process.once('SIGINT', () => { conn.close() })
}

main()