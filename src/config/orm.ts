import mongoose from 'mongoose';

class Connection {
  public mongodbConnection() {
    return mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/skytest');
  }
}

export default new Connection();
