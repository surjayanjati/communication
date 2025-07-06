import amqp from "amqplib";

//// Function for sending messages through message broker queue------------------/
export const sendQueueMessage = async (queueName: string, message: any) => {
  console.log("went till here");

  const conn = await amqp.connect(process.env.RABBITMQ_URI!);
  const channel = await conn.createChannel();
  console.log(channel);

  await channel.assertQueue(queueName, { durable: true });

  let response = channel.sendToQueue(
    queueName,
    Buffer.from(JSON.stringify(message)),
    {
      persistent: true,
    }
  );
  console.log(response);
};
