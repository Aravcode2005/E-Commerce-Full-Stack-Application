exports.getLogin = (req, res, next) => {
    console.log(req.get('Cookie').split(';')[1].trim().split('=')[1];
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    });
};
exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn=true;
    res.redirect('/');
};