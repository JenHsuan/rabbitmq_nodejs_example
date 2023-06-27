const amqplib = require('amqplib/callback_api');
const config = require('./config');

const queue = 'tasks';

amqplib.connect(config.rabbitMqUrl, (err, conn) => {
  if (err) {
    throw err;
  }

  // Sender
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertQueue(queue);

    ch1.sendToQueue(queue, Buffer.from('something to do'));
    return;
  });
});