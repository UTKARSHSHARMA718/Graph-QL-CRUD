import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ClientSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export default model("Client", ClientSchema);
