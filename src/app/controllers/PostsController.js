class NewsController {
    //[GET]/posts
    index(req, res) {
        res.render('posts/news');
    }
    //[GET]/posts/:slug
    show(req, res) {
        res.send('NEWS DETAIL!!!');
    }
    //[GET]/posts/blog
    blog(req, res) {
        res.render('posts/blog');
    }
    //[GET]/posts/question
    question(req, res) {
        res.render('posts/question');
    }
    //[GET]/posts/sharecode
    shareCode(req, res) {
        res.render('posts/sharecode');
    }
}
//Public ra ngoài
module.exports = new NewsController();
