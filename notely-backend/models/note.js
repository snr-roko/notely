const mongoose  = require("mongoose")

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  }
)

// noteSchema.pre('save', (next) => {
//   this.updatedAt = Date.now()
//   next()
// })

// noteSchema.pre('findOneAndUpdate', (next) => {
//   this.set({updatedAt: Date.now()})
//   next()
// })

noteSchema.set('toJSON', {
  transform: (document, returnedObject) =>{
    returnedObject.id = returnedObject._id.toString(),
    delete returnedObject._id,
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)