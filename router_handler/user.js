const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.reguser = (req, res) => {
  //获取用户信息
  const userInfo = req.body
  if (!userInfo.username || !userInfo.password) {
    res.send({ status: 1, message: '用户名或密码不能为空' })
  }
  const sql = 'select * from ev_users where username=?'
  db.query(sql, userInfo.username, (err, result) => {
    //执行sql失败
    if (err) {
      return res.send({ status: 1, message: err.message })
    }
    //查询语句，result为数组
    if (result.length > 0) {
      return res.send({ status: 1, message: "用户名被占用" })
    }
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)
    db.query('insert into ev_users set ?', { username: userInfo.username, password: userInfo.password }, (err, result) => {
      if (err) return res.send({ status: 1, message: err.message })
      if (result.affectedRows !== 1) return res({ status: 1, message: "注册失败" })
      res.send({ status: 0, message: "注册成功" })
    })
  })

}
exports.login = (req, res) => {
  res.send('login ok')
}