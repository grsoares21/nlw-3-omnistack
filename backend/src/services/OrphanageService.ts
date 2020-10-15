import { getRepository, Repository } from "typeorm";
import Orphanage from "../models/Orphanage";
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  about: Yup.string().required().max(300),
  instructions: Yup.string().required(),
  opening_hours: Yup.string().required(),
  open_on_weekends: Yup.boolean().required(),
  images: Yup.array(Yup.object().shape({
    path: Yup.string().required()
  }))
})

export default class OrphanageService {
  private orphanageRepository: Repository<Orphanage>
  constructor () {
    this.orphanageRepository = getRepository(Orphanage);
  }

  async create(orphanage: Orphanage) {
    await schema.validate(orphanage, {
      abortEarly: false
    })

    this.orphanageRepository.create(orphanage);
    await this.orphanageRepository.save(orphanage);
    return orphanage;
  }

  async getAll() {
    return await this.orphanageRepository.find({
      relations: ['images']
    });
  }

  async getById(id: string) {
    return await this.orphanageRepository.findOneOrFail(id, {
      relations: ['images']
    });    
  }
}