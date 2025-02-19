const express = require("express")
const app = express()
//跨域
const cors = require('cors')
app.use(cors())//全局中间件

app.use(express.urlencoded({ extended: false }))//配置解析表单格式的中间件

const userRouter = require('./router/user')
app.use('/api', userRouter)

app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})