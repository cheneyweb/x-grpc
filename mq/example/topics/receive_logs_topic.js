const amqp = require('amqplib')

async function main() {
    const conn = await amqp.connect('amqp://localhost')
    const ch = await conn.createChannel()
    let ex = 'topic_logs'
    let rk = '#.fast'
    // 声明调度，调度方式topic主题
    let ok = await ch.assertExchange(ex, 'topic', { durable: false })
    // 声明队列，排它独享
    let qok = await ch.assertQueue('', { exclusive: true })
    // 频道绑定队列和调度
    await ch.bindQueue(qok.queue, ex, rk)
    console.log('等待...')
    // 接收消息，执行任务，需要完成确认
    ch.consume(qok.queue, (msg) => { console.log(`收到：${msg.content.toString()}`) }, { noAck: true })
    // 关闭连接
    process.once('SIGINT', () => { conn.close() })
}

main()