const db=require('./index');
// console.log(db)
const Message=db.Message
//增
/* var data={
  username:"张三",
  message:"我叫张三",
  date:"2020-01-01 12-12-12"
}
db.add(Message,data,function(err){
  console.log(err)
}) */
//改
/* var filter={username:"张三"}
var date={message:"哈哈哈 啊哈啊哈 哈啊哈"}
db.modify(Message,filter,date,function(err,res){
  console.log(err)
  console.log(res)
}) */
//查
//两个参数
// db.find("model","function")
//三个参数 两种情况
// db.find('model',{name:'a'},"function")
// db.find('model',{page:2},"function")
//四个参数 
// db.find('model',{name:"a"},{size:6},'function')

//删除
db.del(Message,'5f2135f3b568482f54d74770',function(err,res){
  console.log(err)
  console.log(res)
})