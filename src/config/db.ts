import mongoose from 'mongoose';

export default function initDatabase(): void {
  mongoose.connect('mongodb://localhost:27017/next_video', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const { connection } = mongoose;

  connection.on('error', (error) => {
    console.log(error);
  });

  connection.once('open', function () {
    console.log('connected');
  });
}
