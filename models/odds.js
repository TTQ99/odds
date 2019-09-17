const { sequelize } = require('./db')
const Sequelize = require('sequelize')

const Model = Sequelize.Model
class User extends Model {}
User.init(
  {
    // 属性
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
      // allowNull 默认为 true
    }
  },
  {
    sequelize,
    modelName: 'user'
    // 参数
  }
)
User.sync({ force: true }).then(() => {
  // 现在数据库中的 `users` 表对应于模型定义
  return User.create({
    firstName: 'Jo1hn',
    lastName: 'Han1cock'
  })
})
