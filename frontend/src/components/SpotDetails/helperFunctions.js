export const reviewDateFormatter = (date) => {
    let dateArr = date.split('-')
    let year = dateArr[0]
    let month = monthStringifier(dateArr[1])
    return `${month}, ${year} `
}

const monthStringifier = (month) => {
    let monthString
    switch(month) {
        case '01': monthString = 'January'
        break
        case '02': monthString = 'Febuary'
        break
        case '03': monthString = 'March'
        break
        case '04': monthString = 'April'
        break
        case '05': monthString = 'May'
        break
        case '06': monthString = 'June'
        break
        case '07': monthString = 'July'
        break
        case '08': monthString = 'August'
        break
        case '09': monthString = 'September'
        break
        case '10': monthString = 'October'
        break
        case '11': monthString = 'November'
        break
        case '12': monthString = 'December'
        break
    }
    return monthString
}
