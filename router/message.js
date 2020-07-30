//处理留言的路由
const express=require('express')
const Route=express.Router()
const db=require('../medel')
const Message=db.Message;
const sd=require('silly-datetime')
// /message请求
Route.get('/',function(req,res){
  // 获取页码
  var page = parseInt(req.query.page);
  if(page<1){
    page=1
  }
  //获取数据的总条数
  db.total(Message,function(err,count){
    if(err){
      console.log(err)
      res.render('error',{errMsg:"服务器故障"})
      return ;
    }
    //总页数
    var allPages=Math.ceil(count/5);
    if(page>allPages){//当前页超过总页数 调整为最后一页
      page=allPages;
    }
    var opt={page:page,size:5}
    //查询数据库中的数据 传递给index页面解析
    db.find(Message,opt,function(err,docs){
      if(err){
        console.log(err)
        res.render('error',{errMsg:"网络错误 稍后重试"})
        return ;
      }
      //取到数据 传递给页面
      res.render('index',{msg:docs,pages:allPages,current:page})
    })
  })
})
// /message/tijiao post方式
Route.post('/tijiao',function(req,res){
  var query=req.body;
  var username=query.username
  var message=query.message
  var date=sd.format(new Date(),'YYYY-MM-DD HH:mm:ss')
  var data={
    username:username,
    message:message,
    date:date
  }
  db.add(Message,data,function(err){
    if(err){
      console.log(err);
      res.render('error',{errMsg:"提交留言失败"})
      return ;
    }
    //提交成功
    res.redirect('/')
    
  })

})
// /message/del删除留言 ajax发送的get请求
Route.get('/del',function(req,res){
  var id=req.query.id;
  db.del(Message,id,function(err,result){
    if(err){
      console.log(err)
      res.send({status:1,msg:"网络波动"})
      return ;
    }
    // console.log(result)
    if(result.deletedCount==0){
      res.send({status:1,msg:"删除失败"})
    }else{
      res.send({status:0,msg:"删除成功"})
    }
  })
})
// /message/modify 修改留言 ajax发送的post请求
Route.post('/modify',function(req,res){
  var id=req.body.id;
  var nesMsg=req.body.message
  var data={message:nesMsg}
  db.modify(Message,id,data,function(err,result){
    if(err){
      console.log(err)
      res.send({status:1,msg:"网络波动"})
      return ;
    }
    if(result.nModified==0){
      res.send({status:1,msg:"数据修改失败"})
    }else{
      res.send({status:0,msg:"数据修改成功"})
    }
  })
})



module.exports=Route