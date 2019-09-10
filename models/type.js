const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'odds', // 数据库名称
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

const Model = Sequelize.Model
class MatchType extends Model {}
MatchType.init(
  {
    // 属性
    typeId: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    class1: {
      type: Sequelize.STRING
      // allowNull 默认为 true
    },
    class2: {
      type: Sequelize.STRING
      // allowNull 默认为 true
    }
  },
  {
    sequelize,
    modelName: 'matchType'
    // 参数
  }
)


const { arr, arr2 } = require('../match/class')
console.log(arr2.length)
