import { User } from './User';
import { Type } from './Type';

export class Licence {

  serialNumber: number;
  user: User;
  description: string;
  creationDate: Date;
  expirationDate: Date;
  type: Type;
  TUC: number;
  TUC_P: number;
  OFF_NET: number;
  TLS: boolean;
  system: number;
}
