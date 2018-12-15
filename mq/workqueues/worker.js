const amqp = require('amqplib')

async function main() {
    const conn = await amqp.connect('amqp://localhost')
    const ch = await conn.createChannel()
    let q = 'task_queue'
    let ok = await ch.assertQueue(q, { durable: true })
    // 设置每次只读取一条消息
    ch.prefetch(1)
    console.log('等待...')
    // 接收消息，执行任务，需要完成确认
    ch.consume(q, doWork.bind(ch), { noAck: false })
    // 关闭连接
    process.once('SIGINT', () => { conn.close() })
}

// 执行任务
function doWork(msg) {
    let body = msg.content.toString()
    console.log(`收到：${body}`)
    setTimeout(() => {
        this.ack(msg)
        console.log("任务完成")
    }, 3000)
}

main()