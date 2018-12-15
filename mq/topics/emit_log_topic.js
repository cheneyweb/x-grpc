const amqp = require('amqplib')

async function main() {
    const conn = await amqp.connect('amqp://localhost')
    const ch = await conn.createChannel()
    let ex = 'topic_logs'
    let rk = 'big.red.fast'
    let msg = 'Hello World!'
    // 声明调度，调度方式topic主题
    await ch.assertExchange(ex, 'topic', { durable: false })
    // 发送消息
    ch.publish(ex, rk, Buffer.from(msg))
    console.log(`发布主题${rk}：${msg}`)
    // 关闭频道
    ch.close()
    // 关闭连接
    process.once('SIGINT', () => { conn.close() })
}

main()