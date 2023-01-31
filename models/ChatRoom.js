const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema({
  textChatRoom: {
    type: [String],
  },
  chatRoomUserTwo: {
    type: String,
    required: true,
    // unique: true,
  },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
}, {timestamps: true})

const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema)

module.exports = ChatRoom