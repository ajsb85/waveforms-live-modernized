import { Storage } from '@ionic/storage-angular';
import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class StorageService {
    public storage: Storage;
    public saveLoadEventEmitter: EventEmitter<any> = new EventEmitter();
    public ready: Promise<Storage>;

    constructor(_storage: Storage) {
        this.storage = _storage;
        this.ready = this.storage.create();
        console.log('storage constructor');
    }

    //Get data from SqlStorage
    async getData(name: string) {
        await this.ready;
        return this.storage.get(name);
    }

    //Save data to SqlStorage
    async saveData(name: string, jsonString: string) {
        await this.ready;
        return this.storage.set(name, jsonString);
    }

    //Remove data by keyname
    async removeDataByKey(key: string) {
        await this.ready;
        return this.storage.remove(key);
    }

    //Clear all data from storage
    async clearAll() {
        await this.ready;
        return this.storage.clear();
    }

    //Emit save event to all listeners
    saveSettings() {
        console.log('in storage service about to emit');
        this.saveLoadEventEmitter.next('save');
        console.log('emitted from storage service with .next');
    }

    //Emit load event to all listeners
    loadSettings() {
        console.log('in storage service about to emit');
        this.saveLoadEventEmitter.next('load');
        console.log('emitted from storage service with .next');
    }
}
