import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { Role } from '../role/role.entity';
import { CreateRoleDto } from './dtos/create-role.dto';
import { ReadRoleDto } from './dtos/read-role.dto';
import { UpdateRoleDto } from './dtos/update-role,dto';
import { RoleRepository } from './role.repository';
import { status } from './../../shared/entity-status.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<ReadRoleDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const role: Role = await this._roleRepository.findOne(id, {
      where: { isActive: status.ACTIVE },
    });

    if (!role) {
      throw new NotFoundException();
    }

    return plainToClass(ReadRoleDto, role);
  }

  async getAll(): Promise<ReadRoleDto[]> {
    const roles: Role[] = await this._roleRepository.find({
      where: { isActive: status.ACTIVE },
    });
    // classToPlain(role, ReloadRoleDto)
    return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
  }

  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole: Role = await this._roleRepository.save(role);
    return plainToClass(ReadRoleDto, savedRole);
  }

  async update(
    roleId: number,
    role: Partial<UpdateRoleDto>,
  ): Promise<ReadRoleDto> {
    const foundRole: Role = await this._roleRepository.findOne(roleId, {
      where: { isActive: status.ACTIVE },
    });
    if (!foundRole) {
      throw new NotFoundException('This role does not exist');
    }

    foundRole.name = role.name;
    foundRole.description = role.descripcion;

    const updateRole: Role = await this._roleRepository.save(foundRole);

    return plainToClass(ReadRoleDto, updateRole);
  }

  async delete(id: number): Promise<void> {
    const roleExists = await this._roleRepository.findOne(id, {
      where: { isActive: status.ACTIVE },
    });
    if (!roleExists) {
      throw new NotFoundException();
    }
    await this._roleRepository.update(id, { isActive: status.ACTIVE });
  }
}
