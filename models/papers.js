var mongoose = require('mongoose'),
    Schema = mongoose.Schema
        paperSchema = new Schema({
          name: String,
          url: String
      }),
    Papers = mongoose.model('paper', paperSchema);

module.exports = Papers;