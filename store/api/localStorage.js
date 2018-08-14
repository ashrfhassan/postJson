export default {
    saveObject: (json, dbFileName, dbFileVersion, database) => {
        //prefixes of implementation that we want to test
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        //prefixes of window.IDB objects
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

        if (!window.indexedDB) {
            console.log("Your browser doesn't support a stable version of IndexedDB.")
        }

        // created file to store databases
        var request = window.indexedDB.open(dbFileName, dbFileVersion);

        request.onerror = function (event) {
            console.log("error: ");
        };

        request.onsuccess = function (event) {
            let db = request.result;
            console.log("success: " + db);
            //some code here
            var requestTransaction = db.transaction([database], "readwrite")
                .objectStore(database)
                .add(json);

            requestTransaction.onsuccess = function (event) {
                console.log("New Row has been added to your database.");
            };

            requestTransaction.onerror = function (event) {
                console.log("Unable to add data\r\n that aready exist in your database! ");
            }
            db.close();
            // created database object to store
            request.onupgradeneeded = function (event) {
                var db = event.target.result;
                db.createObjectStore(database, { autoIncrement: true });
            }
        }
    },
    retrieveDB: (dbFileName, dbFileVersion, database) => {
        //prefixes of implementation that we want to test
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        //prefixes of window.IDB objects
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

        if (!window.indexedDB) {
            console.log("Your browser doesn't support a stable version of IndexedDB.");
        }

        // created file to store databases
        var request = window.indexedDB.open(dbFileName, dbFileVersion);

        request.onerror = function (event) {
            console.log("error: ");
        };

        request.onsuccess = function (event) {
            let db = request.result;
            console.log("success: " + db);
            //some code here
            var objectStore = db.transaction([database]).objectStore(database);

            objectStore.openCursor().onsuccess = function (event) {

                var cursor = event.target.result;

                if (cursor) {
                    cursor.continue();
                }
                else {
                    console.log("No more history entries!");
                }

            }

            objectStore.transaction.oncomplete = function (event) {
                // Store values in the newly created objectStore.

            }
            db.close();

            // created database object to store
            request.onupgradeneeded = function (event) {
                var db = event.target.result;
                db.createObjectStore(database, { autoIncrement: true });
            }
        }
    },
    retrieveDBObject: (dbFileName, dbFileVersion, database, key) => {
        //prefixes of implementation that we want to test
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        //prefixes of window.IDB objects
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

        if (!window.indexedDB) {
            console.log("Your browser doesn't support a stable version of IndexedDB.");
        }

        // created file to store databases
        var request = window.indexedDB.open(dbFileName, dbFileVersion);

        request.onerror = function (event) {
            console.log("error: ");
        };

        request.onsuccess = function (event) {
            let db = request.result;
            console.log("success: " + db);
            //some code here
            var transaction = db.transaction([database]);
            var objectStore = transaction.objectStore(database);
            var record = objectStore.get(parseInt(key));
            record.onerror = function (event) {
                console.log("Unable to retrieve data from database!");
            };

            record.onsuccess = function (event) {
                // Do something with the request.result!
                if (record.result) {

                }
                else {
                    console.log("couldn't be found in your database!");
                }
            };

            objectStore.transaction.oncomplete = function (event) {
                // Store values in the newly created objectStore.

            };
            db.close();
        }

        // created database object to store
        request.onupgradeneeded = function (event) {
            let db = event.target.result;
            db.createObjectStore(database, { autoIncrement: true });
        }
    },
    deleteDBObject: (dbFileName, dbFileVersion, database, key) => {
        //prefixes of implementation that we want to test
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        //prefixes of window.IDB objects
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

        if (!window.indexedDB) {
            console.log("Your browser doesn't support a stable version of IndexedDB.");
        }

        // created file to store databases
        var request = window.indexedDB.open(dbFileName, dbFileVersion);

        request.onerror = function (event) {
            console.log("error: ");
        };

        request.onsuccess = function (event) {
            let db = request.result;
            console.log("success: " + db);
            //some code here
            var requestTransaction = db.transaction([database], "readwrite")
                .objectStore(database)
                .delete(parseInt(key));

            requestTransaction.onsuccess = function (event) {
                console.log("Your entry has been removed from your database.");
            };

            requestTransaction.onerror = function (event) {
                console.log("Unable to remove data from your database! ");
            }
            db.close();
        }

        // created database object to store
        request.onupgradeneeded = function (event) {
            var db = event.target.result;
            db.createObjectStore(database, { autoIncrement: true });
        }
    },
    deleteDB: (dbFileName) => {
        //prefixes of implementation that we want to test
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        //prefixes of window.IDB objects
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

        if (!window.indexedDB) {
            console.log("Your browser doesn't support a stable version of IndexedDB.")
        }

        var req = indexedDB.deleteDatabase(dbFileName);
        req.onsuccess = function () {
            console.log("Deleted database successfully");
        };
        req.onerror = function () {
            console.log("Couldn't delete database");
        };
        req.onblocked = function () {
            console.log("Couldn't delete database due to the operation being blocked");
        };
    },
    clearDatabase: (dbFileName) => {
        //prefixes of implementation that we want to test
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        //prefixes of window.IDB objects
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

        if (!window.indexedDB) {
            console.log("Your browser doesn't support a stable version of IndexedDB.")
        }
        // created file to store databases
        var request = window.indexedDB.open(dbFileName, dbFileVersion);

        request.onerror = function (event) {
            console.log("error: ");
        };
        request.onsuccess = function (event) {
            let db = request.result;
            console.log("success: " + db);
            //some code here
            var requestToClear = db.transaction([dbFileName], "readwrite")
                .objectStore(dbFileName).clear();
            requestToClear.onsuccess = function (event) {
                // report the success of our clear operation
            };
            db.close();
        }
    }
}