class PostController {
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
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        res.render('posts/blog');
    }
    //[GET]/posts/question
    question(req, res) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        res.render('posts/question');
    }
    //[GET]/posts/sharecode
    shareCode(req, res) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        res.render('posts/sharecode');
    }
}
//Public ra ngoài
module.exports = new PostController();
