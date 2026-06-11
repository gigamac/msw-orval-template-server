import { ApiProperty } from '@nestjs/swagger';

export class AdoptPetDto {
    @ApiProperty()
    ownerId!: string;

    @ApiProperty({ type: 'integer' })
    petId!: number;
}