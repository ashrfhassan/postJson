import fileSaver from 'file-saver';
export default {
    getTodayDate: () => {
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
    },
    getTimeNow: () => {
        var d = new Date();
        var hr = d.getHours();
        var min = d.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        var ampm = hr < 12 ? "am" : "pm";
        var timeNow = hr + ":" + min + ampm;
        return timeNow;
    },
    fetechFirstCell: (arr) => {
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
                        if (length > 1) {
                            for (var x = 1; x < length; x++) {
                                value.pop();
                            }
                        }
                        if (length > 0) {
                            if (value[0].constructor.name == "Object")
                                fetechFirstCell(value[0]);
                        }
                    }
                }
            });
        }
    },
    saveFile: (content, type, fileName) => {
        var blob = new Blob([content], { type: type + ";charset=utf-8" });
        fileSaver.saveAs(blob, fileName);
    }
}