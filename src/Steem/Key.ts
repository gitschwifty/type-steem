export interface Key {
  weight_threshold: number;
  account_auths: unknown[];
  key_auths: Array<[string, number]>;
}
