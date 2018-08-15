import localStorage from './api/localStorage';
import utilities from './api/utilities';
import constants from './constants.json';
export default {
    sendRequest: (type, url, dataType, headers, data) => {
          
        localStorage.saveUpdateObject(constants.dbFileName, constants.dbFileVersion, constants.historyDatabase, "data", {"name":"ask"});
        // $.ajax({
        //     type: type,
        //     url: url,
        //     datatype: dataType,
        //     data:data,
        //     crossDomain: true,
        //     beforeSend: function setHeader(httpReq) {
        //         $.each(headers, function( key, value ) {
        //             httpReq.setRequestHeader(key, value);
        //         });
        //     },
        //     success: function (response, status, xhr) {

        //     },
        //     error: function (response, textstatus) {

        //     },
        //     timeout: 1000 * 60 * 3, // sets timeout to 3 minutes
        //     statusCode: {
        //         200: function () {
        //         },
        //         400: function () {
        //         },
        //         401: function () {
        //         },
        //         403: function () {
        //         },
        //         404: function () {
        //         },
        //         500: function () {
        //         }
        //     }
        // });
    }
}