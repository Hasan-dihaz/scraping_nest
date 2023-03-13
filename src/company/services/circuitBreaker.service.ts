// company.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CircuitBreaker } from '../entities/circuitBreaker.entities';
import { CreateCircuitBreakerDto } from '../dto/circuitBreaker.dto';

@Injectable()
export class CircuitBreakerService {
  constructor(
    @InjectRepository(CircuitBreaker)
    private readonly circuitBreakerRepository: Repository<CircuitBreaker>,
  ) {}

  //!===============================================
  // CreatePeDto
  async upsertCircuitBreakerEntity(
    createCircuitBreakerDtos: CreateCircuitBreakerDto[],
  ): Promise<void> {
    const a = 0;
    for (const createCircuitBreakerDto of createCircuitBreakerDtos) {
      // a++;
      console.log('createPeDtos...', createCircuitBreakerDto);
      // if (a == 3) {
      //   break;
      // }
      // const {
      //   code,
      //   close_price,
      //   ycp,
      //   pe_1,
      //   pe_2,
      //   pe_3,
      //   pe_4,
      //   pe_5,
      //   pe_6,
      //   // date,
      // } = createCircuitBreakerDto;
      const circuitBreaker = new CircuitBreaker();
      // pe.code = code;
      // pe.close_price = close_price;
      // pe.ycp = ycp;
      // pe.pe_1 = pe_1;
      // pe.pe_2 = pe_2;
      // pe.pe_3 = pe_3;
      // pe.pe_4 = pe_4;
      // pe.pe_5 = pe_5;
      // pe.pe_6 = pe_6;
      const queryBuilder = this.circuitBreakerRepository
        .createQueryBuilder()
        .insert()
        .into(CircuitBreaker)
        .values(createCircuitBreakerDto)
        .orUpdate([
          'breaker',
          'tickSize',
          'openAdjPrice',
          'floorPrice',
          'lowerLimit',
          'upperLimit',
          'floorPriceBlockMakret',
        ]);
      await queryBuilder.execute();
      //   // const upsertedEntity = await this.peRepository.findOneOrFail({
      //   //   where: { code: code },
      //   // });
      // }
      // return upsertedEntity;
    }
  }
}
