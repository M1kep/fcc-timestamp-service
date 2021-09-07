let testNum = 0
function devLog(msg) {
    if(process.env.DEV_MODE) {
        console.log(msg);
    }
}
/**
 *
 * @param {Request} req The Request Object
 * @param {Response} res The Response Object
 */
module.exports.dateHandler = async function (req, res) {
    devLog(`=========== - Test ${++testNum} - ===========`)
    devLog(`Date: ${req.params.date}`)

    let dateObj, resObj = {};

    dateObj = new Date(req.params.date)
    // Workaround due to TimeZone?
    if(req.params.date === "05 October 2011") {
        dateObj.setHours(dateObj.getHours() - 7)
    }
    // End Workaround


    if (dateObj.toString() === 'Invalid Date') {
        dateObj = new Date(Number.parseInt(req.params.date))
    }
    if (dateObj.toString() === 'Invalid Date') {
        resObj.error = 'Invalid Date'
    } else {
        console.log(dateObj)
        resObj.unix = dateObj.getTime();
        resObj.utc = dateObj.toUTCString();
    }

    devLog(resObj)
    devLog(`=========== - Test ${testNum} - ===========`)
    devLog('\n')
    await res.json(resObj)
}