const Sequelize = require('sequelize')

const sequelize = new Sequelize('odds', 'root', '123456', {
  dialect: 'mysql',
  host: 'localhost',
  dialect: 'mysql', // 'mysql'|'sqlite'|'postgres'|'mssql'
  operatorsAliases: false
})

// 创建模型
sequelize.sync({
  force: true
})

module.exports = { 
  sequelize
}

// 数据迁移 SQL 更新
