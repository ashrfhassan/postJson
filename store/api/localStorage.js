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
        }).catch(function (e) {
            errorCallBack();
            console.log(e);
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
            localforage.iterate(function(value, key, iterationNumber) {
                keys.push(key);
                values.push(value);
                successCallBack(keys, values);
                console.log([key, value]);
            }).then(function() {
                errorCallBack();
                console.log('Iteration has completed');
            }).catch(function(err) {
                console.log(err);
            });

        }).catch(function (e) {
            console.log(e);
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
                console.log(value);
            }).catch(function(err) {
                errorCallBack();
                console.log(err);
            });

        }).catch(function (e) {
            console.log(e);
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
                console.log('Key is cleared!');
            }).catch(function(err) {
                errorCallBack();
                console.log(err);
            });

        }).catch(function (e) {
            console.log(e);
        });

    },
    clearDB: (dbFileName, callBack) => {
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
                successCallBack();
                console.log('Database is now empty.');
            }).catch(function(err) {
                errorCallBack();
                console.log(err);
            });

        }).catch(function (e) {
            console.log(e);
        });
    }
}