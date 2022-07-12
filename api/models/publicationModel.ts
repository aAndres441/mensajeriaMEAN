//import PublicacionSchema from '../schemas/publicacionSchema';
//import mongoose from 'mongoose';
const mongoose = require('mongoose');
const PublicationSchema = require('../schemas/publicationSchema');

export const  PublicacionModel = new mongoose.model('posts',PublicationSchema);
