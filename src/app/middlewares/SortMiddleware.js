module.exports = function SortMiddleware(req, res, next) {
    res.local._sort = {
        enabled: false,
        type: 'default'
    };
    if (req.query.hasOwnProperty('_sort')) {
        res.local._sort.enabled = true;
        res.local._sort.type = req.query.type;
        res.local._sort.column = req.query.column;
    }
    next();
}