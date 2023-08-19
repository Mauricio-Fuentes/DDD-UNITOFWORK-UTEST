import { Module } from '@nestjs/common';
import { bankAccountProviders, financialMovementsProviders, clientProviders } from './migrations/entities.provider';
import { databaseProviders } from './provider/database.provider';


@Module({
  providers: [
    ...databaseProviders,
    ...bankAccountProviders,
    ...financialMovementsProviders,
    ...clientProviders
  ],
  exports: [
    ...databaseProviders,
    ...bankAccountProviders,
    ...financialMovementsProviders,
    ...clientProviders
  ]
})
export class DatabaseModule{}