import { IsNumber, IsString, MaxLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadRoleDto {
  @Expose({ name: 'Identificador' })
  @IsNumber()
  readonly id: number;

  @IsString()
  @MaxLength(50, { message: 'This name is not valid' })
  readonly name: string;

  @IsString()
  @MaxLength(100, { message: 'This description is not valid' })
  readonly descripcion: string;
}
