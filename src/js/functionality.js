String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + 1);
}

String.prototype.removePart = function (startIndex, endIndex) {
    return this.substr(0, startIndex) + this.substr(endIndex + 1);
}

String.prototype.isNumeric = function () {
    var strLength = this.length;
    var numbers = ['-', '+', '"', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (var i = 0; i < strLength; i++) {
        var char = this.charAt(i);
        if (jQuery.inArray(char, numbers) === -1) {
            return false;
        }
    }
    return true;
}

String.prototype.isDouble = function () {
    if (this.indexOf('.') == -1) {
        return false
    }
    return true;
}

String.prototype.isNumberDouble = function () {
    var origin = this;
    var floor = Math.floor(this);
    if (origin == floor) {
        return false;
    }
    return true;
}

function fetechFirstCell(arr) {
    if (arr.constructor.name == "Array") {
        var length = arr.length;
        for (var x = 1; x < length; x++) {
            arr.pop();
        }
    } else {
        $.each(arr, function (key, value) {
            if (value != null && value != "null") {
                if (value.constructor.name == "Array") {
                    var length = value.length;
                    if(length > 1) {
                        for (var x = 1; x < length; x++) {
                            value.pop();
                        }
                    }
                    if(length > 0) {
                        if (value[0].constructor.name == "Object")
                            fetechFirstCell(value[0]);
                    }
                }
            }
        });
    }
}

if (!library)
    var library = {};
library.json = {
    replacer: function (match, pIndent, pKey, pVal, pEnd) {
        var key = '<span class=json-key>';
        var val = '<span class=json-value>';
        var str = '<span class=json-string>';
        var r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        if (pVal)
            r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
        return r + (pEnd || '');
    },
    prettyPrint: function (obj) {
        var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        var arrLength = [];
        var indexsOfBrackets = [];
        var indexOfBracket = 0;
        var objStringfy = JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, library.json.replacer);
        if (obj.constructor.name == "Array") {
            arrLength.push(obj.length);
            indexOfBracket = objStringfy.indexOf('[', indexOfBracket);
            indexsOfBrackets.push(indexOfBracket);
            indexOfBracket += 1;
        } else {
            $.each(obj, function (key, value) {
                if (value != null && value != "null") {
                    if (value.constructor.name == "Array") {
                        arrLength.push(value.length);
                        indexOfBracket = objStringfy.indexOf('[', indexOfBracket);
                        indexsOfBrackets.push(indexOfBracket);
                        indexOfBracket += 1;
                    }
                }
            });
        }
        for (i = 0; i < arrLength.length; i++) {
            objStringfy = objStringfy.replaceAt(indexsOfBrackets[i], "array(" + arrLength[i] + ") [ ");
        }
        return objStringfy;
    },
    typeReplacer: function (match, pIndent, pKey, pVal, pEnd) {
        var key = '<span class=json-key>';
        var val = '<span class=json-value>';
        var str = '<span class=json-string>';
        var r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        if (pVal) {
            if (pVal[0] == '"') {
                if (pVal.isNumeric()) {
                    if (pVal.isDouble())
                        r = r + val + "Double" + '</span>';
                    else
                        r = r + val + "Integer" + '</span>';
                } else {
                    r = r + str + "String" + '</span>';
                }
            } else if (pVal[0] == '{') {
                r = r + str + library.json.typePrettyPrint(JSON.parse(pVal)) + '</span>';
            } else if ($.isNumeric(pVal)) {
                if (pVal.isNumberDouble())
                    r = r + val + "Double" + '</span>';
                else
                    r = r + val + "Integer" + '</span>';
            } else {
                r = r + val + "boolean" + '</span>';
            }
        }
        return r + (pEnd || '');
    },
    typePrettyPrint: function (obj) {
        fetechFirstCell(obj);
        var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        var objStringfy = JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, library.json.typeReplacer);

        return objStringfy;
    },
    replacerToString: function (match, pIndent, pKey, pVal, pEnd) {
        var key = '<span class=json-key>';
        var val = '<span class=json-value>';
        var str = '<span class=json-string>';
        var r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(':', '') + '</span>: ';
        if (pVal)
            r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
        return r + (pEnd || '');
    },
    prettyPrintToString: function (obj) {
        var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        var objStringfy = JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, library.json.replacerToString);

        return objStringfy;
    },
};

//------------------------------- operations ----------------------
var dbFileName = "requestsDatabase";
var dbFileVersion = 1;
var historyDatabase = "history";
var projectsDatabase = "projects";
var db;
var lastOutPut = "";

function send() {

    var getURL = $('#mainurl').val();
    if (getURL == "") {
        UIkit.modal.alert('Enter Request URL First!').then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
        return false;
    }
    var ajaxStart = new Date().getTime();
    $(".ld-ring").removeAttr("hidden");

    if ($("#getrequest").prop('checked')) {

        //Get Request
        $.ajax({
            type: "GET",
            url: getURL,
            datatype: "jsonp",
            crossDomain: true,
            beforeSend: function setHeader(httpReq) {
                httpReq.setRequestHeader('accept', 'application/json');
                httpReq.setRequestHeader('Accept-Language', 'en-US,en;q=0.8');
            },
            success: function (response, status, xhr) {
                // display output
                $(".ld-ring").attr("hidden", "hidden");
                var jsonForm = response;
                var iframe = document.getElementById('preview-row');
                var frameDoc = iframe.document;
                if (iframe.contentWindow)
                    frameDoc = iframe.contentWindow.document; // IE
                // Write into iframe
                frameDoc.open();
                if (typeof response != 'string') {
                    var jsonFormString = JSON.stringify(jsonForm);
                    jsonFormString = getRemovedHTMLScript(jsonFormString);
                    frameDoc.writeln(jsonFormString);
                } else {
                    var jsonFormString = jsonForm;
                    jsonFormString = getRemovedHTMLScript(jsonFormString);
                    frameDoc.writeln(jsonFormString);
                }
                frameDoc.close();
                preventIframeEvents();
                if (typeof response != 'string') {
                    $('#mainoutput').html(library.json.prettyPrint(jsonForm));
                } else {
                    response = response.trim();
                    if (response.charAt(0) == '{') {
                        var jsonForm = JSON.parse(response);
                        $('#mainoutput').html(library.json.prettyPrint(jsonForm));
                    } else {
                        if (response.indexOf("<html") != -1) {
                            $('#mainoutput').html('<XMP>' + jsonForm + '</XMP>');
                        } else {
                            $('#mainoutput').html(jsonForm);
                        }
                    }
                }
                lastOutPut = jsonForm;
                //saving request
                var indexbackslash = getURL.lastIndexOf('/');
                var name = getURL.substring(indexbackslash + 1);
                var json = {
                    name: name,
                    url: getURL,
                    input: "",
                    output: lastOutPut,
                    type: "get",
                    date: getTodayDate(),
                    time: getTimeNow()
                };
                if (typeof jsonForm != 'string')
                    saveHistoryRequest(json);
                //response size
                var respSize = xhr.getResponseHeader('Content-Length');// with bytes
                $('#number-code-status').text(Math.round((respSize / 1024) * 100) / 100 + " kbytes");
                //calculate time of request
                if ($('#mainoutput').html() != "" && typeof jsonForm != 'string') {
                    $('#save_api').removeAttr("disabled");
                }
                var ajaxEnd = new Date().getTime() - ajaxStart;
                if (ajaxEnd <= 20000) {
                    $('#main_ms_card').css({"color": "green"});
                } else if (ajaxEnd > 20000 && ajaxEnd <= 40000) {
                    $('#main_ms_card').css({"color": "orange"});
                } else {
                    $('#main_ms_card').css({"color": "red"});
                }
                $('#main_ms_number').html(ajaxEnd);
            },
            error: function (response, textstatus) {
                $(".ld-ring").attr("hidden", "hidden");
                if (response["readyState"] == 4) {
                    var textResponse = response["responseText"];
                    var iframe = document.getElementById('preview-row');
                    var frameDoc = iframe.document;
                    if (iframe.contentWindow)
                        frameDoc = iframe.contentWindow.document; // IE
                    // Write into iframe
                    frameDoc.open();
                    var jsonFormString = textResponse;
                    jsonFormString = getRemovedHTMLScript(jsonFormString);
                    frameDoc.writeln(jsonFormString);
                    frameDoc.close();
                    if (textResponse != "") {
                        if (response["status"] == 405) {
                            $('#mainoutput').html('<XMP>' + textResponse + '</XMP>');
                        } else {
                            $('#mainoutput').html(textResponse);
                        }
                    } else {
                        $('#mainoutput').html(
                            '<div class="row">' +
                            '<div class="col-md-12 col-sm-12 col-xs-12">' +
                            '<img style="width: 120px; height: 120px" src="design/images/empty.png">' +
                            '</div>' +
                            '</div>' +
                            '<div class="row">' +
                            '<div class="col-md-12 col-sm-12 col-xs-12" style="color:#db4437;>' +
                            '<h6 style="color:#db4437 ">Response Was Empty</h6>' +
                            '</div>' +
                            '</div>');
                    }
                } else if (response["readyState"] == 0) {
                    $('#mainoutput').html(
                        '<div class="row">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<h4 style="font-weight: bold; color:#db4437 ">The requested URL cant be reached</h4>' +
                        '<h6 style="color:#db4437 ">The service refused to connect.</h6>' +
                        '<h6 style="color:#db4437 ">Please, check if:</h6>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-md-2 col-sm-2 col-xs-2">' +
                        '<img class="uk-float-left" style="width: 120px; height: 120px" src="design/images/empty.png">' +
                        '</div>' +
                        '<div class="col-md-10 col-sm-10 col-xs-10" style="color:#db4437;>' +
                        '<ul class="uk-float-left" style="text-align: left">' +
                        '<li>you and remote machine are connected to the internet,</li>' +
                        '<li>all required services (like www) are up and running on server</li>' +
                        '<li>port number is correct</li>' +
                        '<li>url is correct</li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<h6 style="color:#db4437 ">Search Google for : <a href="https://www.google.com.eg/search?q=chrome+network+error+102&gws_rd=cr&ei=NppVWYKgNsymaPK_q7AF">chrome network error 102</a></h6>' +
                        '</div>' +
                        '</div>'
                    );
                }

                if (textstatus === "timeout") {
                    $('#mainoutput').html('<h4 style="color:red;">TimeOut</h4><img style="width: 100%; height: 300px" src="design/images/empty.png">');
                }

                $('#save_api').attr("disabled", "disabled");
                //calculate size
                var respSize = response.getResponseHeader('content-length');// with bytes
                $('#number-code-status').text(Math.round((respSize / 1024) * 100) / 100 + " kbytes");
                var ajaxEnd = new Date().getTime() - ajaxStart;
                if (ajaxEnd <= 20000) {
                    $('#main_ms_card').css({"color": "green"});
                } else if (ajaxEnd > 20000 && ajaxEnd <= 40000) {
                    $('#main_ms_card').css({"color": "orange"});
                } else {
                    $('#main_ms_card').css({"color": "red"});
                }
                $('#main_ms_number').html(ajaxEnd);
            },
            timeout: 1000 * 60 * 3, // sets timeout to 3 minutes
            statusCode: {
                200: function () {
                    $('#code-status-card').text('200 OK');
                    $('#code-status-card').css("background-color", "green");
                    console.log("success");
                },
                404: function () {
                    $('#code-status-card').text('404');
                    $('#code-status-card').css("background-color", "orange");
                    $('#mainoutput').html('<div class="row">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<img style="width: 120px; height: 120px" src="design/images/Error-404.png">' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12" style="color:#db4437;>' +
                        '<h6 style="color:#db4437 ">Response Was Empty</h6>' +
                        '</div>' +
                        '</div>');
                    console.log("page not found");
                },
                500: function () {
                    $('#code-status-card').text('500');
                    $('#code-status-card').css("background-color", "red");
                    $('#mainoutput').html(
                        '<div class="row">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<img style="width: 120px; height: 120px" src="design/images/empty.png">' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12" style="color:#db4437;>' +
                        '<h6 style="color:#db4437 ">Exception Error (500)</h6>' +
                        '</div>' +
                        '</div>');
                    console.log(" 500 data still loading");
                },
                405: function () {
                    $('#code-status-card').text('405');
                    $('#code-status-card').css("background-color", "orange");
                    console.log(" 405 data still loading");
                }
            }
        });

    }
    else if ($("#postrequest").prop('checked')) {
        var postURL = $('#mainurl').val();
        var postJson = $('#inputjson').val();

        //Post Request
        $.ajax({
            type: "POST",
            url: postURL,
            data: postJson,
            datatype: "jsonp",
            crossDomain: true,
            beforeSend: function setHeader(httpReq) {
                httpReq.setRequestHeader('accept', 'application/json');
                httpReq.setRequestHeader('Accept-Language', 'en-US,en;q=0.8');
                httpReq.setRequestHeader('content-type', 'application/json');
            },
            success: function (response, status, xhr) {
                $(".ld-ring").attr("hidden", "hidden");

                var jsonForm = response;
                var iframe = document.getElementById('preview-row');
                var frameDoc = iframe.document;
                if (iframe.contentWindow)
                    frameDoc = iframe.contentWindow.document; // IE
                // Write into iframe
                frameDoc.open();
                if (typeof response != 'string') {
                    var jsonFormString = JSON.stringify(jsonForm);
                    jsonFormString = getRemovedHTMLScript(jsonFormString);
                    frameDoc.writeln(jsonFormString);
                } else {
                    var jsonFormString = jsonForm;
                    jsonFormString = getRemovedHTMLScript(jsonFormString);
                    frameDoc.writeln(jsonFormString);
                }
                frameDoc.close();
                preventIframeEvents();
                if (typeof response != 'string') {
                    $('#mainoutput').html(library.json.prettyPrint(jsonForm));
                } else {
                    response = response.trim();
                    if (response.charAt(0) == '{') {
                        var jsonForm = JSON.parse(response);
                        $('#mainoutput').html(library.json.prettyPrint(jsonForm));
                    } else {
                        if (response.indexOf("<html") != -1) {
                            $('#mainoutput').html('<XMP>' + jsonForm + '</XMP>');
                        } else {
                            $('#mainoutput').html(jsonForm);
                        }
                    }
                }
                lastOutPut = jsonForm;
                //saving request
                var indexbackslash = postURL.lastIndexOf('/');
                var name = postURL.substring(indexbackslash + 1);
                var json = {
                    name: name,
                    url: postURL,
                    input: JSON.parse(postJson),
                    output: lastOutPut,
                    type: "post",
                    date: getTodayDate(),
                    time: getTimeNow()
                };
                if (typeof jsonForm != 'string')
                    saveHistoryRequest(json);
                //response size
                var respSize = xhr.getResponseHeader('content-length');// with bytes
                $('#number-code-status').text(Math.round((respSize / 1024) * 100) / 100 + " kbytes");
                //calculate time of request
                if ($('#mainoutput').html() != "" && typeof jsonForm != 'string') {
                    $('#save_api').removeAttr("disabled");
                }
                var ajaxEnd = new Date().getTime() - ajaxStart;
                if (ajaxEnd <= 20000) {
                    $('#main_ms_card').css({"color": "green"});
                } else if (ajaxEnd > 20000 && ajaxEnd <= 40000) {
                    $('#main_ms_card').css({"color": "orange"});
                } else {
                    $('#main_ms_card').css({"color": "red"});
                }
                $('#main_ms_number').html(ajaxEnd);
            },
            error: function (response, textstatus) {
                $(".ld-ring").attr("hidden", "hidden");

                if (response["readyState"] == 4) {
                    var textResponse = response["responseText"];
                    var iframe = document.getElementById('preview-row');
                    var frameDoc = iframe.document;
                    if (iframe.contentWindow)
                        frameDoc = iframe.contentWindow.document; // IE
                    // Write into iframe
                    frameDoc.open();
                    var jsonFormString = textResponse;
                    jsonFormString = getRemovedHTMLScript(jsonFormString);
                    frameDoc.writeln(jsonFormString);
                    frameDoc.close();
                    if (textResponse != "") {
                        if (response["status"] == 405) {
                            $('#mainoutput').html('<XMP>' + textResponse + '</XMP>');
                        } else {
                            $('#mainoutput').html(textResponse);
                        }
                    } else {
                        $('#mainoutput').html(
                            '<div class="row">' +
                            '<div class="col-md-12 col-sm-12 col-xs-12">' +
                            '<img style="width: 120px; height: 120px" src="design/images/empty.png">' +
                            '</div>' +
                            '</div>' +
                            '<div class="row">' +
                            '<div class="col-md-12 col-sm-12 col-xs-12" style="color:#db4437;>' +
                            '<h6 style="color:#db4437 ">Response Was Empty</h6>' +
                            '</div>' +
                            '</div>');
                    }
                } else if (response["readyState"] == 0) {
                    $('#mainoutput').html(
                        '<div class="row">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<h4 style="font-weight: bold; color:#db4437 ">The requested URL cant be reached</h4>' +
                        '<h6 style="color:#db4437 ">The service refused to connect.</h6>' +
                        '<h6 style="color:#db4437 ">Please, check if:</h6>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-md-2 col-sm-2 col-xs-2">' +
                        '<img class="uk-float-left" style="width: 120px; height: 120px" src="design/images/empty.png">' +
                        '</div>' +
                        '<div class="col-md-10 col-sm-10 col-xs-10" style="color:#db4437;>' +
                        '<ul class="uk-float-left" style="text-align: left">' +
                        '<li>you and remote machine are connected to the internet,</li>' +
                        '<li>all required services (like www) are up and running on server</li>' +
                        '<li>port number is correct</li>' +
                        '<li>url is correct</li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<h6 style="color:#db4437 ">Search Google for : <a href="https://www.google.com.eg/search?q=chrome+network+error+102&gws_rd=cr&ei=NppVWYKgNsymaPK_q7AF">chrome network error 102</a></h6>' +
                        '</div>' +
                        '</div>'
                    );
                }

                if (textstatus === "timeout") {
                    $('#mainoutput').html('<h4 style="color:red;">TimeOut</h4><img style="width: 100%; height: 300px" src="design/images/empty.png">');
                }

                $('#save_api').attr("disabled", "disabled");
                //calculate size
                var respSize = response.getResponseHeader('content-length');// with bytes
                $('#number-code-status').text(Math.round((respSize / 1024) * 100) / 100 + " kbytes");
                var ajaxEnd = new Date().getTime() - ajaxStart;
                if (ajaxEnd <= 20000) {
                    $('#main_ms_card').css({"color": "green"});
                } else if (ajaxEnd > 20000 && ajaxEnd <= 40000) {
                    $('#main_ms_card').css({"color": "orange"});
                } else {
                    $('#main_ms_card').css({"color": "red"});
                }
                $('#main_ms_number').html(ajaxEnd);
            },
            timeout: 1000 * 60 * 3, // sets timeout to 3 minutes
            statusCode: {
                200: function () {
                    $('#code-status-card').text('200 OK');
                    $('#code-status-card').css("background-color", "green");
                    console.log("success");
                },
                404: function () {
                    $('#code-status-card').text('404');
                    $('#code-status-card').css("background-color", "orange");
                    $('#mainoutput').html('<div class="row">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<img style="width: 120px; height: 120px" src="design/images/Error-404.png">' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12" style="color:#db4437;>' +
                        '<h6 style="color:#db4437 ">Response Was Empty</h6>' +
                        '</div>' +
                        '</div>');
                    console.log("page not found");
                },
                500: function () {
                    $('#code-status-card').text('500');
                    $('#code-status-card').css("background-color", "red");
                    $('#mainoutput').html(
                        '<div class="row">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<img style="width: 120px; height: 120px" src="design/images/empty.png">' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12" style="color:#db4437;>' +
                        '<h6 style="color:#db4437 ">Exception Error (500)</h6>' +
                        '</div>' +
                        '</div>');
                    console.log(" 500 data still loading");
                },
                405: function () {
                    $('#code-status-card').text('405');
                    $('#code-status-card').css("background-color", "orange");
                    console.log(" 405 data still loading");
                }
            }
        });

    }
}

function saveHistoryRequest(json) {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here
        var requestTransaction = db.transaction([historyDatabase], "readwrite")
            .objectStore(historyDatabase)
            .add(json);

        requestTransaction.onsuccess = function (event) {
            appendHistoryRequestAfterSave();
            console.log("New Row has been added to your database.");
        };

        requestTransaction.onerror = function (event) {
            console.log("Unable to add data\r\n that aready exist in your database! ");
        }
        db.close();

    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function retrieveHistoryAllRequest() {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here
        var objectStore = db.transaction([historyDatabase]).objectStore(historyDatabase);

        objectStore.openCursor().onsuccess = function (event) {

            var cursor = event.target.result;

            if (cursor) {
                var key = cursor.key;
                var name = cursor.value.name;
                var url = cursor.value.url;
                var input = cursor.value.input;
                var output = cursor.value.output;
                var type = cursor.value.type;
                var date = cursor.value.date;
                var time = cursor.value.time;
                $('#historytab').prepend("<li >" +
                    "<div class='container-fluid'>" +
                    "<div class='row'>" +
                    "<div class='col-md-10 col-sm-10 col-xs-10'><a  href='#' class='uk-link-reset uk-float-left' request-key='" + key + "' data-popup-open='popup-2'><p>" + name + "</p></a></div>" +
                    "<div class='col-md-2 col-sm-2 col-xs-2' style='margin-top: 6px'><a href='#' class='uk-link-reset uk-float-right'><span request-key='" + key + "' class='fa fa-close' ></span></a></div>" +
                    "</div>" +
                    "</div>" +
                    "</li>");
                cursor.continue();
            }
            else {
                console.log("No more history entries!");
            }

        }

        objectStore.transaction.oncomplete = function (event) {
            // Store values in the newly created objectStore.
            onReady();
            onDocReady();
        };
        db.close();

    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function retrieveHistoryRequest(requestKey) {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here
        var transaction = db.transaction([historyDatabase]);
        var objectStore = transaction.objectStore(historyDatabase);
        var record = objectStore.get(parseInt(requestKey));
        record.onerror = function (event) {
            console.log("Unable to retrieve data from database!");
        };

        record.onsuccess = function (event) {
            // Do something with the request.result!
            if (record.result) {
                var apiName = record.result.name;
                var dateTime = record.result.date + "&nbsp;&nbsp;&nbsp;" + record.result.time;
                var url = record.result.url;
                var type = record.result.type;
                var input = record.result.input;
                var output = record.result.output;

                $('#api-name').html(apiName);
                $('#request-key').val(requestKey);
                $('#api-datetime').html(dateTime);
                $('#api-name2').html(apiName);
                if (type == "get") {
                    $('#api-post-structure').html('<center style="color: #116d2a;font-size:large;font-weight:bolder;">Get Request</center>');
                    $('#api-ex-input').html('<center style="color: #116d2a;font-size:large;font-weight:bolder;">Get Request</center>');
                } else if (type == "post") {
                    $('#api-post-structure').html(library.json.typePrettyPrint(input));
                    $('#api-ex-input').html(library.json.prettyPrintToString(input));
                }
                $('#api-output-structure').html(library.json.typePrettyPrint(output));
                $('#api-ex-url').html(url);
            }
            else {
                console.log("couldn't be found in your database!");
            }
        };

        objectStore.transaction.oncomplete = function (event) {
            // Store values in the newly created objectStore.

        };
        db.close();

    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function removeHistoryRequest(requestKey) {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here
        var requestTransaction = db.transaction([historyDatabase], "readwrite")
            .objectStore(historyDatabase)
            .delete(parseInt(requestKey));

        requestTransaction.onsuccess = function (event) {
            console.log("Your entry has been removed from your database.");
        };

        requestTransaction.onerror = function (event) {
            console.log("Unable to remove data from your database! ");
        }
        db.close();

    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function saveProjectRequest(json) {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here
        var requestTransaction = db.transaction([projectsDatabase], "readwrite")
            .objectStore(projectsDatabase)
            .add(json);

        requestTransaction.onsuccess = function (event) {
            appendProjectRequestAfterSave(json.projectname);
            console.log("New Row has been added to your database.");
        };

        requestTransaction.onerror = function (event) {
            console.log("Unable to add data\r\n that aready exist in your database! ");
        }
        db.close();

    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function retrieveProjectAllRequest() {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here
        var objectStore = db.transaction([projectsDatabase]).objectStore(projectsDatabase);
        var projectsData = [];

        objectStore.openCursor().onsuccess = function (event) {

            var cursor = event.target.result;
            if (cursor) {
                var key = cursor.key;
                var name = cursor.value.name;
                var url = cursor.value.url;
                var input = cursor.value.input;
                var output = cursor.value.output;
                var type = cursor.value.type;
                var date = cursor.value.date;
                var time = cursor.value.time;
                var projectname = cursor.value.projectname;
                if (typeof projectsData[projectname] === 'undefined') {
                    // does not exist
                    projectsData[projectname] = [];
                    projectsData[projectname].push({
                        key: key,
                        name: name,
                        url: url,
                        input: input,
                        output: output,
                        type: type,
                        date: date,
                        time: time
                    });
                }
                else {
                    // does exist
                    projectsData[projectname].push({
                        key: key,
                        name: name,
                        url: url,
                        input: input,
                        output: output,
                        type: type,
                        date: date,
                        time: time
                    });
                }
                cursor.continue();
            }
            else {
                console.log("No more project entries!");
            }

        }

        objectStore.transaction.oncomplete = function (event) {
            // Store values in the newly created objectStore.
            for (var projectname in projectsData) {
                var trimProjectName = projectname.replace(/\s/g, '');

                var projectElementNode = '<div class="panel panel-default" >' +
                    '<h4 class="panel-title">' +
                    '<div class="row">' +
                    '<div class="col-md-4 col-sm-4 col-xs-4">' +
                    '<span class="fa fa-file uk-float-left" title="Generate Doc" uk-tooltip="pos: bottom"></span><span  class="fa fa-bookmark uk-float-left" style="margin-left: 30%;" title="Export" uk-tooltip="pos: bottom"></span>' +
                    '</div>' +
                    '<div class="col-md-4 col-sm-4 col-xs-4">' +
                    '<a class="projectName" data-toggle="collapse" data-parent="#accordion" href="#project' + trimProjectName + '">' + projectname + '</a>' +
                    '</div>' +
                    '<div class="col-md-4 col-sm-4 col-xs-4">' +
                    '<span class="fa fa-close uk-float-right" title="Delete Project" uk-tooltip="pos: bottom"></span>' +
                    '</div>' +
                    '</div>' +
                    '</h4>' +
                    '<div id="project' + trimProjectName + '" class="panel-collapse collapse out">' +
                    '<div class="panel-body">' +
                    '<table id="table' + projectname + '" class="table">';
                for (var i = 0; i < projectsData[projectname].length; i++) {
                    var requestData = projectsData[projectname][i];
                    var requestNode = '<tr>' +
                        '<td>' +
                        '<div class="col-md-10 col-sm-10 col-xs-10"><a  href="#" request-key="' + requestData["key"] + '" class="uk-link-reset uk-float-left" data-popup-open="popup-2"><p>' + requestData["name"] + '</p></a></div>' +
                        '<div class="col-md-2 col-sm-2 col-xs-2" style="margin-top: 6px"><a href="#" class="uk-link-reset uk-float-right"><span request-key="' + requestData["key"] + '" class="fa fa-close" ></span></a></div>' +
                        '</td>' +
                        '</tr>';
                    projectElementNode += requestNode;
                }
                var projectElementNodeFooter = '</table>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                projectElementNode += projectElementNodeFooter;
                $('#accordion').append(projectElementNode);
                $('#accordion').append('<hr class="uk-divider-icon">');
                $('#project-selector').append('<option value ="' + projectname + '">' + projectname + '</option>');
            }
            (function () {
                [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function (el) {
                    new SelectFx(el);
                });
            })();
            if ($('div.cs-select').length > 1) {
                var section = $('div.cs-select').eq(0).closest('section');
                var newSelector = $('div.cs-select').eq(1);
                $(section).prepend(newSelector);
                $('div.cs-select').eq(1).remove();
            }
            onReady();
            onDocReady();

            $('#accordion').find('div.panel-default').each(function () {
                $(this).find('span.fa-file').on("click", function () {
                    var projectPanel = $(this).closest('.panel-default');
                    generateFullDocument(projectPanel);
                });
                $(this).find('span.fa-bookmark').on("click", function () {
                    var projectPanel = $(this).closest('.panel-default');
                    var requestsCount = $(projectPanel).find('.fa-close').length;
                    exportProject(projectPanel, requestsCount - 1);
                });
            });
        };
        db.close();

    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function retrieveProjectRequest(requestKey) {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here
        var transaction = db.transaction([projectsDatabase]);
        var objectStore = transaction.objectStore(projectsDatabase);
        var record = objectStore.get(parseInt(requestKey));

        record.onerror = function (event) {
            console.log("Unable to retrieve daa from database!");
        };

        record.onsuccess = function (event) {
            // Do something with the request.result!
            if (record.result) {
                var apiName = record.result.name;
                var dateTime = record.result.date + "&nbsp;&nbsp;&nbsp;" + record.result.time;
                var url = record.result.url;
                var type = record.result.type;
                var input = record.result.input;
                var output = record.result.output;
                $('#api-name').html(apiName);
                $('#request-key').val(requestKey);
                $('#api-datetime').html(dateTime);
                $('#api-name2').html(apiName);
                if (type == "get") {
                    $('#api-post-structure').html('<center style="color: #116d2a;font-size:large;font-weight:bolder;margin-top: 5%">Get Request</center>');
                    $('#api-ex-input').html('<center style="color: #116d2a;font-size:large;font-weight:bolder;margin-top: 5%">Get Request</center>');
                } else if (type == "post") {
                    $('#api-post-structure').html(library.json.typePrettyPrint(input));
                    $('#api-ex-input').html(library.json.prettyPrintToString(input));
                }
                $('#api-output-structure').html(library.json.typePrettyPrint(output));
                $('#api-ex-url').html(url);
            }
            else {
                console.log("couldn't be found in your database!");
            }
        };

        objectStore.transaction.oncomplete = function (event) {
            // Store values in the newly created objectStore.

        };
        db.close();

    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function removeProjectRequest(requestKey) {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here
        var requestTransaction = db.transaction([projectsDatabase], "readwrite")
            .objectStore(projectsDatabase)
            .delete(parseInt(requestKey));

        requestTransaction.onsuccess = function (event) {
            console.log("Your entry has been removed from your database.");
        };

        requestTransaction.onerror = function (event) {
            console.log("Unable to remove data from your database! ");
        }
        db.close();

    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function deleteProject(objectStoreName) {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here
        db.deleteObjectStore(objectStoreName);
        db.close();

    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function checkProjectNameExists(projectName, json) {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }

    var request = window.indexedDB.open(dbFileName, dbFileVersion);
    request.onsuccess = function (event) {
        db = request.result;
        var objectStore = db.transaction([projectsDatabase]).objectStore(projectsDatabase);
        var exists = 0;
        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                var projectname = cursor.value.projectname;
                if (projectname.toUpperCase() == projectName.toUpperCase()) {
                    exists = 1;
                    db.close();
                }
                cursor.continue();
            }
            else {
                console.log("No more project entries!");
                db.close();
            }
        }

        objectStore.transaction.oncomplete = function (event) {
            if (exists == 0) {
                if (!$('#table' + json.projectname).length) {
                    var projectname = json.projectname;
                    var projectElementNode = '<div class="panel panel-default" >' +
                        '<h4 class="panel-title">' +
                        '<div class="row">' +
                        '<div class="col-md-4 col-sm-4 col-xs-4">' +
                        '<span class="fa fa-file uk-float-left" title="Generate Doc" uk-tooltip="pos: bottom"></span><span  class="fa fa-bookmark uk-float-left" style="margin-left: 30%;" title="Export" uk-tooltip="pos: bottom"></span>' +
                        '</div>' +
                        '<div class="col-md-4 col-sm-4 col-xs-4">' +
                        '<a class="projectName" data-toggle="collapse" data-parent="#accordion" href="#project' + projectname + '">' + projectname + '</a>' +
                        '</div>' +
                        '<div class="col-md-4 col-sm-4 col-xs-4">' +
                        '<span class="fa fa-close uk-float-right" title="Delete Project" uk-tooltip="pos: bottom"></span>' +
                        '</div>' +
                        '</div>' +
                        '</h4>' +
                        '<div id="project' + projectname + '" class="panel-collapse collapse out">' +
                        '<div class="panel-body">' +
                        '<table id="table' + projectname + '" class="table">' +
                        '</table>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    $('#accordion').append(projectElementNode);
                    $('#accordion').append('<hr class="uk-divider-icon">');
                    var lastProject = $('#accordion').find('div.panel-default').last();
                    $(lastProject).find('span.fa-file').on("click", function () {
                        var projectPanel = $(this).closest('.panel-default');
                        generateFullDocument(projectPanel);
                    });
                    $(lastProject).find('span.fa-bookmark').on("click", function () {
                        var projectPanel = $(this).closest('.panel-default');
                        var requestsCount = $(projectPanel).find('.fa-close').length;
                        exportProject(projectPanel, requestsCount - 1);
                    });
                    $('.cs-options ul').append('<li data-option="" data-value="' + projectname + '"><span>' + projectname + '</span></li>');
                    $('#project-selector').append('<option value="' + projectname + '">' + projectname + '</option>');
                    (function () {
                        [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function (el) {
                            new SelectFx(el);
                        });
                    })();
                    var section = $('div.cs-select').eq(0).closest('section');
                    var newSelector = $('div.cs-select').eq(1);
                    $(section).prepend(newSelector);
                    $('div.cs-select').eq(1).remove();
                }
                saveProjectRequest(json);
            } else {
                UIkit.modal.alert("Project Name Already Exists").then(function () {
                    console.log('Confirmed.')
                }, function () {
                    console.log('Rejected.')
                });
            }
        }
    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function appendHistoryRequestAfterSave() {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here
        var objectStore = db.transaction([historyDatabase]).objectStore(historyDatabase);
        var requests = [];
        objectStore.openCursor().onsuccess = function (event) {

            var cursor = event.target.result;

            if (cursor) {
                var key = cursor.key;
                var name = cursor.value.name;
                var url = cursor.value.url;
                var input = cursor.value.input;
                var output = cursor.value.output;
                var type = cursor.value.type;
                var date = cursor.value.date;
                var time = cursor.value.time;
                var json = {
                    key: key,
                    name: name,
                    url: url,
                    input: input,
                    output: output,
                    type: type,
                    date: date,
                    time: time
                };
                requests.push(json);
                cursor.continue();
            }
            else {
                console.log("No more history entries!");
            }

        }

        objectStore.transaction.oncomplete = function (event) {
            // Store values in the newly created objectStore.
            var lastRequest = requests[requests.length - 1];
            var key = lastRequest.key;
            var name = lastRequest.name;
            $('#historytab').prepend("<li >" +
                "<div class='container-fluid'>" +
                "<div class='row'>" +
                "<div class='col-md-10 col-sm-10 col-xs-10'><a  href='#' class='uk-link-reset uk-float-left' request-key='" + key + "' data-popup-open='popup-2'><p>" + name + "</p></a></div>" +
                "<div class='col-md-2 col-sm-2 col-xs-2' style='margin-top: 6px'><a href='#' class='uk-link-reset uk-float-right'><span request-key='" + key + "' class='fa fa-close' ></span></a></div>" +
                "</div>" +
                "</div>" +
                "</li>");
            onReady();
            onDocReady();
        };
        db.close();

    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function appendProjectRequestAfterSave(projectName) {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here
        var objectStore = db.transaction([projectsDatabase]).objectStore(projectsDatabase);
        var projectsData = [];

        objectStore.openCursor().onsuccess = function (event) {

            var cursor = event.target.result;
            if (cursor) {
                var key = cursor.key;
                var name = cursor.value.name;
                var url = cursor.value.url;
                var input = cursor.value.input;
                var output = cursor.value.output;
                var type = cursor.value.type;
                var date = cursor.value.date;
                var time = cursor.value.time;
                var projectname = cursor.value.projectname;
                // does exist
                if (projectname == projectName)
                    projectsData.push({
                        key: key,
                        name: name,
                        url: url,
                        input: input,
                        output: output,
                        type: type,
                        date: date,
                        time: time
                    });
                cursor.continue();
            }
            else {
                console.log("No more project entries!");
            }

        }

        objectStore.transaction.oncomplete = function (event) {
            // Store values in the newly created objectStore.
            var requestData = projectsData[projectsData.length - 1];
            var requestNode = '<tr>' +
                '<td>' +
                '<div class="col-md-10 col-sm-10 col-xs-10"><a  href="#" request-key="' + requestData["key"] + '" class="uk-link-reset uk-float-left" data-popup-open="popup-2"><p>' + requestData["name"] + '</p></a></div>' +
                '<div class="col-md-2 col-sm-2 col-xs-2" style="margin-top: 6px"><a href="#" class="uk-link-reset uk-float-right"><span request-key="' + requestData["key"] + '" class="fa fa-close" ></span></a></div>' +
                '</td>' +
                '</tr>';
            $('#table' + projectName).append(requestNode);
            onReady();
            onDocReady();
        };
        db.close();

    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function getFullApiRow(name, dateTime, postStructure, outputStructure, exURL, exInput, key) {
    return '<section id="#' + key + '" class="full_api">' +
        '<div class="row text-center">' +
        '<h1 class="header-caption col-md-12 col-sm-12 col-xs-12">' + name + '</h1>' +
        '<br><br>' +
        '<p class="brief-caption  col-md-12 col-sm-12 col-xs-12">' + dateTime + '</p>' +
        '</div>' +
        '<br><br>' +
        '<div class="row row-back-color top-border left-border right-border">' +
        '<div class="col-md-3 col-sm-3 col-xs-3"><p class="margin-data">POST Parameters</p></div>' +
        '<div class="definition col-md-9 col-sm-9 col-xs-9 left-border"><pre class="margin-data">' + postStructure + '</pre></div>' +
        '</div>' +
        '<div class="row row-back-color top-border left-border right-border">' +
        '<div class="col-md-3 col-sm-3 col-xs-3"><p class="margin-data">Output Structure</p></div>' +
        '<div class="definition col-md-9 col-sm-9 col-xs-9 left-border"><pre class="margin-data">' + outputStructure + '</pre></div>' +
        '</div>' +
        '<div class="row row-back-color top-border left-border right-border bottom-border">' +
        '<div class="col-md-3 col-sm-3 col-xs-3"><p class="margin-data">Example</p></div>' +
        '<div class="col-md-9 col-sm-9 col-xs-9 left-border">' +
        '<div class="row bottom-border">' +
        '<div class="definition col-md-12 col-sm-12 col-xs-12"><p class="margin-data">' + exURL + '</p></div></div>' +
        '<div class="row"><div class="definition col-md-12 col-sm-12 col-xs-12"><p>Input :</p></div></div>' +
        '<div class="row"><div class="definition col-md-12 col-sm-12 col-xs-12 text-break"><pre class="margin-data">' + exInput + '</pre></div></div>' +
        '</div>' +
        '</div>' +
        '</section>'
        ;
}

function generateDocument(name, dateTime, postStructure, outputStructure, exURL, exInput, key) {
    return '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
        '<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />' +
        '<meta charset="UTF-8">' +
        '<title>Post Json</title>' +
        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>' +
        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"/>' +
        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>' +
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.22/css/uikit.min.css"/>' +
        '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
        '<style>' +
        'body, *{' +
        '    word-wrap: break-word;' +
        '}' +

        ' @media screen and (max-width: 767px) {' +
        'body, * {' +
        'font-size: 12px; !important;' +
        '}' +
        'h1{' +
        'font-size: 24px; !important;' +
        '}' +
        'h2{' +
        'font-size: 16px; !important;' +
        '}' +
        'h3{' +
        'font-size: 12px; !important;' +
        '}' +
        'h4{' +
        'font-size: 8px; !important;' +
        '}' +
        'h5{' +
        'font-size: 4.8px; !important;' +
        '}' +
        'h6{' +
        'font-size: 3.2px; !important;' +
        '}' +
        '}' +

        '@media (min-width: 768px) and (max-width: 991px) {' +
        'body, * {' +
        'font-size: 16px; !important;' +
        '}' +
        'h1{' +
        'font-size: 28px; !important;' +
        '}' +
        'h2{' +
        'font-size: 20px; !important;' +
        '}' +
        'h3{' +
        'font-size: 16px; !important;' +
        '}' +
        'h4{' +
        'font-size: 12px; !important;' +
        '}' +
        'h5{' +
        'font-size: 8.8px; !important;' +
        '}' +
        'h6{' +
        'font-size: 7.2px; !important;' +
        '}' +
        '}' +

        '@media (min-width: 992px) and (max-width: 1199px) {' +
        'body, * {' +
        'font-size: 20px; !important;' +
        '}' +
        'h1{' +
        'font-size: 32px; !important;' +
        '}' +
        'h2{' +
        'font-size: 24px; !important;' +
        '}' +
        'h3{' +
        'font-size: 20px; !important;' +
        '}' +
        'h4{' +
        'font-size: 16px; !important;' +
        '}' +
        'h5{' +
        'font-size: 12.8px; !important;' +
        '}' +
        'h6{' +
        'font-size: 11.2px; !important;' +
        '}' +
        '}' +

        '@media screen and (min-width: 1200px) {' +
        'body, * {' +
        'font-size: 20px;' +
        '!important;' +
        '}' +

        'h1 {' +
        'font-size: 32px;' +
        '!important;' +
        '}' +

        'h2 {' +
        'font-size: 24px;' +
        '!important;' +
        '}' +

        'h3 {' +
        'font-size: 20px;' +
        '!important;' +
        '}' +

        'h4 {' +
        'font-size: 16px;' +
        '!important;' +
        '}' +

        'h5 {' +
        'font-size: 12.8px;' +
        '!important;' +
        '}' +

        'h6 {' +
        'font-size: 11.2px;' +
        '!important;' +
        '}' +
        '}' +
        '</style>' +
        '<style>' +
        '.panel-body span{' +
        'color: #a4c2f4;' +
        '}' +
        '.panel-body p{' +
        'font-weight: bold;' +
        'color : #6699cc;' +
        '}' +
        '.panel-body p i{' +
        'color : #9999ff;' +
        '}' +
        '.header-caption{' +
        'font-weight: bold;' +
        'color: #006699;' +
        '}' +
        '.brief-caption{' +
        'color: #8d8d8d;' +
        '}' +
        '.left-border{' +
        'border-left: solid 5px;' +
        'border-color: #009999;' +
        '}' +
        '.right-border{' +
        'border-right: solid 5px;' +
        'border-color: #009999;' +
        '}' +
        '.top-border{' +
        'border-top: solid 5px;' +
        'border-color: #009999;' +
        '}' +
        '.bottom-border{' +
        'border-bottom: solid 5px;' +
        'border-color: #009999;' +
        '}' +

        '.margin-data{' +
        'margin: 13px;' +
        '}' +
        '.row-back-color{' +
        'background-color: #a4c2f4;' +
        '}' +
        '.definition{' +
        'background-color: snow;' +
        '}' +
        'pre{' +
        'background-color: ghostwhite;' +
        'border: 1px solid silver;' +
        'text-align: left !important;' +
        '}' +
        '.json-key {' +
        'color:#e2b91e;' +
        '}' +

        '.json-value {' +
        'color: blue;' +
        '}' +

        '.json-string {' +
        'color: #2f6fa8;' +
        '}' +
        '</style>' +

        '</head>' +
        '<body>' +
        '<header>' +
        '<div class="panel panel-default text-center">' +
        '<div class="panel-body"><p> <span> {{ </span> Post <i>Json</i> <span>}} </span> </p></div>' +
        '</div>' +
        '</header>' +

        '<div class="container">' +
        getFullApiRow(name, dateTime, postStructure, outputStructure, exURL, exInput, key) +
        '</div>' +

        '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>' +

        '</body>' +
        '</html>'
        ;
}

function generateFullDocument(projectPanel) {
    var projectName = $(projectPanel).find('.projectName').text();
    var allApis = "";
    var apisIndex = "";
    $(projectPanel).find('table').each(function () {
        var trLength = $(this).find('tr').length;
        $(this).find('tr')
            .each(function (i) {
                var requestKey = $(this).find('a.uk-float-left').attr("request-key");
                //prefixes of implementation that we want to test
                window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

                //prefixes of window.IDB objects
                window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
                window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

                if (!window.indexedDB) {
                    UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
                        console.log('Confirmed.')
                    }, function () {
                        console.log('Rejected.')
                    });
                }

                // created file to store databases
                var request = window.indexedDB.open(dbFileName, dbFileVersion);

                request.onerror = function (event) {
                    console.log("error: ");
                };

                request.onsuccess = function (event) {
                    db = request.result;
                    console.log("success: " + db);
                    //some code here
                    var transaction = db.transaction([projectsDatabase]);
                    var objectStore = transaction.objectStore(projectsDatabase);
                    var record = objectStore.get(parseInt(requestKey));

                    record.onerror = function (event) {
                        console.log("Unable to retrieve daa from database!");
                    };

                    record.onsuccess = function (event) {
                        // Do something with the request.result!
                        if (record.result) {
                            var apiName = record.result.name;
                            var dateTime = record.result.date + "&nbsp;&nbsp;&nbsp;" + record.result.time;
                            var url = record.result.url;
                            var type = record.result.type;
                            var input = record.result.input;
                            var output = record.result.output;
                            $('#api-name').html(apiName);
                            $('#request-key').val(requestKey);
                            $('#api-datetime').html(dateTime);
                            $('#api-name2').html(apiName);
                            if (type == "get") {
                                $('#api-post-structure').html('<center style="color: #116d2a;font-size:large;font-weight:bolder;margin-top: 5%">Get Request</center>');
                                $('#api-ex-input').html('<center style="color: #116d2a;font-size:large;font-weight:bolder;margin-top: 5%">Get Request</center>');
                            } else if (type == "post") {
                                $('#api-post-structure').html(library.json.typePrettyPrint(input));
                                $('#api-ex-input').html(library.json.prettyPrintToString(input));
                            }
                            $('#api-output-structure').html(library.json.typePrettyPrint(output));
                            $('#api-ex-url').html(url);
                            var api = '<section id="' + requestKey + '" class="full_api">' +
                                '<div class="row api-data">' +
                                '<div class="col-md-12 col-sm-12 col-xs-12">' +
                                '<h1>' + $('#api-name').html() + '</h1>' +
                                '<p>' + $('#api-datetime').html() + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="row row-back-color top-border left-border right-border">' +
                                '<div class="col-md-3 col-sm-3 col-xs-3"><p class="margin-data">POST Parameters</p></div>' +
                                '<div class="definition col-md-9 col-sm-9 col-xs-9 left-border"><pre class="margin-data">' + $('#api-post-structure').html() + '</pre></div>' +
                                '</div>' +
                                '<div class="row row-back-color top-border left-border right-border">' +
                                '<div class="col-md-3 col-sm-3 col-xs-3"><p class="margin-data">Output Structure</p></div>' +
                                '<div class="definition col-md-9 col-sm-9 col-xs-9 left-border"><pre class="margin-data">' + $('#api-output-structure').html() + '</pre></div>' +
                                '</div>' +
                                '<div class="row row-back-color top-border left-border right-border bottom-border">' +
                                '<div class="col-md-3 col-sm-3 col-xs-3"><p class="margin-data">Example</p></div>' +
                                '<div class="col-md-9 col-sm-9 col-xs-9 left-border">' +
                                '<div class="row bottom-border">' +
                                '<div class="definition col-md-12 col-sm-12 col-xs-12"><p class="margin-data">' + $('#api-ex-url').html() + '</p></div>' +
                                '</div>' +
                                '<div class="row"><div class="definition col-md-12 col-sm-12 col-xs-12"><p>Input :</p></div></div>' +
                                '<div class="row"><div class="definition col-md-12 col-sm-12 col-xs-12 text-break"><pre class="margin-data">' + $('#api-ex-input').html() + '</pre></div></div>' +
                                '</div>' +
                                '</div>' +
                                '</section>' +
                                '<hr/>' +
                                '<br>'
                            ;
                            allApis += api;
                            apisIndex +=
                                '<br>' +
                                '<div class="row text-center">' +
                                '<div class="col-md-12 col-sm-12 col-xs-12">' +
                                '<a href="#' + requestKey + '">' + apiName + '</a>' +
                                '</div>' +
                                '</div>' +
                                '<hr>';
                        }
                        else {
                            console.log("couldn't be found in your database!");
                        }
                    };

                    objectStore.transaction.oncomplete = function (event) {
                        // Store values in the newly created objectStore.
                        var fullDocument = '<!DOCTYPE html>' +
                            '<html lang="en">' +
                            '<head>' +
                            '<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />' +
                            '<meta charset="UTF-8">' +
                            '<title>Post Json</title>' +
                            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>' +
                            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"/>' +
                            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>' +
                            '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.22/css/uikit.min.css"/>' +
                            '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
                            '<!-- Main Style -->' +
                            '<style>' +
                            'body, *{' +
                            '    word-wrap: break-word;' +
                            '}' +

                            ' @media screen and (max-width: 767px) {' +
                            'body, * {' +
                            'font-size: 12px; !important;' +
                            '}' +
                            'h1{' +
                            'font-size: 24px; !important;' +
                            '}' +
                            'h2{' +
                            'font-size: 16px; !important;' +
                            '}' +
                            'h3{' +
                            'font-size: 12px; !important;' +
                            '}' +
                            'h4{' +
                            'font-size: 8px; !important;' +
                            '}' +
                            'h5{' +
                            'font-size: 4.8px; !important;' +
                            '}' +
                            'h6{' +
                            'font-size: 3.2px; !important;' +
                            '}' +
                            '}' +

                            '@media (min-width: 768px) and (max-width: 991px) {' +
                            'body, * {' +
                            'font-size: 16px; !important;' +
                            '}' +
                            'h1{' +
                            'font-size: 28px; !important;' +
                            '}' +
                            'h2{' +
                            'font-size: 20px; !important;' +
                            '}' +
                            'h3{' +
                            'font-size: 16px; !important;' +
                            '}' +
                            'h4{' +
                            'font-size: 12px; !important;' +
                            '}' +
                            'h5{' +
                            'font-size: 8.8px; !important;' +
                            '}' +
                            'h6{' +
                            'font-size: 7.2px; !important;' +
                            '}' +
                            '}' +

                            '@media (min-width: 992px) and (max-width: 1199px) {' +
                            'body, * {' +
                            'font-size: 20px; !important;' +
                            '}' +
                            'h1{' +
                            'font-size: 32px; !important;' +
                            '}' +
                            'h2{' +
                            'font-size: 24px; !important;' +
                            '}' +
                            'h3{' +
                            'font-size: 20px; !important;' +
                            '}' +
                            'h4{' +
                            'font-size: 16px; !important;' +
                            '}' +
                            'h5{' +
                            'font-size: 12.8px; !important;' +
                            '}' +
                            'h6{' +
                            'font-size: 11.2px; !important;' +
                            '}' +
                            '}' +

                            '@media screen and (min-width: 1200px) {' +
                            'body, * {' +
                            'font-size: 20px;' +
                            '!important;' +
                            '}' +

                            'h1 {' +
                            'font-size: 32px;' +
                            '!important;' +
                            '}' +

                            'h2 {' +
                            'font-size: 24px;' +
                            '!important;' +
                            '}' +

                            'h3 {' +
                            'font-size: 20px;' +
                            '!important;' +
                            '}' +

                            'h4 {' +
                            'font-size: 16px;' +
                            '!important;' +
                            '}' +

                            'h5 {' +
                            'font-size: 12.8px;' +
                            '!important;' +
                            '}' +

                            'h6 {' +
                            'font-size: 11.2px;' +
                            '!important;' +
                            '}' +
                            '}' +
                            '</style>' +
                            '<style>' +
                            '#sidebar{' +
                            'background-color: snow;' +
                            'position: fixed;' +
                            'height: 100%;' +
                            'overflow-y: auto;' +
                            'z-index: 99;' +
                            '}' +
                            '#sidebar::-webkit-scrollbar-track' +
                            '{' +
                            '-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);' +
                            'border-radius: 10px;' +
                            'background-color: #a4c2f4;' +
                            '}' +

                            '#sidebar::-webkit-scrollbar' +
                            '{' +
                            'width: 12px;' +
                            'background-color: #a4c2f4;' +
                            '}' +

                            '#sidebar::-webkit-scrollbar-thumb' +
                            '{' +
                            'border-radius: 10px;' +
                            '-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);' +
                            'background-color: #2f6fa8;' +
                            '}' +
                            'a{' +
                            'text-decoration: none;' +
                            'color: #006699;' +
                            'font-weight: bold;' +
                            '}' +
                            'a:hover{' +
                            'text-decoration: none;' +
                            'color: grey;' +
                            '}' +
                            'hr{' +
                            'height: 1px;' +
                            'color: #9999ff;' +
                            'background-color: #9999ff;' +
                            '}' +
                            '.api-data h1{' +
                            'font-weight: bold;' +
                            'color: #006699;' +
                            '}' +
                            '.api-data p{' +
                            'color: #8d8d8d;' +
                            '}' +
                            '.panel-body span{' +
                            'color: #a4c2f4;' +
                            '}' +
                            '.panel-body p{' +
                            'font-weight: bold;' +
                            'color : #6699cc;' +
                            '}' +
                            '.panel-body p i{' +
                            'color : #9999ff;' +
                            '}' +
                            '.header-caption{' +
                            'font-weight: bold;' +
                            'color: #006699;' +
                            '}' +
                            '.brief-caption{' +
                            'color: #8d8d8d;' +
                            '}' +
                            '.left-border{' +
                            'border-left: solid 5px;' +
                            'border-color: #009999;' +
                            '}' +
                            '.right-border{' +
                            'border-right: solid 5px;' +
                            'border-color: #009999;' +
                            '}' +
                            '.top-border{' +
                            'border-top: solid 5px;' +
                            'border-color: #009999;' +
                            '}' +
                            '.bottom-border{' +
                            'border-bottom: solid 5px;' +
                            'border-color: #009999;' +
                            '}' +

                            '.margin-data{' +
                            'margin: 13px;' +
                            '}' +
                            '.row-back-color{' +
                            'background-color: #a4c2f4;' +
                            '}' +
                            '.definition{' +
                            'background-color: snow;' +
                            '}' +
                            'pre{' +
                            'background-color: ghostwhite;' +
                            'border: 1px solid silver;' +
                            'text-align: left !important;' +
                            '}' +
                            '.json-key {' +
                            'color:#e2b91e;' +
                            '}' +

                            '.json-value {' +
                            'color: blue;' +
                            '}' +

                            '.json-string {' +
                            'color: #2f6fa8;' +
                            '}' +
                            '</style>' +

                            '</head>' +
                            '<body>' +
                            '<header class="text-center navbar-fixed-top" style="z-index: 99">' +
                            '<div id="logo-panel" class="panel panel-default text-center" style="margin-bottom: 0">' +
                            '<div class="panel-body"><p> <span> {{ </span> Post <i>Json</i> <span>}} </span> </p></div>' +
                            '</div>' +
                            '</header>' +
                            '<div id="main-body" class="container-fluid">' +
                            '<div id="main-row" class="row">' +
                            '<div id="sidebar" class="col-md-3 col-sm-3 col-xs-3">' +
                            apisIndex +
                            '</div>' +
                            '<div class="col-md-7 col-sm-7 col-xs-7 col-md-offset-4 col-sm-offset-4 col-xs-offset-4">' +
                            '<div class="row text-center">' +
                            '<h1 class="header-caption col-md-12 col-sm-12 col-xs-12">' + projectName + '</h1>' +
                            '</div>' +
                            '<br><br>';

                        fullDocument += allApis;

                        fullDocument += '</div>' +
                            '</div>' +
                            '</div>' +
                            '<script>' +
                            '$(document).ready(function () {' +
                            '$("a").on("click", function(event) {' +
                            'if (this.hash !== "") {' +
                            'event.preventDefault();' +
                            'var hash = this.hash;' +
                            '$("html, body").animate({' +
                            'scrollTop: $(hash).offset().top' +
                            '}, 800, function(){' +
                            'window.location.hash = hash;' +
                            '});' +
                            '}' +
                            '});' +
                            '$( window ).scroll(function() {' +
                            'if ($(this).scrollTop()>100)' +
                            '{' +
                            '$("#logo-panel").fadeOut();' +
                            '}' +
                            'else' +
                            '{' +
                            '$("#logo-panel").fadeIn();' +
                            '}' +
                            '});' +
                            '});' +
                            '</script>' +
                            '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>' +
                            '</body>' +
                            '</html>';
                        if (i + 1 == trLength)
                            saveFile(fullDocument, projectName, "text/html", "html");
                    };
                    db.close();

                };

                // created database object to store
                request.onupgradeneeded = function (event) {
                    var db = event.target.result;
                    db.createObjectStore(historyDatabase, {autoIncrement: true});
                    db.createObjectStore(projectsDatabase, {autoIncrement: true});
                }
            });
    });

}

function exportProject(projectPanel, requestsCount) {
    var projectName = $(projectPanel).find('.projectName').text();
    var projectRequests = [];
    $(projectPanel).find('table').each(function () {
        $(this).find('tr')
            .each(function (i) {
                var requestKey = $(this).find('a.uk-float-left').attr("request-key");
                //prefixes of implementation that we want to test
                window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

                //prefixes of window.IDB objects
                window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
                window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

                if (!window.indexedDB) {
                    UIkit.modal.alert("Your browser doesn't support a stable version of IndexedDB.").then(function () {
                        console.log('Confirmed.')
                    }, function () {
                        console.log('Rejected.')
                    });
                }

                // created file to store databases
                var request = window.indexedDB.open(dbFileName, dbFileVersion);

                request.onerror = function (event) {
                    console.log("error: ");
                };

                request.onsuccess = function (event) {
                    db = request.result;
                    console.log("success: " + db);
                    //some code here
                    var transaction = db.transaction([projectsDatabase]);
                    var objectStore = transaction.objectStore(projectsDatabase);
                    var record = objectStore.get(parseInt(requestKey));

                    record.onerror = function (event) {
                        console.log("Unable to retrieve daa from database!");
                    };

                    record.onsuccess = function (event) {
                        // Do something with the request.result!
                        if (record.result) {
                            var name = record.result.name;
                            var date = record.result.date;
                            var time = record.result.time;
                            var URL = record.result.url;
                            var type = record.result.type;
                            var input = record.result.input;
                            var output = record.result.output;
                            var projectName = record.result.projectname;
                            var json = {
                                name: name,
                                url: URL,
                                input: input,
                                output: output,
                                type: type,
                                date: date,
                                time: time,
                                projectname: projectName
                            };
                            projectRequests.push(json);
                            if (projectRequests.length == requestsCount) {
                                saveFile(JSON.stringify(projectRequests), projectName, "application/json", "json");
                            }
                        }
                        else {
                            console.log("couldn't be found in your database!");
                        }
                    };

                    objectStore.transaction.oncomplete = function (event) {
                        // Store values in the newly created objectStore.

                    };

                    db.close();
                };

                // created database object to store
                request.onupgradeneeded = function (event) {
                    var db = event.target.result;
                    db.createObjectStore(historyDatabase, {autoIncrement: true});
                    db.createObjectStore(projectsDatabase, {autoIncrement: true});
                }
            });
    });
}

//-------------------------------------------- indexedDB operations

//opens connection to file and add database to db variable
function openConnection(dbFileName, dbFileVersion) {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here

        db.close();

    };

    // created database object to store
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore(historyDatabase, {autoIncrement: true});
        db.createObjectStore(projectsDatabase, {autoIncrement: true});
    }
}

function add(jsonObject, objectStoreName) {
    var request = db.transaction([objectStoreName], "readwrite")
        .objectStore(objectStoreName)
        .add(jsonObject);

    request.onsuccess = function (event) {
        console.log("New Row has been added to your database.");
    };

    request.onerror = function (event) {
        console.log("Unable to add data\r\n that aready exist in your database! ");
    }
}

function remove(objectID, objectStoreName) {
    var request = db.transaction([objectStoreName], "readwrite")
        .objectStore(objectStoreName)
        .delete(objectID);

    request.onsuccess = function (event) {
        console.log("Your entry has been removed from your database.");
    };

    request.onerror = function (event) {
        console.log("Unable to remove data from your database! ");
    }
}

function read(objectID, objectStoreName) {
    var transaction = db.transaction([objectStoreName]);
    var objectStore = transaction.objectStore(objectStoreName);
    var record = objectStore.get(objectID); // make sure objectID is integer parseInt(objectID)

    record.onerror = function (event) {
        console.log("Unable to retrieve daa from database!");
    };

    record.onsuccess = function (event) {
        // Do something with the request.result!
        if (record.result) {
            record.result;
        }

        else {
            console.log("couldn't be found in your database!");
        }
    };

    objectStore.transaction.oncomplete = function (event) {
        // Store values in the newly created objectStore.

    };
}

function readAll(objectStoreName) {
    var objectStore = db.transaction([objectStoreName]).objectStore(objectStoreName);
    var records = [];

    objectStore.openCursor().onsuccess = function (event) {

        var cursor = event.target.result;

        if (cursor) {
            records.push({"key": cursor.key, "value": cursor.value});
            cursor.continue();
        }
        else {
            console.log("No more entries!");
        }
    };

    objectStore.transaction.oncomplete = function (event) {
        // Store values in the newly created objectStore.
        records;
    };
}

// deletes database file from browser
function deleteDatabaseFile(dbFileName) {
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
}

// clears database object in database file
function clearDatabase(objectStoreName) {
    var requestToClear = db.transaction([objectStoreName], "readwrite")
        .objectStore(objectStoreName).clear();

    requestToClear.onsuccess = function (event) {
        // report the success of our clear operation
    };

}

// deletes database object in database file
function deleteDatabase(objectStoreName) {
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }

    // created file to store databases
    var request = window.indexedDB.open(dbFileName, dbFileVersion);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
        //some code here
        db.deleteObjectStore(objectStoreName);
        db.close();

    };
}

//-------------------------------------------- get file content and download file

function getFileContent(filePath) {
    $.ajax({

        url: filePath,
        type: 'GET',
        dataType: 'html',
        crossDomain: true,
        beforeSend: function setHeader(httpReq) {
            httpReq.setRequestHeader('Access-Control-Allow-Headers', '*');
            httpReq.setRequestHeader('Access-Control-Allow-Origin', '*');
            httpReq.setRequestHeader('accept', 'text/html');
            httpReq.setRequestHeader('Accept-Language', 'en-US,en;q=0.8');
        },
        success: function (data) {
            return data;
        },
        error: function () {
            return false;
        },
    });
}

// text/html or application/json
function saveFile(fileContent, fileName, type, extension) {
    var text = fileContent;
    var filename = fileName;
    var blob = new Blob([text], {type: type + ";charset=utf-8"});
    saveAs(blob, filename + "." + extension);
}

//--------------------------------------------- utilities functions

function getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

function getTimeNow() {
    var d = new Date();
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var ampm = hr < 12 ? "am" : "pm";
    var timeNow = hr + ":" + min + ampm;
    return timeNow;
}

function getRemovedHTMLScript(htmlInput) {
    return htmlInput;
}

function preventEvent(e) {
    e.preventDefault();
    return false;
}

function preventIframeEvents() {
    $('#preview-row').find('*').on('click', preventEvent).on('keypress', preventEvent).on('keydown', preventEvent).on('keyup', preventEvent);
}

//--------------------------------------------- excute functions

$(document).ready(function () {
    retrieveHistoryAllRequest();
    retrieveProjectAllRequest();

    $('#btnsend').on("click", function () {
        send();
    });

    $('#save_modal').on("click", function () {
        var projectName = "";
        $("#project-selector")
            .change(function () {
                projectName = $("#project-selector option:selected").text();
            }).change();
        var URL = $('#mainurl').val();
        var name = $('#request_name_select').val();
        var jsonForm = lastOutPut;
        if ($("#getrequest").prop('checked')) {
            var type = "get";
            var input = "";
        } else {
            var type = "post";
            var input = $('#inputjson').val();
        }
        var json = {
            name: name,
            url: URL,
            input: JSON.parse(input),
            output: jsonForm,
            type: type,
            date: getTodayDate(),
            time: getTimeNow(),
            projectname: projectName
        };
        if (projectName == "" || projectName == "Choose a Project") {
            UIkit.modal.alert("Please Select a Project.").then(function () {
                console.log('Confirmed.')
            }, function () {
                console.log('Rejected.')
            });
            return false;
        }
        if (name == "") {
            UIkit.modal.alert("Please Enter Request Name").then(function () {
                console.log('Confirmed.')
            }, function () {
                console.log('Rejected.')
            });
            return false;
        }
        saveProjectRequest(json);
    });

    $('#btncreateproject').on("click", function () {
        var projectName = $('#project_name').val();
        var URL = $('#mainurl').val();
        var name = $('#request_name').val();
        var jsonForm = lastOutPut;
        if ($("#getrequest").prop('checked')) {
            var type = "get";
            var input = "";
        } else {
            var type = "post";
            var input = JSON.parse($('#inputjson').val());
        }
        var json = {
            name: name,
            url: URL,
            input: input,
            output: jsonForm,
            type: type,
            date: getTodayDate(),
            time: getTimeNow(),
            projectname: projectName
        };
        if (projectName == "") {
            UIkit.modal.alert("Please Select a Project.").then(function () {
                console.log('Confirmed.')
            }, function () {
                console.log('Rejected.')
            });
            return false;
        }
        if (name == "") {
            UIkit.modal.alert("Please Enter Request Name").then(function () {
                console.log('Confirmed.')
            }, function () {
                console.log('Rejected.')
            });
            return false;
        }
        checkProjectNameExists(projectName, json);
    });

    $('#tryit').on("click", function () {
        var apiExURL = $('#api-ex-url').text();
        var apiExInput = $('#api-ex-input').text();
        $('#mainurl').val(apiExURL);
        if (apiExInput == "Get Request") {
            $("#getrequest").prop('checked', true);
            $("#postrequest").prop('checked', false);
            $("#maininput").attr("hidden", "hidden");

        } else {
            $("#getrequest").prop('checked', false);
            $("#postrequest").prop('checked', true);
            $("#maininput").removeAttr("hidden");
            $('#inputjson').val(apiExInput);
        }
        var targeted_popup_class = $('#close-doc').attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
    });

    $('#generatedoc').on("click", function () {
        var apiName = $('#api-name').text();
        var apiDateTime = $('#api-datetime').text();
        var apiPostStructure = $('#api-post-structure').html();
        var apiOutputStructure = $('#api-output-structure').html();
        var apiExURL = $('#api-ex-url').text();
        var apiExInput = $('#api-ex-input').html();
        var requestKey = $('#request-key').val();
        saveFile(generateDocument(apiName, apiDateTime, apiPostStructure, apiOutputStructure, apiExURL, apiExInput, requestKey), apiName, "text/html", "html");
    });

    $('#btn-import-project').on('click', function (e) {
        e.preventDefault();
        $('#file-import').click();
    });

    $('#file-import').on('change', function () {
        if (this.files[0]) {
            var file = this.files[0];
            var reader = new FileReader();
            var isValid = 0;
            reader.onload = function () {
                var projectDataText = reader.result;
                var projectDataJson = JSON.parse(projectDataText);
                for (var i = 0; i < projectDataJson.length; i++) {
                    saveProjectRequest(projectDataJson[i]);
                    isValid = 1;
                }
            };
            reader.onloadend = function () {
                $('#accordion').html("");
                if (isValid == 0) {
                    UIkit.modal.alert("Import Failed Wrong File Content Format!.").then(function () {
                        console.log('Confirmed.')
                    }, function () {
                        console.log('Rejected.')
                    });
                }
                setTimeout(function () {
                    $('div.cs-select').remove();
                    $('#projects-selector').append(
                        '<section>' +
                        '<select id="project-selector" class="cs-select cs-skin-underline">' +
                        '<option value="" disabled selected>Choose a Project</option>' +
                        '</select>' +
                        '</section>');
                    retrieveProjectAllRequest();
                }, 1000);

            }
            reader.readAsText(file);
        }
    });

    $('#btnraw').on('click', function (e) {
        $('#raw-row').show();
        $('#preview-row').hide();
        $(this).removeClass("btn-default");
        $(this).addClass('btn-primary');
        $('#btnpreview').removeClass("btn-primary");
        $('#btnpreview').addClass('btn-default');
    });

    $('#btnpreview').on('click', function (e) {
        $('#raw-row').hide();
        $('#preview-row').show();
        $(this).removeClass("btn-default");
        $(this).addClass('btn-primary');
        $('#btnraw').removeClass("btn-primary");
        $('#btnraw').addClass('btn-default');
    });
});

function onDocReady() {
    $("#historytab").find('li')
        .each(function () {
            $(this).find('a.uk-float-left').on("click", function () {
                var requestKey = $(this).attr("request-key");
                retrieveHistoryRequest(requestKey);
            });
            $(this).find('span.fa-close').on("click", function () {
                var requestKey = $(this).attr("request-key");
                removeHistoryRequest(requestKey);
                $(this).closest('li').remove();
            });
        });

    $('#btn-clear-history').on("click", function () {
        $("#historytab").find('li')
            .each(function () {
                var requestKey = $(this).find('a.uk-float-left').attr("request-key");
                removeHistoryRequest(requestKey);
            });
        $("#historytab").html('');
    });

    $("#projectstab table").find('tr')
        .each(function () {
            $(this).find('a.uk-float-left').on("click", function () {
                var requestKey = $(this).attr("request-key");
                retrieveProjectRequest(requestKey);
            });
            $(this).find('span.fa-close').on("click", function () {
                var projectPanel = $(this).closest('.panel-default');
                var requestKey = $(this).attr("request-key");
                removeProjectRequest(requestKey);
                $(this).closest('tr').remove();
                if (!$(projectPanel).find('table').has("tr").length) {
                    $(projectPanel).next().remove();
                    $(projectPanel).remove();
                }
            });
        });

    $('#accordion').find('div.panel-default').each(function () {
        $(this).find('span.fa-close').on("click", function () {
            var projectPanel = $(this).closest('.panel-default');
            $(projectPanel).find('table').each(function () {
                $(this).find('tr')
                    .each(function () {
                        var requestKey = $(this).find('a.uk-float-left').attr("request-key");
                        removeProjectRequest(requestKey);
                    });
            });
            $(projectPanel).next().remove();
            $(projectPanel).remove();
        });
    });
}


// JSONFormatter.format(jsonForm, {
//     collapse: true, // Setting to 'true' this will format the JSON into a collapsable/expandable tree
//     appendTo: 'pre', // A string of the id, class or element name to append the formatted json
//     list_id: 'json' // The name of the id at the root ul of the formatted JSON
// });