const amqp = require('amqplib')

async function main() {
    const conn = await amqp.connect(`amqp://${consts.HOST}`)
    const ch = await conn.createChannel()
    let q = 'hello'
    let ok = await ch.assertQueue(q, { durable: false })
    console.log('等待...')
    ch.consume(q, (msg) => { console.log(`收到：${msg.content.toString()}`) }, { noAck: true })
    // 关闭连接
    process.once('SIGINT', () => { conn.close() })
}

main()