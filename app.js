console.log(123)
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'test', // 数据库名称
  'root', // 用户名
  '123456', // 密码
  {
    host: 'localhost',
    dialect: 'mysql', // 'mysql'|'sqlite'|'postgres'|'mssql'
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
  