const router = require("express").Router()
const client = require("../../src/botClient")
router.get('/dashboard', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        const guild = client.guilds.cache.get(req.session.guildid)
        res.render('dashboard/dashboard', { data: { req: req.session, guild: guild } });
    }
});


router.get("/", (req, res) => {
    res.render("dashboard/index")
})
router.get("/features", (req, res) => {
    res.render("dashboard/features")
})


module.exports = router
