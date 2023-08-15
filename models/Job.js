 const Sequelize = require('sequelize')
 const db = require('../db/connection')


 const Job = db.define('job',{
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.NUMBER
    },
    company: {
        type: Sequelize.STRING,
    },
    new_job: {
        type: Sequelize.INTEGER,
    },
    email: {
        type: Sequelize.STRING,
    },
 })

 module.exports = Job
