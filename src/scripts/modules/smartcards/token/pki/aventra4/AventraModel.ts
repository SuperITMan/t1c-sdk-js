import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
    BoolDataResponse, TokenAllCertsResponse,
    TokenCertificateResponse
} from '../../../../../core/service/CoreModel';
import {TokenAuthenticateOrSignData} from "../../TokenCard";
import {TokenVerifyPinData, TokenResetPinData} from "../../TokenCard";
import {
    TokenAuthenticateResponse, TokenSignResponse,
    TokenDataResponse,
    TokenVerifyPinResponse, TokenAlgorithmReferencesResponse, TokenResetPinResponse
} from "../../eid/generic/EidGenericModel";
import {Options} from "../../../Card";


export interface AbstractAventra {
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allCerts(parseCerts?: boolean, filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse>;
    tokenData(callback?: (error: T1CLibException, data: TokenDataResponse) => void): Promise<TokenDataResponse>;
    rootCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    authenticationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    nonRepudiationCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    encryptionCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    issuerCertificate(parseCerts?: boolean, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>
    verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse>;
    authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse>;
    sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
    resetPin(body: TokenResetPinData, callback?: (error: T1CLibException, data: TokenResetPinResponse) => void): Promise<TokenResetPinResponse>
    allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse>
    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}
