import { Query, Resolver } from '@nestjs/graphql';
import { City } from '../models/city.entity';
import { CitiesService } from '../services/cities.service';

@Resolver(() => City)
export class CitiesResolver {
  constructor(private citiesService: CitiesService) {}

  @Query(() => [City])
  cities(): Promise<City[]> {
    return this.citiesService.fetchCities();
  }
}
