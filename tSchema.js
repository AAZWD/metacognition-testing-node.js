const mongoose = require('mongoose');

const tSchema = new mongoose.Schema({
  name: String
});
module.exports = mongoose.model('tSchemaModal', tSchema);