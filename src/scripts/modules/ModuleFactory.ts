/**
 * @author Trust1Team
 * @since 2020
 */
import {LocalConnection} from "../core/client/Connection";
import { EidBe } from './smartcards/eid/be/EidBe';
import {AbstractEidBE} from "./smartcards/eid/be/EidBeModel";
import { Aventra } from './smartcards/pki/aventra4/Aventra';
import { AbstractAventra } from './smartcards/pki/aventra4/AventraModel';
import {AbstractOberthur73} from "./smartcards/pki/oberthur73/OberthurModel";
import {Oberthur} from "./smartcards/pki/oberthur73/Oberthur";
import {AbstractIdemia} from "./smartcards/pki/idemia82/IdemiaModel";
import {Idemia} from "./smartcards/pki/idemia82/Idemia";
import {AbstractEmv} from "./payment/emv/EmvModel";
import {Emv} from "./payment/emv/Emv";
import {AbstractFileExchange} from "./file/fileExchange/FileExchangeModel";
import {FileExchange} from "./file/fileExchange/FileExchange";
import {AbstractRemoteLoading} from "./hsm/remoteloading/RemoteLoadingModel";
import {RemoteLoading} from "./hsm/remoteloading/RemoteLoading";
import {AbstractEidGeneric} from "./smartcards/eid/generic/EidGenericModel";
import {EidGeneric} from "./smartcards/eid/generic/EidGeneric";

export interface AbstractFactory {
    createEidGeneric(reader_id?: string): AbstractEidGeneric;
    createEidBE(reader_id?: string): AbstractEidBE;
    // createBeLawyer(reader_id?: string): AbstractBeLawyer;
    // createEidLUX(reader_id?: string): AbstractEidLUX;
    createEmv(reader_id?: string): AbstractEmv;
    createFileExchange(): AbstractFileExchange;
    // createWacom(): AbstractWacom;
    // createIsabel(reader_id?: string, runInUserSpace?: boolean): AbstractIsabel;
    // createLuxTrust(reader_id?: string): AbstractLuxTrust;
    // createMobib(reader_id?: string): AbstractMobib;
    // createOcra(reader_id?: string): AbstractOcra;
    createAventra(reader_id?: string): AbstractAventra;
    createOberthur(reader_id?: string): AbstractOberthur73;
    // createPIV(reader_id?: string): AbstractPiv;
    // createPKCS11(): AbstractPkcs11;
    // createJavaKeyTool(): AbstractJavaKeyTool
    // createSsh(): AbstractSsh
    // createRawPrint(runInUserSpace: boolean): AbstractRawPrint
}

const CONTAINER_NEW_CONTEXT_PATH = '/modules/';
const CONTAINER_BEID = CONTAINER_NEW_CONTEXT_PATH + 'beid';
const CONTAINER_BELAWYER = CONTAINER_NEW_CONTEXT_PATH + 'diplad';
const CONTAINER_LUXEID = CONTAINER_NEW_CONTEXT_PATH + 'luxeid';
const CONTAINER_DNIE = CONTAINER_NEW_CONTEXT_PATH + 'dnie';
const CONTAINER_EMV = CONTAINER_NEW_CONTEXT_PATH + 'emv';
const CONTAINER_WACOM = CONTAINER_NEW_CONTEXT_PATH + 'wacom-stu';
const CONTAINER_ISABEL = CONTAINER_NEW_CONTEXT_PATH + 'isabel';
const CONTAINER_FILE_EXCHANGE = CONTAINER_NEW_CONTEXT_PATH + 'fileexchange';
const CONTAINER_LUXTRUST = CONTAINER_NEW_CONTEXT_PATH + 'luxtrust';
const CONTAINER_MOBIB = CONTAINER_NEW_CONTEXT_PATH + 'mobib';
const CONTAINER_OCRA = CONTAINER_NEW_CONTEXT_PATH + 'ocra';
const CONTAINER_AVENTRA = CONTAINER_NEW_CONTEXT_PATH + 'aventra4';
const CONTAINER_OBERTHUR = CONTAINER_NEW_CONTEXT_PATH + 'oberthur_73';
const CONTAINER_IDEMIA = CONTAINER_NEW_CONTEXT_PATH + 'idemia_cosmo_82';
const CONTAINER_PIV = CONTAINER_NEW_CONTEXT_PATH + 'piv';
const CONTAINER_PTEID = CONTAINER_NEW_CONTEXT_PATH + 'pteid';
const CONTAINER_PKCS11 = CONTAINER_NEW_CONTEXT_PATH + 'pkcs11';
const CONTAINER_REMOTE_LOADING = CONTAINER_NEW_CONTEXT_PATH + 'remoteloading';
const CONTAINER_JAVA_KEY_TOOL = CONTAINER_NEW_CONTEXT_PATH + 'java-keytool';
const CONTAINER_SSH = CONTAINER_NEW_CONTEXT_PATH + 'ssh';
const CONTAINER_RAW_PRINT = CONTAINER_NEW_CONTEXT_PATH + 'rawprint';


export class ModuleFactory implements AbstractFactory {
    constructor(private url: string, private connection: LocalConnection) {}

    public createEidGeneric(reader_id: string): AbstractEidGeneric {
        return new EidGeneric(this.url, CONTAINER_NEW_CONTEXT_PATH, this.connection, reader_id);
    }

    public createEidBE(reader_id: string): AbstractEidBE {
        return new EidBe(this.url, CONTAINER_BEID, this.connection, reader_id);
    }

    public createAventra(reader_id: string): AbstractAventra {
        return new Aventra(this.url, CONTAINER_AVENTRA, this.connection, reader_id);
    }

    public createOberthur(reader_id: string): AbstractOberthur73 {
        return new Oberthur(this.url, CONTAINER_OBERTHUR, this.connection, reader_id);
    }

    public createIdemia(reader_id: string): AbstractIdemia {
        return new Idemia(this.url, CONTAINER_IDEMIA, this.connection, reader_id);
    }

    public createEmv(reader_id: string): AbstractEmv {
        return new Emv(this.url, CONTAINER_EMV, this.connection, reader_id);
    }

    public createFileExchange(): AbstractFileExchange {
        return new FileExchange(this.url, CONTAINER_FILE_EXCHANGE, this.connection);
    }

    public createRemoteLoading(reader_id: string): AbstractRemoteLoading {
        return new RemoteLoading(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    }


/*    public createDNIe(reader_id?: string): AbstractDNIe {
        return new DNIe(this.url, CONTAINER_DNIE, this.connection, reader_id);
    }

    public createBeLawyer(reader_id?: string): AbstractBeLawyer {
        return new BeLawyer(this.url, CONTAINER_BELAWYER, this.connection, reader_id);
    }

    public createEidLUX(reader_id?: string, pin?: string, pinType?: PinType, isEncrypted: boolean = false): AbstractEidLUX {
        return new EidLux(this.url, CONTAINER_LUXEID, this.connection, reader_id, pin, pinType, isEncrypted);
    }

    public createEidPT(reader_id?: string): AbstractEidPT {
        return new EidPt(this.url, CONTAINER_PTEID, this.connection, reader_id);
    }



    public createWacom(): AbstractWacom {
        return new Wacom(this.url, CONTAINER_WACOM, this.connection, 'wacom-stu');
    }

    public createIsabel(reader_id?: string, runInUserSpace?: boolean): AbstractIsabel {
        return new Isabel(this.url, CONTAINER_ISABEL, this.connection, reader_id, runInUserSpace);
    }

    public createLuxTrust(reader_id?: string): AbstractLuxTrust {
        return new LuxTrust(this.url, CONTAINER_LUXTRUST, this.connection, reader_id);
    }

    public createMobib(reader_id?: string): AbstractMobib {
        return new Mobib(this.url, CONTAINER_MOBIB, this.connection, reader_id);
    }

    public createOcra(reader_id?: string): AbstractOcra {
        return new Ocra(this.url, CONTAINER_OCRA, this.connection, reader_id);
    }

    public createOberthurNO(reader_id?: string): AbstractOberthur {
        return new Oberthur(this.url, CONTAINER_OBERTHUR, this.connection, reader_id);
    }

    public createPIV(reader_id?: string): AbstractPiv {
        return new PIV(this.url, CONTAINER_PIV, this.connection, reader_id);
    }

    public createPKCS11(): AbstractPkcs11 {
        return new PKCS11(this.url, CONTAINER_PKCS11, this.connection);
    }

    public createRemoteLoading(reader_id?: string): AbstractRemoteLoading {
        return new RemoteLoading(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    }

    public createBelfius(reader_id?: string): AbstractBelfius {
        return new Belfius(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    }

    public createFileExchange(): AbstractFileExchange {
        return new RemoteLoading(this.url, CONTAINER_FILE_EXCHANGE, this.connection);
    }

    public createDataContainer(containerPath: string): () => AbstractDataContainer {
        return (): AbstractDataContainer => {
            return new DataContainer(this.url, containerPath, this.connection);
        };
    }

    public createJavaKeyTool(): AbstractJavaKeyTool {
        return new JavaKeyTool(this.url, CONTAINER_JAVA_KEY_TOOL, this.connection);
    }

    public createSsh(): AbstractSsh {
        return new Ssh(this.url, '', this.connection, 'ssh');
    }

    public createRawPrint(runInUserSpace: boolean): AbstractRawPrint {
        return new RawPrint(this.url, CONTAINER_RAW_PRINT, this.connection, runInUserSpace);
    }*/
}
