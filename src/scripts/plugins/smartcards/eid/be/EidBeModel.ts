import {
  CertificateResponse,
  DataObjectResponse,
  DataResponse,
  T1CCertificate,
  T1CResponse,
} from '../../../../..';

export interface AbstractEidBE {
  allData(filters: string[]): Promise<BeidAllDataResponse>;
  allCerts(filters: string[]): Promise<BeidAllCertsResponse>;
  rnData(): Promise<BeidRnDataResponse>;
  tokenData(): Promise<BeidTokenDataResponse>;
  address(): Promise<BeidAddressResponse>;
  picture(): Promise<DataResponse>;
  rootCertificate(): Promise<CertificateResponse>;
  citizenCertificate(): Promise<CertificateResponse>;
  authenticationCertificate(): Promise<CertificateResponse>;
  nonRepudiationCertificate(): Promise<CertificateResponse>;
  rrnCertificate(): Promise<CertificateResponse>;
  verifyPin(): Promise<T1CResponse>;
  verifyPinWithEncryptedPin(): Promise<T1CResponse>;
}

export class BeidAddressResponse extends DataObjectResponse {
  constructor(public data: BeidAddress, public success: boolean) {
    super(data, success);
  }
}

export class BeidAddress {
  constructor(
    public municipality: string,
    public raw_data: string,
    public signature: string,
    public street_and_number: string,
    public version: number,
    public zipcode: string
  ) {}
}

export class BeidAllCertsResponse extends DataObjectResponse {
  constructor(public data: BeidAllCerts, public success: boolean) {
    super(data, success);
  }
}

export class BeidAllCerts {
  constructor(
    public authentication_certificate?: T1CCertificate,
    public citizen_certificate?: T1CCertificate,
    public non_repudiation_certificate?: T1CCertificate,
    public root_certificate?: T1CCertificate,
    public rrn_certificate?: T1CCertificate
  ) {}
}

export class BeidAllDataResponse extends BeidAllCertsResponse {
  constructor(public data: BeidAllData, public success: boolean) {
    super(data, success);
  }
}

export class BeidAllData {
  constructor(
    public address?: BeidAddress,
    public authentication_certificate?: T1CCertificate,
    public citizen_certificate?: T1CCertificate,
    public non_repudiation_certificate?: T1CCertificate,
    public picture?: string,
    public rn?: BeidRnData,
    public root_certificate?: T1CCertificate,
    public rrn_certificate?: T1CCertificate,
    public token_data?: BeidTokenData
  ) {}
}

export class BeidTokenData {
  constructor(
    public eid_compliant?: number,
    public electrical_perso_interface_version?: number,
    public electrical_perso_version?: number,
    public graphical_perso_version?: number,
    public label?: string,
    public prn_generation?: string,
    public raw_data?: string,
    public serial_number?: string,
    public version?: number,
    public version_rfu?: number
  ) {}
}

export class BeidTokenDataResponse extends DataObjectResponse {
  constructor(public data: BeidTokenData, public success: boolean) {
    super(data, success);
  }
}

export class BeidRnData {
  constructor(
    public birth_date: string,
    public birth_location: string,
    public card_delivery_municipality: string,
    public card_number: string,
    public card_validity_date_begin: string,
    public card_validity_date_end: string,
    public chip_number: string,
    public document_type: string,
    public first_names: string,
    public name: string,
    public national_number: string,
    public nationality: string,
    public noble_condition: string,
    public picture_hash: string,
    public raw_data: string,
    public sex: string,
    public signature: string,
    public special_status: string,
    public third_name: string,
    public version: number
  ) {}
}

export class BeidRnDataResponse extends DataObjectResponse {
  constructor(public data: BeidRnData, public success: boolean) {
    super(data, success);
  }
}
