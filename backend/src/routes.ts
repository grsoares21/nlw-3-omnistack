import { Router } from 'express';
import multer from 'multer';
import OrphanageService from './services/OrphanageService';
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orphanages', upload.array('images'), async (req, res) => {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends
  } = req.body;

  const orphanageService = new OrphanageService();

  const createdOrphanage = await orphanageService.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends
  });
  
  return res.status(201).json(createdOrphanage);
});

routes.get('/orphanages', async (req, res) => {
  const orphanageService = new OrphanageService();  
  return res.status(201).json(await orphanageService.getAll());
});

routes.get('/orphanages/:id', async (req, res) => {
  const orphanageService = new OrphanageService();  
  const { id } = req.params;
  return res.status(201).json(await orphanageService.getById(id));
});

export default routes;