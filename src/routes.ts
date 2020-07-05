import express, { request, response } from 'express'


import { celebrate, Joi } from 'celebrate'

import HubsController from './controllers/HubsController'

import multer from 'multer'


const routes = express.Router()


const hubsController = new HubsController()

routes.post('/hubs',

  celebrate({
    body: Joi.object().keys({
      zipcode: Joi.string().required(),
      numberHouse: Joi.number().required(),
      street: Joi.string().required(),
      district: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      nameHub: Joi.string().required(),
      uf: Joi.string().required().max(2),

    }),
   }, {
     abortEarly: false
   }),
  hubsController.create)

 routes.get('/hubs/', hubsController.index)
 routes.get('/hubs/:id', hubsController.show)


export default routes