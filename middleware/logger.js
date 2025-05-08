const Log = require('../models/log');

const logger = (req, res, next) => {
    const start = Date.now();

    const excludedRoutes = ['/api/logs/last-activity']; // skip logging this

    res.on('finish', async () => {
        if (!req.user || excludedRoutes.includes(req.originalUrl)) return;

        const method = req.method;
        const actionType = {
            POST: 'CREATE',
            GET: 'READ',
            PUT: 'UPDATE',
            PATCH: 'UPDATE',
            DELETE: 'DELETE',
        }[method];

        if (!actionType) return;

        try {
            await Log.create({
                userId: req.user._id,
                action: `${actionType}_${req.baseUrl.replace('/api/', '').toUpperCase()}`,
                description: `${method} ${req.originalUrl}`,
                route: req.originalUrl,
                method,
            });
        } catch (err) {
            console.error('Log creation failed:', err.message);
        }
    });


    res.on('finish', async () => {
        if (!req.user) return;
        if (!req.user || excludedRoutes.includes(req.originalUrl)) return;

        const method = req.method;
        const actionType = {
            POST: 'CREATE',
            GET: 'READ',
            PUT: 'UPDATE',
            PATCH: 'UPDATE',
            DELETE: 'DELETE',
        }[method];

        if (!actionType) return;

        // const method = req.method;
        const status = res.statusCode < 400 ? 'success' : 'fail';
        const action = `${method}_${req.originalUrl.split('/')[2].toUpperCase()}`; // e.g., POST_PRODUCTS

        const log = new Log({
            userId: req.user._id,
            action,
            description: `${method} ${req.originalUrl}`,
            route: req.originalUrl,
            method,
            status,
            ip: req.ip,
        });
        await log.save();

        try {
            await Log.create({
                userId: req.user._id,
                action: `${actionType}_${req.baseUrl.replace('/api/', '').toUpperCase()}`,
                description: `${method} ${req.originalUrl}`,
                route: req.originalUrl,
                method,
            });
        } catch (err) {
            console.error('Log creation failed:', err.message);
        }

        const io = req.app.get('socketio');
        io.emit('activity', req.user._id.toString()); // Notify all tabs
    });

    next();
};

module.exports = logger;
