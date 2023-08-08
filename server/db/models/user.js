
let mongoose=require('mongoose');

let userSchema=mongoose.Schema({
  userName:String,
  email:String,
  password:String,
  tasks:[
    {
      type:mongoose.SchemaTypes.ObjectId,
      ref:'tasks'
    }
  ]
})


let User= mongoose.model("user",userSchema);
module.exports=User;
