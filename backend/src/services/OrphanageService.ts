import { getRepository, Repository } from "typeorm";
import Orphanage from "../models/Orphanage";

export default class OrphanageService {
  private orphanageRepository: Repository<Orphanage>
  constructor () {
    this.orphanageRepository = getRepository(Orphanage);
  }

  async create(orphanage: Orphanage) {
    this.orphanageRepository.create(orphanage);
    await this.orphanageRepository.save(orphanage);
    return orphanage;
  }

  async getAll() {
    return await this.orphanageRepository.find();    
  }

  async getById(id: string) {
    return await this.orphanageRepository.findOneOrFail(id);    
  }
}