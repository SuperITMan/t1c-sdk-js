import { CertificateResponse, DataObjectResponse, DataResponse, T1CCertificate, T1CResponse } from '../../../../..';
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
export declare class BeidAddressResponse extends DataObjectResponse {
    data: BeidAddress;
    success: boolean;
    constructor(data: BeidAddress, success: boolean);
}
export declare class BeidAddress {
    municipality: string;
    raw_data: string;
    signature: string;
    street_and_number: string;
    version: number;
    zipcode: string;
    constructor(municipality: string, raw_data: string, signature: string, street_and_number: string, version: number, zipcode: string);
}
export declare class BeidAllCertsResponse extends DataObjectResponse {
    data: BeidAllCerts;
    success: boolean;
    constructor(data: BeidAllCerts, success: boolean);
}
export declare class BeidAllCerts {
    authentication_certificate?: T1CCertificate | undefined;
    citizen_certificate?: T1CCertificate | undefined;
    non_repudiation_certificate?: T1CCertificate | undefined;
    root_certificate?: T1CCertificate | undefined;
    rrn_certificate?: T1CCertificate | undefined;
    constructor(authentication_certificate?: T1CCertificate | undefined, citizen_certificate?: T1CCertificate | undefined, non_repudiation_certificate?: T1CCertificate | undefined, root_certificate?: T1CCertificate | undefined, rrn_certificate?: T1CCertificate | undefined);
}
export declare class BeidAllDataResponse extends BeidAllCertsResponse {
    data: BeidAllData;
    success: boolean;
    constructor(data: BeidAllData, success: boolean);
}
export declare class BeidAllData {
    address?: BeidAddress | undefined;
    authentication_certificate?: T1CCertificate | undefined;
    citizen_certificate?: T1CCertificate | undefined;
    non_repudiation_certificate?: T1CCertificate | undefined;
    picture?: string | undefined;
    rn?: BeidRnData | undefined;
    root_certificate?: T1CCertificate | undefined;
    rrn_certificate?: T1CCertificate | undefined;
    token_data?: BeidTokenData | undefined;
    constructor(address?: BeidAddress | undefined, authentication_certificate?: T1CCertificate | undefined, citizen_certificate?: T1CCertificate | undefined, non_repudiation_certificate?: T1CCertificate | undefined, picture?: string | undefined, rn?: BeidRnData | undefined, root_certificate?: T1CCertificate | undefined, rrn_certificate?: T1CCertificate | undefined, token_data?: BeidTokenData | undefined);
}
export declare class BeidTokenData {
    eid_compliant?: number | undefined;
    electrical_perso_interface_version?: number | undefined;
    electrical_perso_version?: number | undefined;
    graphical_perso_version?: number | undefined;
    label?: string | undefined;
    prn_generation?: string | undefined;
    raw_data?: string | undefined;
    serial_number?: string | undefined;
    version?: number | undefined;
    version_rfu?: number | undefined;
    constructor(eid_compliant?: number | undefined, electrical_perso_interface_version?: number | undefined, electrical_perso_version?: number | undefined, graphical_perso_version?: number | undefined, label?: string | undefined, prn_generation?: string | undefined, raw_data?: string | undefined, serial_number?: string | undefined, version?: number | undefined, version_rfu?: number | undefined);
}
export declare class BeidTokenDataResponse extends DataObjectResponse {
    data: BeidTokenData;
    success: boolean;
    constructor(data: BeidTokenData, success: boolean);
}
export declare class BeidRnData {
    birth_date: string;
    birth_location: string;
    card_delivery_municipality: string;
    card_number: string;
    card_validity_date_begin: string;
    card_validity_date_end: string;
    chip_number: string;
    document_type: string;
    first_names: string;
    name: string;
    national_number: string;
    nationality: string;
    noble_condition: string;
    picture_hash: string;
    raw_data: string;
    sex: string;
    signature: string;
    special_status: string;
    third_name: string;
    version: number;
    constructor(birth_date: string, birth_location: string, card_delivery_municipality: string, card_number: string, card_validity_date_begin: string, card_validity_date_end: string, chip_number: string, document_type: string, first_names: string, name: string, national_number: string, nationality: string, noble_condition: string, picture_hash: string, raw_data: string, sex: string, signature: string, special_status: string, third_name: string, version: number);
}
export declare class BeidRnDataResponse extends DataObjectResponse {
    data: BeidRnData;
    success: boolean;
    constructor(data: BeidRnData, success: boolean);
}
