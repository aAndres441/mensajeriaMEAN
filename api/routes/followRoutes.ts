//const express = require('express');
import express from 'express';

const FollowController = require ('../controllers/followController');

const follow = express.Router();//pra obtener acceso a los metodos hhtp get post..

follow.get('/getFollows',FollowController.getFollows);
follow.get('/pruebas',FollowController.pruebasFollow);
follow.post('/post',FollowController.postFollow);

module.exports = follow;