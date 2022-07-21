const mongoose = require('mongoose');
const FollowSchema = require('../schemas/followSchema');


export const FollowModel = new mongoose.model('follows',FollowSchema);


 //export default FollowModel;
 //module.exports = {FollowModel};