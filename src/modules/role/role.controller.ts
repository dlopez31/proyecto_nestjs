import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { ReadRoleDto } from './dtos/read-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.services';

@Controller('role')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':RoleId')
  getRole(@Param('RoleId', ParseIntPipe) RoleId: number): Promise<ReadRoleDto> {
    return this._roleService.get(RoleId);
  }

  @Get()
  getRoleAll(): Promise<ReadRoleDto[]> {
    return this._roleService.getAll();
  }

  @Post()
  createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    return this._roleService.create(role);
  }

  @Patch(':RoleId')
  updatedRole(
    @Param('RoleId', ParseIntPipe) RoleId: number,
    @Body() role: Partial<CreateRoleDto>,
  ): Promise<ReadRoleDto> {
    return this._roleService.update(RoleId, role);
  }

  @Delete(':id')
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this._roleService.delete(id);
  }
}
