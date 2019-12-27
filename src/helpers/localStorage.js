import localforage from 'localforage';
export default {
    saveUpdateObject: (dbFileName, dbFileVersion, database, key, value, successCallBack, errorCallBack) => {
        // configuring indexed DB
        localforage.config({
            driver: localforage.IndexedDB, // Force WebSQL; same as using setDriver()
            name: dbFileName,
            version: dbFileVersion,
            size: 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName: database, // Should be alphanumeric, with underscores.
            description: 'database'
        });

        localforage.ready().then(function () {
            localforage.setItem(key, value);
            successCallBack(key, value);
        }).catch(function () {
            errorCallBack();
        });

    },
    retrieveDB: (dbFileName, dbFileVersion, database, successCallBack, errorCallBack) => {
        // configuring indexed DB
        localforage.config({
            driver: localforage.IndexedDB, // Force WebSQL; same as using setDriver()
            name: dbFileName,
            version: dbFileVersion,
            size: 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName: database, // Should be alphanumeric, with underscores.
            description: 'database'
        });

        localforage.ready().then(function () {
            let keys = [];
            let values = [];
            localforage.iterate(function(value, key) {
                keys.push(key);
                values.push(value);
                successCallBack(keys, values);
            }).then(function() {
                errorCallBack();
            }).catch(function() {
            });

        }).catch(function () {
        });

    },
    retrieveDBObject: (dbFileName, dbFileVersion, database, key, successCallBack, errorCallBack) => {
        // configuring indexed DB
        localforage.config({
            driver: localforage.IndexedDB, // Force WebSQL; same as using setDriver()
            name: dbFileName,
            version: dbFileVersion,
            size: 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName: database, // Should be alphanumeric, with underscores.
            description: 'database'
        });

        localforage.ready().then(function () {
            
            localforage.getItem(key).then(function(value) {
                successCallBack(key, value);
            }).catch(function() {
                errorCallBack();
            });

        }).catch(function () {
        });
    },
    deleteDBObject: (dbFileName, dbFileVersion, database, key, successCallBack, errorCallBack) => {
        // configuring indexed DB
        localforage.config({
            driver: localforage.IndexedDB, // Force WebSQL; same as using setDriver()
            name: dbFileName,
            version: dbFileVersion,
            size: 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName: database, // Should be alphanumeric, with underscores.
            description: 'database'
        });

        localforage.ready().then(function () {
            
            localforage.removeItem(key).then(function() {
                successCallBack(key);
            }).catch(function() {
                errorCallBack();
            });

        }).catch(function () {
        });

    },
    clearDB: (dbFileName, dbFileVersion, database, callBack) => {
        // configuring indexed DB
        localforage.config({
            driver: localforage.IndexedDB, // Force WebSQL; same as using setDriver()
            name: dbFileName,
            version: dbFileVersion,
            size: 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName: database, // Should be alphanumeric, with underscores.
            description: 'database'
        });

        localforage.ready().then(function () {
            
            localforage.clear().then(function() {
                callBack();
            }).catch(function() {
                callBack();
            });

        }).catch(function () {
        });
    }
}