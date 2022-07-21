const express = require('express');

const UserController = require ('../controllers/userController');

const user = express.Router();

user.get('/getUsers',UserController.getUsers);
user.get('/pruebas',UserController.pruebas);
user.post('/postprueba',UserController.postUsuPrueba);
user.post('/saveOne',UserController.saveOne);
user.get('/findOne',UserController.findByIdUsu);

module.exports = user;