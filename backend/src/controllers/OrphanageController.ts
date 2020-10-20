import { Request, Response } from 'express';
import { IOrphanageService } from '../services/OrphanageService';
import OrphanageView from '../mappers/OrphanageMapper';

export default class OrphanageController {
  private orphanageService: IOrphanageService;
  constructor(orphanageService: IOrphanageService) {
    this.orphanageService = orphanageService;
  }

  public async CreateOrphanage(req: Request, res: Response): Promise<void> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = req.body;
  
    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename }
    })
  
    const orphanageToCreate = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    };
  
  
    const createdOrphanage = await this.orphanageService.create(orphanageToCreate); 
  
    res.status(201).json(createdOrphanage);
  }


  public async GetOrphanage(req: Request, res: Response): Promise<void> 
  {
      res.json(OrphanageView.renderMany(await this.orphanageService.getAll()));    
  }

  public async GetOrphanageById(req: Request, res: Response): Promise<void> 
  {
    const { id } = req.params;
    res.json(OrphanageView.render(await this.orphanageService.getById(id)));
  }
}