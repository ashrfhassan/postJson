String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + 1);
};

String.prototype.removePart = function (startIndex, endIndex) {
    return this.substr(0, startIndex) + this.substr(endIndex + 1);
};

String.prototype.isNumeric = function () {
    const strLength = this.length;
    const numbers = ['-', '+', '"', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (let i = 0; i < strLength; i++) {
        const char = this.charAt(i);
        if (numbers.indexOf(char) === -1) {
            return false;
        }
    }
    return true;
};

String.prototype.isDouble = function () {
    return !this.indexOf('.') == -1;
};

String.prototype.isNumberDouble = function () {
    const origin = this;
    const floor = Math.floor(this);
    if (origin === floor) {
        return false;
    }
    return true;
};