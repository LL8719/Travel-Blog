const router = require('express').Router();
const { Posts, Users, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/homepage', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/allposts/:id', async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('allposts', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Posts.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'content', 'date_created', 'user_id'],
      include: [
        {
          model: Comments,
          attributes: [
            'id',
            'comment_body',
            'date_created',
            'user_id',
            'post_id',
          ],
          include: {
            model: Users,
            attributes: ['username'],
          },
        },
        {
          model: Users,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((posts) => {
      const postObj = posts.get({ plain: true });
      postObj.User = posts.User;
      return postObj;
    });

    const user = await Users.findByPk(req.session.user_id);
    const dashUser = user.get({
      plain: true,
    });

    res.render('dashboard', {
      posts,
      user: dashUser,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
