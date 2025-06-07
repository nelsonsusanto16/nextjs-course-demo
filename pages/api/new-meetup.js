import { MongoClient } from "mongodb";

async function handler(req, res) {
 if (req.method === 'POST') {
  const data = req.body;

  const client = await MongoClient.connect('mongodb+srv://nelsonsusanto16:u8D7kdUf0jYcotUF@cluster0.aqc5bgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const result = await meetupsCollection.insertOne(data);

  console.log(result);

  client.close();

  res.status(201).json({message: 'Meetup inserted'});
 }
}

export default handler;