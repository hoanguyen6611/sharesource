class SiteController {
    //[GET]/home
    index(req, res) {
        res.render('home');
    }
    //[GET]/search
    search(req, res) {
        res.render('search');
    }
}
//Public ra ngoài
module.exports = new SiteController();
