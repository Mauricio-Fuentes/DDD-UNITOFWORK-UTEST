import { IUnitOfWork } from '../../src/infrastructure/contracts/unitOfWork.interface';
import {
  ConsignBankAccountRequest,
  ConsignBankAccountResponse,
  ConsignBankAccountService,
} from '../../src/application/consignBankAccount.service';
import { createConnection } from 'typeorm';
import { UnitOfWork } from '../../src/infrastructure/unitOfWork/unitOfWork';


// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require('assert');

describe('Bank Account Tests', ()=>{

  let unitOfWork: IUnitOfWork;

  beforeEach(async ()=>{
    unitOfWork = new UnitOfWork(await createConnection({
      name: 'test',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      dropSchema: false,
      synchronize: false,
      logging: true,
      username: 'root',
      password: 'root',
      database: 'NUR_BNB_SERVICES',
      entities: ['src/infrastructure/database/entity/*.ts']
    }));
  })

  
    it('Create saving account test', async () => {
      const service: ConsignBankAccountService = new ConsignBankAccountService(unitOfWork);
      const request: ConsignBankAccountRequest = new ConsignBankAccountRequest();
      request.city = 'Santa Cruz';
      request.number = '1111';
      request.type = 'Ahorro';
      request.value = 5;
      const response: ConsignBankAccountResponse = await unitOfWork.complete(() => service.execute(request));
      assert.equal(response.message, 'Se consignaron ' + request.value + ' a la cuenta: ' + request.number);

     })
})