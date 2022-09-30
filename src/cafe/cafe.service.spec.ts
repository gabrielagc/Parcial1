import { Test, TestingModule } from '@nestjs/testing';
import { CafeEntity } from './cafe.entity';
import { CafeService } from './cafe.service';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { TiendaEntity } from 'src/tienda/tienda.entity';

describe('CafeService', () => {
  let service: CafeService;
  let repository: Repository<CafeEntity>;
  let cafeList: CafeEntity[];
  let tiendasList: TiendaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CafeService],
      imports: [...TypeOrmTestingConfig()],
    }).compile();

    service = module.get<CafeService>(CafeService);

    repository = module.get<Repository<CafeEntity>>(
      getRepositoryToken(CafeEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    cafeList = [];
    for (let i = 0; i < 5; i++) {
      const cafe: CafeEntity = await repository.save({
        nombre: faker.name.fullName(),
        descripcion: faker.lorem.sentence(),
        precio : faker.datatype.number()
      });
      cafeList.push(cafe);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create debe crear un cafe', async () => {
    const cafe: CafeEntity = {
      id: '',
      nombre: faker.name.fullName(),
      descripcion: faker.lorem.sentence(),
      precio : faker.datatype.number(),
      tiendas: tiendasList,
    };

    const newcafe: CafeEntity = await service.create(cafe);
    expect(cafe).not.toBeNull();

    const storedCafe: CafeEntity = await repository.findOne({
      where: { id: cafe.id },
    });
    expect(storedCafe).not.toBeNull();
    expect(storedCafe.nombre).toEqual(newcafe.nombre);
    expect(storedCafe.descripcion).toEqual(newcafe.descripcion);
    expect(storedCafe.precio).toEqual(newcafe.precio);
    expect(storedCafe.tiendas).toEqual(newcafe.tiendas);
  });

  it('create debe lanzar una excepción por un cafe inválido', async () => {
    const cafe: CafeEntity = {
      id: '',
      nombre: faker.name.fullName(),
      descripcion: faker.lorem.sentence(),
      precio : faker.datatype.number(),
      tiendas: tiendasList,      
    };

    await expect(() => service.create(cafe)).rejects.toHaveProperty(
      'message',
      'El precio del cafe debe ser un valor positivo ',
    );
  });


});
