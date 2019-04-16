import { Client, APIType, ClientOptions } from './Client';

export class RCAPI extends Client {
  constructor(node?: string, options?: ClientOptions) {
    super(node, options);
  }

  public findRCAccounts(accounts: string[]) {
    this.checkParams({ accounts });

    return this.callAppbaseApi(APIType.rc, 'find_rc_accounts', { accounts });
  }

  public getResourceParams() {
    return this.callAppbaseApi(APIType.rc, 'get_resource_params');
  }

  public getResourcePool() {
    return this.callAppbaseApi(APIType.rc, 'get_resource_pool');
  }
}
