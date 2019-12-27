import _ from 'lodash';
import helpers from './index';

export default {
    replacer: function (match, pIndent, pKey, pVal, pEnd) {
        const key = '<span class=json-key>';
        const val = '<span class=json-value>';
        const str = '<span class=json-string>';
        let r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        if (pVal)
            r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
        return r + (pEnd || '');
    },
    prettyPrint: function (obj) {
        const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        const arrLength = [];
        let indexsOfBrackets = [];
        let indexOfBracket = 0;
        let objStringfy = JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, this.replacer);
        if (obj.constructor.name === "Array") {
            arrLength.push(obj.length);
            indexOfBracket = objStringfy.indexOf('[', indexOfBracket);
            indexsOfBrackets.push(indexOfBracket);
            indexOfBracket += 1;
        } else {
            _.map(obj, function (key, value) {
                if (value != null && value !== "null") {
                    if (value.constructor.name === "Array") {
                        arrLength.push(value.length);
                        indexOfBracket = objStringfy.indexOf('[', indexOfBracket);
                        indexsOfBrackets.push(indexOfBracket);
                        indexOfBracket += 1;
                    }
                }
            });
        }
        for (let i = 0; i < arrLength.length; i++) {
            objStringfy = objStringfy.replaceAt(indexsOfBrackets[i], "array(" + arrLength[i] + ") [ ");
        }
        return objStringfy;
    },
    typeReplacer: function (match, pIndent, pKey, pVal, pEnd) {
        const key = '<span class=json-key>';
        const val = '<span class=json-value>';
        const str = '<span class=json-string>';
        let r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        if (pVal) {
            if (pVal[0] === '"') {
                if (pVal.isNumeric()) {
                    if (pVal.isDouble())
                        r = r + val + "Double" + '</span>';
                    else
                        r = r + val + "Integer" + '</span>';
                } else {
                    r = r + str + "String" + '</span>';
                }
            } else if (pVal[0] === '{') {
                r = r + str + this.typePrettyPrint(JSON.parse(pVal)) + '</span>';
            } else if (_.isNumber(pVal)) {
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
        helpers.fetchFirstCell(obj);
        const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        return JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, this.typeReplacer);
    },
    replacerToString: function (match, pIndent, pKey, pVal, pEnd) {
        const key = '<span class=json-key>';
        const val = '<span class=json-value>';
        const str = '<span class=json-string>';
        let r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(':', '') + '</span>: ';
        if (pVal)
            r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
        return r + (pEnd || '');
    },
    prettyPrintToString: function (obj) {
        const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        return JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, this.replacerToString);
    },
};