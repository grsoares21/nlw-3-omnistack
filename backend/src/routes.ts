import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import OrphanageController from './controllers/OrphanageController';
import DbConnectionProvider from './database/DbConnectionProvider';
import OrphanageService from './services/OrphanageService';

const routes = Router();
const upload = multer(uploadConfig);

const dbConnectionProvider = new DbConnectionProvider();
const orphanageService = new OrphanageService(dbConnectionProvider);
const orphanageController = new OrphanageController(orphanageService);

routes.post('/orphanages', upload.array('images'), (req, res) =>orphanageController.CreateOrphanage(req, res));
routes.get('/orphanages', (req, res) => orphanageController.GetOrphanage(req, res));
routes.get('/orphanages/:id', (req, res) => orphanageController.GetOrphanageById(req, res));

export default routes;