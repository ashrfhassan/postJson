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