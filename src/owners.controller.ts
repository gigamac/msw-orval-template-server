import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Owner } from './owner.dto';

@ApiTags('owners')
@Controller('owners')
export class OwnersController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @ApiOperation({ summary: 'List all pet owners', operationId: 'getOwners' })
    @ApiResponse({ status: 200, description: 'A list of owners', type: [Owner] })
    getOwners(): Owner[] {
        return this.appService.getOwners();
    }

    @Post()
    @ApiOperation({ summary: 'Create an owner and optionally link to a pet', operationId: 'createOwner' })
    @ApiResponse({ status: 201, description: 'Owner created successfully' })
    createOwner(@Body() owner: Owner): void {
        this.appService.createOwner(owner);
    }
}