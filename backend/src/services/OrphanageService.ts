import { getRepository, Repository } from "typeorm";
import Orphanage from "../models/Orphanage";
import * as Yup from 'yup';

import { IDbConnectionProvider } from "../database/DbConnectionProvider";

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
});

export interface IOrphanageService {
  create: (orphanage: Orphanage) => Promise<Orphanage>
  getAll: () => Promise<Orphanage[]>
  getById: (id: string) => Promise<Orphanage>
}
export default class OrphanageService implements IOrphanageService {
  private orphanageRepository: Promise<Repository<Orphanage>>

  constructor(dbConnectionProvider: IDbConnectionProvider) {
    this.orphanageRepository = dbConnectionProvider.GetConnection().then(() => getRepository(Orphanage));
  }

  public async create(orphanage: Orphanage) {
    await schema.validate(orphanage, {
      abortEarly: false
    })

    const repository = await this.orphanageRepository;
    repository.create(orphanage);
    await repository.save(orphanage);
    return orphanage;
  }

  public async getAll() {
    const repository = await this.orphanageRepository;
    return await repository.find({
      relations: ['images']
    });
  }

  public async getById(id: string) {
    const repository = await this.orphanageRepository;
    return await repository.findOneOrFail(id, {
      relations: ['images']
    });
  }
}