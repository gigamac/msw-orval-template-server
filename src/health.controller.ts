import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExcludeController } from '@nestjs/swagger';

@ApiTags('health')
@ApiExcludeController()
@Controller('health')
export class HealthController {
    @Get()
    @ApiOperation({ summary: 'Check API health status', operationId: 'getHealth' })
    getHealth(): { status: string } {
        return { status: 'ok' };
    }
}