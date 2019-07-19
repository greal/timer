const moment = require(`moment`);
require(`moment-duration-format`);

/**
 * Преобразовать секунды в 00:00:00
 *
 * @export
 * @param {Number} seconds
 * @return {String}
 */
export function formatSecond2Human(seconds: number): string {
    let duration = moment.duration(seconds, `seconds`);
    return duration.format(`hh:mm:ss`, {trim: false});
}
