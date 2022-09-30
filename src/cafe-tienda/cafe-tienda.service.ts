import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiendaEntity } from '../tienda/tienda.entity';
import { Repository } from 'typeorm';
import { CafeEntity } from '../cafe/cafe.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class CafeTiendaService {
    constructor(
        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>,
    
        @InjectRepository(CafeEntity)
        private readonly cafeRepository: Repository<CafeEntity>
    ) {}
    addAeropuertoToAerolinea
    async addCafeToTienda(tiendaId: string, cafeId: string): Promise<TiendaEntity> {
        const cafe: CafeEntity = await this.cafeRepository.findOne({where: {id: cafeId}});
        if (!cafe)
          throw new BusinessLogicException("No se encontró el cafe con el id dado", BusinessError.NOT_FOUND);
      
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where: {id: tiendaId}, relations: ["cafes"]})
        if (!tienda)
          throw new BusinessLogicException("No se encontró la tienda con el id dado", BusinessError.NOT_FOUND);
    
        tienda.cafes= [...tienda.cafes, cafe];
        return await this.tiendaRepository.save(tienda);
      }




}
