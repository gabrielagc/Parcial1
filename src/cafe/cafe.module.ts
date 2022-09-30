import { Module } from '@nestjs/common';
import { CafeService } from './cafe.service';

@Module({
  providers: [CafeService]
})
export class CafeModule {}
