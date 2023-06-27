const amqplib = require('amqplib/callback_api');
const express = require('express');
const config = require('./config');
const app = express(); 

const queue = 'tasks';
amqplib.connect(config.rabbitMqUrl, (err, conn) => {
  if (err) throw err;

  // Sender
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertQueue(queue);

    ch1.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch1.ack(msg);
      } else {
        console.log('Consumer cancelled by server');
      }
    });
    
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});