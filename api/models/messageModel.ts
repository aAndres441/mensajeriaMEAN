const mongoose = require('mongoose');
const MessageSchema = require('../schemas/messageSchema');


export const MessageModel = new mongoose.model('messages',MessageSchema);


 //export default MessageModel;
 //module.exports = {MessageModel};