import {T1CLibException} from '../../../core/exceptions/CoreExceptions';
import {LocalConnection} from '../../../core/client/Connection';
import {
    AbstractPkcs11, Pkcs11ObjectCertificate, Pkcs11ObjectCertificates,
    Pkcs11ObjectCertificatesResponse, Pkcs11ObjectSignResponse,
    Pkcs11ObjectSlotsResponse, Pkcs11ObjectTokenResponse,
    Pkcs11SetConfigResponse,
    Pkcs11SignData,
} from './Pkcs11Model';
import {ResponseHandler} from "../../../util/ResponseHandler";
import {CertParser} from "../../../util/CertParser";

export class PKCS11 implements AbstractPkcs11 {

    static PATH_SLOT_ID = '/slots/';

    static ALL_CERTIFICATES = '/certificates';
    static CONFIG = '/config';
    static INFO = '/info';
    static SIGN = '/sign';
    static SLOTS = '/slots';
    static TOKEN = '/token-info';

    private modulePath;


    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection,
                protected configPath: string) {
    }

    public certificates(slotId: string, parseCerts?: boolean, callback?: (error: T1CLibException, data: Pkcs11ObjectCertificatesResponse)
                            => void): Promise<Pkcs11ObjectCertificatesResponse> {
        return this.setLibrary().then(_ => {
            return this.connection.get(this.baseUrl, this.pkcs11Path(PKCS11.ALL_CERTIFICATES, slotId), undefined)
                .then((res: Pkcs11ObjectCertificatesResponse) => {
                    if (parseCerts) {
                        const newRes = new Pkcs11ObjectCertificates([]);
                        res.data.certificates.forEach((cert: Pkcs11ObjectCertificate) => {
                            newRes.certificates.push(new Pkcs11ObjectCertificate(cert.id, cert.certificate, CertParser.processCert(cert.certificate)))
                        });
                        return ResponseHandler.response(new Pkcs11ObjectCertificatesResponse(newRes, res.success), callback);
                    } else {
                        return ResponseHandler.response(res, callback);
                    }
                })
                .catch(error => {
                    return ResponseHandler.error(error, callback);
                })
        })
    }

    // public info(callback?: (error: T1CLibException, data: Pkcs11ObjectInfoResponse) => void): Promise<Pkcs11ObjectInfoResponse> {
    //     return this.setLibrary().then(res => {
    //         return this.connection.get(this.baseUrl, this.pkcs11Path(PKCS11.CONFIG), undefined)
    //     })
    // }

    public signData(signData: Pkcs11SignData, callback?: (error: T1CLibException, data: Pkcs11ObjectSignResponse) => void): Promise<Pkcs11ObjectSignResponse> {
        return this.setLibrary().then(res => {
            let req = {
                certificateId: signData.certificateId,
                slot_id: signData.slotId,
                pin: signData.pin,
                data: signData.data,
                algorithm: signData.algorithm,
                osDialog: signData.osDialog
            };
            return this.connection.post(this.baseUrl, this.pkcs11Path(PKCS11.SIGN, signData.slotId), req, undefined)
        })
    }

    public slots(callback?: (error: T1CLibException, data: Pkcs11ObjectSlotsResponse) => void): Promise<Pkcs11ObjectSlotsResponse> {
        return this.setLibrary().then(res => {
            let req = {module: this.modulePath};
            return this.connection.get(this.baseUrl, this.pkcs11Path(PKCS11.SLOTS), req, undefined)
        })
    }

    public slotsWithTokenPresent(callback?: (error: T1CLibException, data: Pkcs11ObjectSlotsResponse) => void): Promise<Pkcs11ObjectSlotsResponse> {
        return this.setLibrary().then(res => {
            let req = {module: this.modulePath};
            return this.connection.get(this.baseUrl, this.pkcs11Path(PKCS11.SLOTS), req, {'token-present': 'true'})
        })
    }

    public token(slotId: string, callback: (error: T1CLibException, data: Pkcs11ObjectTokenResponse) => void): Promise<Pkcs11ObjectTokenResponse> {
        return this.setLibrary().then(res => {
            let req = Object.assign({slot_id: slotId}, {module: this.modulePath});
            return this.connection.get(this.baseUrl, this.pkcs11Path(PKCS11.TOKEN, slotId), req, undefined)
        })
    }

    private setLibrary(): Promise<Pkcs11SetConfigResponse> {
        let req = Object.assign({path: this.configPath});
        return this.connection.post(this.baseUrl, this.pkcs11Path(PKCS11.CONFIG), req, undefined)
    }


    protected pkcs11Path(path?: string, slotNumber?: string): string {
        let suffix = this.containerUrl;
        if (slotNumber != null || slotNumber != undefined) {
            suffix += PKCS11.PATH_SLOT_ID + slotNumber;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }

}

