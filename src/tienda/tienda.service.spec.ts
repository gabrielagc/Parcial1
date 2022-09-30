import { Test, TestingModule } from '@nestjs/testing';
import { TiendaService } from './tienda.service';
import { Repository } from 'typeorm';
import { TiendaEntity } from './tienda.entity';
import { CafeEntity } from 'src/cafe/cafe.entity';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('TiendaService', () => {
  let service: TiendaService;
  let repository: Repository<TiendaEntity>;
  let tiendaList: TiendaEntity[];
  let cafeList: CafeEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiendaService],
      imports: [...TypeOrmTestingConfig()],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
    repository = module.get<Repository<TiendaEntity>>(
      getRepositoryToken(TiendaEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    tiendaList = [];
    for (let i = 0; i < 5; i++) {
      const tienda: TiendaEntity = await repository.save({
        nombre: faker.name.fullName(),
        direccion: faker.lorem.sentence(),
        telefono: faker.lorem.sentence()
      });
      tiendaList.push(tienda);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create debe crear una tienda', async () => {
    const tienda: TiendaEntity = {
      id: '',
      nombre: faker.name.fullName(),
      direccion: faker.lorem.sentence(),
      telefono: faker.lorem.sentence(),
      cafes: cafeList
    };

    const newtienda: TiendaEntity = await service.create(tienda);
    expect(tienda).not.toBeNull();

    const storedTienda: TiendaEntity = await repository.findOne({
      where: { id: tienda.id },
    });
    expect(storedTienda).not.toBeNull();
    expect(storedTienda.nombre).toEqual(newtienda.nombre);
    expect(storedTienda.direccion).toEqual(newtienda.direccion);
    expect(storedTienda.telefono).toEqual(newtienda.telefono);
    expect(storedTienda.cafes).toEqual(newtienda.cafes);
  });
});
