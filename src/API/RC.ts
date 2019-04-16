import { Client, APIType, ClientOptions } from './Client';
import { CheckParams } from '../Helpers/Utils';

export class RCAPI {
  private client: Client;
  constructor(client?: Client) {
    this.client = client ? client : new Client();
  }

  public findRCAccounts(accounts: string[]) {
    CheckParams({ accounts });

    return this.client.callAppbaseApi(APIType.rc, 'find_rc_accounts', {
      accounts
    });
  }

  public getResourceParams() {
    return this.client.callAppbaseApi(APIType.rc, 'get_resource_params');
  }

  public getResourcePool() {
    return this.client.callAppbaseApi(APIType.rc, 'get_resource_pool');
  }
}
