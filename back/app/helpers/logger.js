const bunyan = require('bunyan');

/**
 * Liste des niveaux de log
 *
 * "fatal" (60):
 *     The service/app is going to stop or
 *     become unusable now. An operator should definitely look into this soon.
 *     "error" (50): Fatal for a particular request,
 *     but the service/app continues servicing other requests.
 *     An operator should look at this soon(ish).
 * "warn" (40):
 *     A note on something that should probably
 *     be looked at by an operator eventually.
 * "info" (30):
 *     Detail on regular operation.
 * "debug" (20):
 *     Anything else, i.e. too verbose to be included in "info" level.
 * "trace" (10):
 *     Logging from external libraries used by
 *     your app or very detailed application logging.
 */

const streams = [{
    level: 'error', // C'est le niveau à partir duquel il s'occupera des messages
    path: './log/error.log',
    type: 'rotating-file',
    period: '12h', // daily rotation // for test use 10000ms
    count: 2, // keep 3 back copies
}];

//* Affichage des message en console lors du dev
if (process.env.NODE_ENV !== 'production') {
    streams.push({
        level: 'info',
        stream: process.stdout,
    });
}

module.exports = bunyan.createLogger({
    name: 'animoProtect', 
    streams,
});
