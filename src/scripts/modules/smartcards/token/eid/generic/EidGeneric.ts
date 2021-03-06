import {LocalConnection} from '../../../../../core/client/Connection';
import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
    AbstractEidGeneric,
    TokenAddressResponse, TokenAuthenticateResponse,
    TokenBiometricDataResponse, TokenPictureResponse, TokenSignResponse,
    TokenDataResponse, TokenAlgorithmReferencesResponse,
} from './EidGenericModel';
import {
    BoolDataResponse,
    TokenCertificateResponse,
    DataArrayResponse,
    DataObjectResponse,
    T1CResponse, TokenAllCertsResponse,
} from '../../../../../core/service/CoreModel';
import {RequestHandler} from '../../../../../util/RequestHandler';
import {TokenAuthenticateOrSignData, TokenVerifyPinData} from '../../TokenCard';
import {Options} from "../../../Card";
import {CertParser} from "../../../../../util/CertParser";
import {ResponseHandler} from "../../../../../util/ResponseHandler";

export class EidGeneric implements AbstractEidGeneric {
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_MOD_DESC = '/desc';
    static PATH_READERS = '/readers';
    static ALL_DATA = '/all-data';
    static ALL_CERTIFICATES = '/cert-list';
    static CERT_ROOT = '/root-cert';
    static CERT_AUTHENTICATION = '/authentication-cert';
    static CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    static CERT_ENCRYPTION = '/encryption-cert';
    static CERT_INTERMEDIATE = '/intermediate-certs';
    static BIOMETRIC = '/biometric';
    static ADDRESS = '/address';
    static PHOTO = '/picture';
    static TOKEN = '/info';
    static VERIFY_PIN = '/verify-pin';
    static SIGN_DATA = '/sign';
    static AUTHENTICATE = '/authenticate';
    static VERIFY_PRIV_KEY_REF = 'non-repudiation';
    static SUPPORTED_ALGOS = '/supported-algorithms';
    static RESET_BULK_PIN = "/reset-bulk-pin"

    constructor(
        protected baseUrl: string,
        protected containerUrl: string,
        protected connection: LocalConnection,
        protected reader_id: string
    ) {
    }

    public allData(module: string, options?: string[] | Options, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        // @ts-ignore
        const requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.ALL_DATA),
            requestOptions.params
        );
    }

    public biometric(module: string, callback?: (error: T1CLibException, data: TokenBiometricDataResponse) => void): Promise<TokenBiometricDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.BIOMETRIC),
            undefined,
            undefined,
            callback
        );
    }

    public address(module: string, callback?: (error: T1CLibException, data: TokenAddressResponse) => void): Promise<TokenAddressResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.ADDRESS),
            undefined,
            undefined,
            callback
        );
    }

    public tokenData(module: string, callback?: (error: T1CLibException, data: TokenDataResponse) => void): Promise<TokenDataResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.TOKEN),
            undefined,
            undefined,
            callback
        );
    }

    public picture(module: string, callback?: (error: T1CLibException, data: TokenPictureResponse) => void): Promise<TokenPictureResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.PHOTO),
            undefined,
            undefined,
            callback
        );
    }

    public rootCertificate(module: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_ROOT),
            undefined,
            undefined,
            callback
        ).then((res: TokenCertificateResponse) => {
            return CertParser.processTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public intermediateCertificates(module: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_INTERMEDIATE),
            undefined,
            undefined,
            callback
        ).then((res: TokenCertificateResponse) => {
            return CertParser.processTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public authenticationCertificate(module: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_AUTHENTICATION),
            undefined,
            undefined,
            callback
        ).then((res: TokenCertificateResponse) => {
            return CertParser.processTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public nonRepudiationCertificate(module: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_NON_REPUDIATION),
            undefined,
            undefined,
            callback
        ).then((res: TokenCertificateResponse) => {
            return CertParser.processTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public encryptionCertificate(module: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.CERT_ENCRYPTION),
            undefined,
            undefined,
            callback
        ).then((res: TokenCertificateResponse) => {
            return CertParser.processTokenCertificate(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public allAlgoRefs(module: string, callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse> {
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.SUPPORTED_ALGOS),
            undefined,
            undefined,
            callback
        );
    }

    public allCerts(module: string, parseCerts?: boolean, options?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse> {
        // @ts-ignore
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.ALL_CERTIFICATES),
            reqOptions.params
        ).then((res: TokenAllCertsResponse) => {
            return CertParser.processTokenAllCertificates(res, parseCerts, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public verifyPin(module: string, body: TokenVerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.VERIFY_PIN),
            body,
            undefined,
            undefined,
            callback
        );
    }

    public authenticate(module: string, body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.AUTHENTICATE),
            body,
            undefined,
            undefined,
            callback
        );
    }


    public sign(module: string, body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse> {
        return this.connection.post(
            this.baseUrl,
            this.tokenApp(module, EidGeneric.SIGN_DATA),
            body,
            [this.getBulkSignQueryParams(bulk)],
            undefined,
            callback
        );
    }

    resetBulkPin(module: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        // @ts-ignore
        return this.connection.post(this.baseUrl, this.tokenApp(module, EidGeneric.RESET_BULK_PIN), null, undefined, undefined, callback);
    }

    // resolves the reader_id in the base URL
    protected tokenApp(module: string, path?: string): string {
        let suffix = this.containerUrl; // is '/modules/'
        suffix += module; //add module name
        suffix += EidGeneric.PATH_TOKEN_APP + EidGeneric.PATH_READERS;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }

    // resolves the modules base bath
    protected baseApp(module: string, path?: string): string {
        let suffix = this.containerUrl; // is '/modules/'
        suffix += module; //add module name
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }

    getModuleDescription(module: string, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        return this.connection.get(
            this.baseUrl,
            this.baseApp(module, EidGeneric.PATH_MOD_DESC),
            undefined,
            undefined,
            callback
        );
    }


    protected getBulkSignQueryParams(bulk?: boolean): any {
        if(bulk) {
            return {bulk: true};
        }
    }
}
