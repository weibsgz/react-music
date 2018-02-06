const express = require('express')
const userRouter = require('./user')

// 新建app
const app = express()

// socket.io 与 express 相配合
// express转发接口 换成自己服务器下的域名  
//需要在package.json里配置 "proxy": "http://localhost:9099"
app.use('/music', userRouter)

app.get('/', function (req, res) {
  res.send('<h1>Hello World</h1>')
})

app.listen(9099, function () {
  console.log('Node app start at port 9099')
})
