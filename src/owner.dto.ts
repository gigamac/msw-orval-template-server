import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Owner {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    name!: string;

    @ApiPropertyOptional({ type: 'integer', format: 'int64', description: "Relational foreign key linking this owner to their Pet's ID" })
    petId?: number;
}