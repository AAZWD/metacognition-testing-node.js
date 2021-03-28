const mongoose = require('mongoose');

const pSchema = new mongoose.Schema({
  name: String
});
module.exports = mongoose.model('pSchemaModal', pSchema);