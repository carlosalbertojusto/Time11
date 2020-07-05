import { Request, Response } from 'express'
import knex from '../database/connection'

class HubsController{
  async index(request: Request, response: Response) {
    const { city, uf} = request.query

    const hubs = await knex('hub')
      .from('hub')  
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('hub.*')
    const serializedHubs = hubs.map(hub => {
      return {
        ...hub,
       }
    })

    return response.json(serializedHubs)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params

    const hub = await knex('hub').where('id', id).first()

    if (!hub) {
      return response.status(400).json({ message: 'Hub not Found' })
    }

    const serializedHubs = {
      ...hub,
    }
    
    return response.json({ point: serializedHubs })
  }

  async create(request: Request, response: Response) {
    const {
      zipcode,
      district,
      street,
      latitude,
      longitude,
      city,
      uf,
      numberHouse,
      nameHub
    } = request.body

    const trx = await knex.transaction()

    const hub = {
      //image: request.file.filename,
      zipcode,
      district,
      street,
      numberHouse,
      latitude,
      longitude,
      city,
      uf,
      nameHub
    }
    const insertedIds = await trx('hub').insert(hub)

    const hub_id = insertedIds[0]
    await trx.commit()
    response.json({
      id: hub_id,
      ...hub
    })

  }
}

export default HubsController