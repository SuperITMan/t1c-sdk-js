import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { ResetPinData, VerifyPinData, Options, AuthenticateOrSignData } from '../../Card';
import { AbstractOberthur73 } from './OberthurModel';
import { RequestOptions } from '../../../../util/RequestHandler';
import { LocalConnection } from '../../../../core/client/Connection';
import { CertificateResponse, DataArrayResponse, DataObjectResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
export declare class Oberthur implements AbstractOberthur73 {
    protected baseUrl: string;
    protected containerUrl: string;
    protected connection: LocalConnection;
    protected reader_id: string;
    static PATH_TOKEN_APP: string;
    static PATH_READERS: string;
    static CONTAINER_PREFIX: string;
    static RESET_PIN: string;
    static ALL_CERTIFICATES: string;
    static AUTHENTICATE: string;
    static CERT_ROOT: string;
    static CERT_AUTHENTICATION: string;
    static CERT_NON_REPUDIATION: string;
    static CERT_ISSUER: string;
    static CERT_ENCRYPTION: string;
    static CERT_RRN: string;
    static SIGN_DATA: string;
    static VERIFY_PIN: string;
    static SUPPORTED_ALGOS: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    rootCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    verifyPinWithEncryptedPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    resetPin(body: ResetPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allCerts(options: string[] | Options, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    authenticateWithEncryptedPin(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    signDataWithEncryptedPin(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    protected getCertificate(certUrl: string, options: RequestOptions): Promise<CertificateResponse>;
    allData(options: string[] | Options, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    protected tokenApp(path?: string): string;
}
