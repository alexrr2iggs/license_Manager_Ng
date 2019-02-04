import { Type } from './Type';

export class LicenceSearchFilter {

  serialNumber: number;
  user: string;
  description: string;
  creationDateSince: Date;
  creationDateTo: Date;
  expirationDateSince: Date;
  expirationDateTo: Date;
  TUCMin: number;
  TUCMax: number;
  TUC_PMin: number;
  TUC_PMax: number;
  OFF_NETMin: number;
  OFF_NETMax: number;
  type: Type;
  TLS: boolean;
}
