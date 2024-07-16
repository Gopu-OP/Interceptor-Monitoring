const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('interceptorlocations', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
