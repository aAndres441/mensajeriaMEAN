//import PublicacionSchema from '../schemas/publicacionSchema';
//import mongoose from 'mongoose';
const mongoose = require('mongoose');
const PublicacionSchema = require('../schemas/publicacionSchema');

export const  Public = new mongoose.model('publica',PublicacionSchema);
