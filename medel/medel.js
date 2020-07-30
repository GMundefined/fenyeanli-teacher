//创建message对应的Model对象
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const msgSchema=new Schema({
  username:String,
  message:String,
  date:String
},{
  collection:"message",//指定集合名称 就不会自动添加复数形式
})


//创建Model并暴露
module.exports={
  Message:mongoose.model('msg',msgSchema)
}