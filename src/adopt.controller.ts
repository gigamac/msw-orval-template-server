import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AdoptPetDto } from './adopt.dto';

@ApiTags('adopt')
@Controller('adopt')
export class AdoptController {
    constructor(private readonly appService: AppService) { }

    @Post()
    @ApiOperation({ summary: 'Associate a pet with an owner', operationId: 'adoptPet' })
    @ApiResponse({ status: 200, description: 'Successfully adopted' })
    @ApiResponse({ status: 404, description: 'Owner or Pet not found' })
    adoptPet(@Body() adoptDto: AdoptPetDto): void {
        this.appService.adoptPet(adoptDto);
    }
}