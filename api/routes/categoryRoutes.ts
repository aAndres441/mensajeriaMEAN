//const express = require('express');


import express from 'express';

const CategoryController = require ('../controllers/categoryController');

const category = express.Router();

category.get('/getCategories',CategoryController.getCategories);
category.get('/pruebas',CategoryController.pruebasCategory);

module.exports = category;