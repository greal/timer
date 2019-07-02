/**
 * Генератор Id
 *
 * @constructor
 */
export function IDGenerator() {
    this.length = 8;
    this.timestamp = +new Date;

    var _getRandomInt = function( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    };

    this.generate = function() {
        var ts = this.timestamp.toString();
        var parts = ts.split( "" ).reverse();
        var id = "";

        for( var i = 0; i < this.length; ++i ) {
            var index = _getRandomInt( 0, parts.length - 1 );
            id += parts[index];
        }

        return Number(id);
    }
};

/**
 * Саморегулирующийся интервал для учета дрейфа
 *
 * @param workFunc
 * @param id
 * @param interval
 * @param errorFunc
 * @constructor
 */
export function AdjustingInterval(workFunc, id, interval, errorFunc) {
    var that = this;
    var expected, timeout;
    var running = false;
    this.interval = interval;
    this.timerId = id;

    this.start = function() {
        running = true;
        expected = Date.now() + this.interval;
        timeout = setTimeout(step, this.interval);
    };

    this.stop = function() {
        running = false;
        clearTimeout(timeout);
    };

    function step() {
        var drift = Date.now() - expected;
        if (drift > that.interval) {
            if (errorFunc) errorFunc();
        }

        workFunc(that.timerId);

        if (running) {
            expected += that.interval;
            timeout = setTimeout(step, Math.max(0, that.interval - drift));
        }
    }
};

export default { IDGenerator, AdjustingInterval };
