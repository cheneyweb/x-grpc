const amqp = require('amqplib')

async function main() {
    const conn = await amqp.connect('amqp://localhost')
    const ch = await conn.createChannel()
    let ex = 'direct_logs'
    let severity = 'info'
    let msg = 'Hello World!'
    // 声明调度，调度方式direct直达
    await ch.assertExchange(ex, 'direct', { durable: false })
    // 发送消息
    ch.publish(ex, severity, Buffer.from(msg))
    console.log(`发布给${severity}：${msg}`)
    // 关闭频道
    ch.close()
    // 关闭连接
    process.once('SIGINT', () => { conn.close() })
}

main()