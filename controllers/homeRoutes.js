//Install dependencies
const router = require('express').Router();
const { Post, Comment, User } = require('../models');

//Get all posts for homepage
router.get('/', (req, res) => {
    Post.findAll({
        include: [User],
    })
      .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render('all-posts',  { posts, loggedIn: req.session.loggedIn });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
});

//Get a single post
router.get('/post/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User],
                loggedIn: req.session.loggedIn
            },
        ],
    })
        .then((dbPostData) => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render('single-post', { post, loggedIn: req.session.loggedIn });
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

//Get login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});



module.exports = router;