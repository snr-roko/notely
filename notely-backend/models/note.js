const mongoose  = require("mongoose")

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

noteSchema.pre('save', (next) => {
  this.updatedAt = Date.now()
  next()
})

noteSchema.pre('findOneAndUpdate', (next) => {
  this.set({updatedAt: Date.now()})
  next()
})

module.export = mongoose.model('Note', noteSchema)