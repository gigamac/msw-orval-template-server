import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Pet {
    @ApiProperty({ type: 'integer', format: 'int64' })
    id!: number;

    @ApiProperty()
    name!: string;

    @ApiPropertyOptional()
    tag?: string;
}