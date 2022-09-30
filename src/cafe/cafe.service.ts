import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CafeEntity } from './cafe.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class CafeService {
    constructor(
        @InjectRepository(CafeEntity)
        private readonly cafeRepository: Repository<CafeEntity>
      ) {}

    async create(cafeEntity: CafeEntity): Promise<CafeEntity> {
        if (cafeEntity.precio >0 )
          throw new BusinessLogicException("El precio del cafe debe ser un valor positivo", BusinessError.PRECONDITION_FAILED)
        return await this.cafeRepository.save(cafeEntity);
      }





}
