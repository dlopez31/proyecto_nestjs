import { Module } from '@nestjs/common';
import { databaseProviders } from './database.services';

@Module({
  imports: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
