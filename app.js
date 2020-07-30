const express =require('express')
const app=express()
app.listen(4000)
//post请求的解析方式
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))//设置根目录
const {message}=require('./router')//引入路由文件
app.set('view engine','ejs')
//处理/请求
app.get('/',function(req,res){
  res.redirect('/message?page=1')
})
//处理/message开头的请求地址
app.use('/message',message)