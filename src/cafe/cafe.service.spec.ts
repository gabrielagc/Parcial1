import { Test, TestingModule } from '@nestjs/testing';
import { CafeEntity } from './cafe.entity';
import { CafeService } from './cafe.service';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('CafeService', () => {
  let service: CafeService;
  let repository: Repository<CafeEntity>;
  let cafeList: CafeEntity[];

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
});
