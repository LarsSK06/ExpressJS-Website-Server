module.exports = {
    repairRequest: (req, res, next) => {
        const split = req.url.split("?");
        req.baseUrl = split[0];
        next();
    }
}