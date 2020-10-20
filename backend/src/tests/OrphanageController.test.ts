import { It, Mock, Times } from "moq.ts";
import OrphanageController from "../controllers/OrphanageController";
import Orphanage from "../models/Orphanage";
import { IOrphanageService } from "../services/OrphanageService";

let orphanageServiceMock: Mock<IOrphanageService>;
let orphanageController: OrphanageController;
let returnedOrphanage: Orphanage;

describe('orphanage controller', () => {
  beforeAll(() => {
    orphanageServiceMock = new Mock<IOrphanageService>();

    returnedOrphanage = {
      about: "lalala",
      images: [],
      instructions: "",
      latitude: 30,
      longitude: 20,
      name: "",
      open_on_weekends: true,
      opening_hours: ""
    }
  
    orphanageServiceMock
      .setup(service => service.getById(It.IsAny()))
      .returns(Promise.resolve(returnedOrphanage))

      orphanageServiceMock
      .setup(service => service.getAll())
      .returns(Promise.resolve([returnedOrphanage]))

      orphanageServiceMock
        .setup(service => service.create(It.IsAny()))
        .returns(Promise.resolve(returnedOrphanage))

    orphanageController = new OrphanageController(orphanageServiceMock.object());
  })

  test('should recover orphanage by id from service and send it to the response', async () => {
    const req: any = { params: { id: '5' } };
    const res: any = {
      json: jest.fn((result) => {
        expect(result).toEqual(returnedOrphanage)
      })
    };
    await orphanageController.GetOrphanageById(req, res);
  
    orphanageServiceMock.verify(service => service.getById('5'), Times.Once());
  });


  test('should recover all orphanages from service and send it to the response', async () => {
    const req: any = {  };
    const res: any = {
      json: jest.fn((result) => {
        expect(result).toEqual([ returnedOrphanage ])
      })
    };
    await orphanageController.GetOrphanage(req, res);
  
    orphanageServiceMock.verify(service => service.getAll(), Times.Once());
  });


  test('should insert orphanage', async () => {
    const req: any = { 
      files: [],
      body: {
        about: "lalala",
        images: [],        
        instructions: "",
        latitude: 30,
        longitude: 20,
        name: "",
        open_on_weekends: 'true',
        opening_hours: ""
      }
     };

    const res: any = {
      json: jest.fn((result) => {
        expect(result).toEqual(returnedOrphanage)
      })
    };

    res.status = jest.fn((status) => {
      expect(status).toBe(201);
      return res;
    });

    await orphanageController.CreateOrphanage(req, res);
    orphanageServiceMock.verify(service => service.create(It.IsAny()), Times.Once());
  });
});