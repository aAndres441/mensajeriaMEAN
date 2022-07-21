//const express = require('express');

import express from 'express';
 
const PubController = require ('../controllers/publicationController');

const publication = express.Router();

publication.get('/get',PubController.getPublications);
publication.get('/pruebas',PubController.pruebasP);

module.exports = publication;