import { Injectable, NotFoundException } from '@nestjs/common';
import { Pet } from './pet.dto';
import { Owner } from './owner.dto';
import { AdoptPetDto } from './adopt.dto';

@Injectable()
export class AppService {
  // In-memory data mimicking your stateful MSW mocks
  private pets: Pet[] = [];
  private owners: Owner[] = [];

  getPets(): Pet[] {
    return this.pets;
  }

  createPet(pet: Pet): void {
    this.pets.push(pet);
  }

  getOwners(): Owner[] {
    return this.owners;
  }

  createOwner(owner: Owner): void {
    this.owners.push(owner);
  }

  adoptPet(adoptDto: AdoptPetDto): void {
    const owner = this.owners.find(o => o.id === adoptDto.ownerId);
    const pet = this.pets.find(p => p.id === adoptDto.petId);

    if (!owner || !pet) {
      throw new NotFoundException('Owner or Pet not found');
    }

    owner.petId = pet.id;
  }
}