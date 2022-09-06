/**
 * exporta las rutas
 */

const express = require('express');

const UserController = require ('../controllers/userController');

const routerUsu = express.Router();
//o pude ser como abajo
const {Router} = require ("express");

const authh = require('../middlewre/auth');

//router.get('/getUsers',authh.isAuth,UserController.getUsers);
routerUsu
    
    .get('/pruebas',authh.isAuth,UserController.pruebas)
    .post('/postprueba',UserController.postUsuPrueba)
    .post('/saveOne',UserController.saveOne)
    
    .post('/login', UserController.loginUser)
    .get('/getUsers',authh.isAuth,UserController.getUsers)
    //?puede ser opcional
    .get('/findById/:codigoId?',authh.isAuth,UserController.findById)
    .get('/findOne',authh.isAuth,UserController.findOne)

    .get('/findOtro/:unName',authh.isAuth,UserController.findOtro)
    
    .post('/findOne',UserController.findOne)
    .get('/speak', UserController.speak)
    .patch('/:identificador',UserController.patchOne)
    .delete('/:identificador',UserController.deleteOne)

module.exports = routerUsu;