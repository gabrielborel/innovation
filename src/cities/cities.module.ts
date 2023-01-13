import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CitiesResolver } from './resolvers/cities.resolver';
import { CitiesService } from './services/cities.service';
import { City } from './models/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [],
  providers: [CitiesService, CitiesResolver],
})
export class CitiesModule {}
