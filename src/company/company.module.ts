import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from '../company/controllers/company.controller';
import { CompanyService } from '../company/services/company.service';
// import { CompanyRepository } from './user.repository';
import { Company } from './entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      //   password: 'password',
      database: 'Name_Nai',
      entities: [Company],
      // synchronize: true,
    }),
    // TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([Company]),
  ],
  controllers: [CompanyController],
  // controllers: [],
  providers: [CompanyService],
  // exports: [CompanyService],
})
export default class CompanyModule {}
