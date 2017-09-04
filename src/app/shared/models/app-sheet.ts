export class AppSheet {
    id: number;
    name: string;
    originalName: string;
    uploadedOn: string;
    path: string;
    appFk: number;

    constructor(name: string, originalName: string, uploadedOn: string, path: string, appId: number, id?: number) {
        this.id = id;
        this.name = name;
        this.originalName = originalName;
        this.uploadedOn = uploadedOn;
        this.path = path;
        this.appFk = appId;
    }
}
