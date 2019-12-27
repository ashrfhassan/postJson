import fileSaver from 'file-saver';
import _ from 'lodash';
export default {
    getTodayDate: () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        const yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    },
    getTimeNow: () => {
        const d = new Date();
        const hr = d.getHours();
        let min = d.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        const ampm = hr < 12 ? "am" : "pm";
        return hr + ":" + min + ampm;
    },
    fetchFirstCell: (arr) => {
        if (arr.constructor.name === "Array") {
            const length = arr.length;
            for (let x = 1; x < length; x++) {
                arr.pop();
            }
        } else {
            _.map(arr, function (key, value) {
                if (value != null && value !== "null") {
                    if (value.constructor.name === "Array") {
                        const length = value.length;
                        if (length > 1) {
                            for (var x = 1; x < length; x++) {
                                value.pop();
                            }
                        }
                        if (length > 0) {
                            if (value[0].constructor.name === "Object")
                                this.fetchFirstCell(value[0]);
                        }
                    }
                }
            });
        }
    },
    saveFile: (content, type, fileName) => {
        const blob = new Blob([content], { type: type + ";charset=utf-8" });
        fileSaver.saveAs(blob, fileName);
    },
    enhanceRequestUrlLength: (requestUrl) => {
        if (requestUrl.length > 30)
            return requestUrl.substr(0, 30) + "...";
        return requestUrl;
    },
    renderEjsFile: (template, data) => {
     return template(data);
    }
}