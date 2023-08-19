import { Connection } from 'typeorm';
import { BankAccountOrm } from '../entity/bankAccount.orm.repository';
import { FinancialMovementOrm } from '../entity/financialMovement.orm.repository';
import { ClientOrm } from '../entity/client.orm.repository';


export const bankAccountProviders = [
  {
    provide: 'BANK_ACCOUNT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(BankAccountOrm),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const financialMovementsProviders = [
  {
    provide: 'FINANCIAL_MOVEMENTS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(FinancialMovementOrm),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const clientProviders = [
  {
    provide: 'CLIENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(ClientOrm),
    inject: ['DATABASE_CONNECTION'],
  },
];