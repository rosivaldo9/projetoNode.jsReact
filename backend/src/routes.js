const express= require('express');



const OngController = require('./Controller/OngController')
const IncidenteController = require('./Controller/IncidenteController')
const ProfileController = require('./Controller/ProfileController')
const SessionController = require('./Controller/SessionController')

const connection = require('./database/connection');

const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
routes.post('/incidents', IncidenteController.create);
routes.get('/incidents', IncidenteController.index);
routes.delete('/incidents/:id', IncidenteController.delete);
routes.get('/profile', ProfileController.index);
routes.post('/session', SessionController.create);



module.exports = routes;