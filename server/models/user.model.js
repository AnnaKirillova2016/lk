const mysql = require('mysql')
const dbConf = require('../config/db.config')

const db = mysql.createConnection({
  host: dbConf.HOST,
  user: dbConf.USER,
  password: dbConf.PASSWORD,
  database: dbConf.DB
})

db.connect(error => {
  if (error) throw error
  console.log('Successfully connected to the database.')
})

const user = function (user) {
  this.id = user.id
  this.login = user.login
  this.password = user.password
  this.isActive = user.isActive
  this.firstName = user.firstName
  this.lastName = user.lastName
  this.email = user.email
  this.avatar = user.avatar
  this.other = user.other
  this.regDate = user.regDate
}

user.Create = (newUser, result) => {
  db.query('INSERT INTO User SET ?', newUser, (err, res) => {
    if (err) {
      console.log('ошибка: ', err)
      result(err, null)
      return
    }
    //console.log('Пользователь добавлен', {id: res.insertId, ...newUser})
    return { id: res.insertId, ...newUser }
    result(null, { id: res.insertId, ...newUser })
  })
}

user.getAllUsers = result => {
  db.query('SELECT * FROM User' , function(err, res){
    if (err) {
      console.log('ошибка: ', err)
      result({"err":err})
      return
    }
    //console.log('пользователь: ', res[0])
    result({"result":res})
  })

}

user.findByEmail = (email,result) => {
 db.query('SELECT * FROM User WHERE email = ' + db.escape(email) ,(err, res) => {
    if(err){
      console.log('ошибка: ', err)
      result(err)
      return
    }
    console.log('найден пользователь: ', res[0])
    //result(null, res[0])
   if (res.length > 0 && res[0].isActive == 1) {
     result(JSON.parse(JSON.stringify(res[0])))
   }else {
     result({err:'user not found'})
   }
  })

}

user.findById = (userId, result) => {
  db.query(`SELECT * FROM User WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log('ошибка: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log('найден пользователь: ', res[0])
      result(null, res[0])
      return
    }
    result({ kind: 'не найдено' }, null)
  })
}

user.updateById = (id, user, result) => {
  const queryUpdate = 'UPDATE User SET login = ?, password = ?, isActive = ?, firstName = ?, lastName = ?  WHERE id = ?'
  db.query(
    queryUpdate,
    [user.login, user.password, user.isActive, user.firstName, user.lastName, id, user.email,user.avatar,user.other],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows === 0) {
        result({ kind: 'не найдено' }, null)
        return
      }

      console.log('Пользоватеь обновлен ', { id: id, ...user })
      result(null, { id: id, ...user })
    }
  )
}

user.remove = (id, result) => {
  const queryDelete = 'DELETE FROM User WHERE id = ?'
  db.query(queryDelete, id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }
    if (res.affectedRows === 0) {
      result({ kind: 'не найдено' }, null)
      return
    }

    console.log('Удален пользователь с  ', id)
    result(null, res)
  })
}

user.removeAll = result => {
  db.query('DELETE FROM User', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} users`)
    result(null, res)
  })
}
module.exports = user
