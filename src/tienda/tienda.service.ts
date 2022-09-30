import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiendaEntity } from './tienda.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class TiendaService {

    constructor(
        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>
      ) {}

    async create(tiendaEntity: TiendaEntity): Promise<TiendaEntity> {
        if (tiendaEntity.telefono.length !== 10 )
          throw new BusinessLogicException("El telefono solo debe tener 10 caracteres", BusinessError.PRECONDITION_FAILED)
        return await this.tiendaRepository.save(tiendaEntity);
    }




}
