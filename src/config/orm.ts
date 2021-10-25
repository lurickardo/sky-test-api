import mongoose from 'mongoose';

class Connection {
  public mongodbConnection() {
    return mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/skytest');
  }
}

export default new Connection();
