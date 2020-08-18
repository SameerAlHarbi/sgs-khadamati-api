const date = require('date-and-time');

exports.defaultTextDateFormat = 'YYYY-MM-DDTHH:mm:ss';
exports.defaultCompiledDateFormat = 
    date.compile(this.defaultTextDateFormat);

exports.parseDate = (dateText, dateFormat = this.defaultCompiledDateFormat) => {

    if(!dateText) {
        return undefined;
    }

    return date.parse(dateText, dateFormat, false);
}

exports.formatDate = (dateObject, dateFormat = this.defaultCompiledDateFormat) => {

    if(!dateObject || isNaN(dateObject)) {
        return "";
    }

    let formatedDate = date.format(dateObject, dateFormat, false);

    return formatedDate;
}

exports.convertFormat = (dateText, dateFormat, newFormat) => {

    if(!dateText || !dateFormat || !newFormat) {
        return "";
    }

    let parsedDate = this.parseDate(dateText, dateFormat);

    if(!parsedDate || isNaN(parsedDate)) {
        return "";
    }

    let formatedDate = this.formatDate(parsedDate, newFormat);
    return formatedDate;
}

exports.calcDaysDuration = (startDateObject, endDateObject) => {
    return date.subtract(endDateObject, startDateObject).toDays() ;
}

exports.addDays = (dateObject ,daysCount) => {
    return date.addDays(dateObject, daysCount);
}