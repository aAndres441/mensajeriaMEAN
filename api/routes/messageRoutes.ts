//const express = require('express');
//export const app = express(); 
import express from 'express';

const MessageController = require ('../controllers/messageController');

const message = express.Router();

message.get('/getMessages',MessageController.getMessage);
message.get('/pruebas',MessageController.pruebasMessage);

module.exports = message;