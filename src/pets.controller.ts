import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Pet } from './pet.dto';

@ApiTags('pets')
@Controller('pets')
export class PetsController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @ApiOperation({ summary: 'List all pets', operationId: 'getPets' })
    @ApiResponse({ status: 200, description: 'A paged array of pets', type: [Pet] })
    getPets(): Pet[] {
        return this.appService.getPets();
    }

    @Post()
    @ApiOperation({ summary: 'Create a pet', operationId: 'createPet' })
    @ApiResponse({ status: 201, description: 'Null response' })
    createPet(@Body() pet: Pet): void {
        this.appService.createPet(pet);
    }
}