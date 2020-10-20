import { Router } from 'express';
import multer from 'multer';
import OrphanageService from './services/OrphanageService';
import uploadConfig from './config/upload';
import orphanageView from './views/orphanages_view';

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


  const createdOrphanage = await orphanageService.create(orphanageToCreate);



  return res.status(201).json(createdOrphanage);
});

routes.get('/orphanages', async (req, res) => {
  const orphanageService = new OrphanageService();
  return res.json(orphanageView.renderMany(await orphanageService.getAll()));
});

routes.get('/orphanages/:id', async (req, res) => {
  const orphanageService = new OrphanageService();
  const { id } = req.params;
  return res.json(orphanageView.render(await orphanageService.getById(id)));
});

export default routes;