import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../models/city.entity';

type CityResponse = {
  id: number;
  nome: string;
};

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private citiesRepository: Repository<City>,
  ) {}

  async fetchCities() {
    const res = await fetch(
      'http://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios',
    );

    const cities: CityResponse[] = await res.json();

    for await (const city of cities) {
      const { id, nome } = city;
      const createdCity = this.citiesRepository.create({ id, name: nome });
      await this.citiesRepository.save(createdCity);
    }

    return await this.citiesRepository.find();
  }
}
