const router = require('express').Router();
const { Posts, Users, Comments } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts from root
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

// Get all posts from homepage
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

// Get a single post by ID
router.get('/post/:id', withAuth, async (req, res) => {
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

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single post by ID, and if the user who created the post is the logged in user, then redirect them to edit (update or delete)
router.get('/allposts/:id', withAuth, async (req, res) => {
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

    if (post.user_id == req.session.user_id) {
      res.redirect('/post/' + post.id);
      return;
    }

    res.render('allposts', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all comments
// Need to pull comments that are linked to a post - do I need a route to pull all the comments with their associated posts, or pull a comment by id (by the post's ID?)
router.get('/comments', withAuth, async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
    const commentData = await Comments.findAll({
      include: [
        {
          model: Users,
          attributes: ['username'],
        },
        {
          model: Posts,
          atributes: ['id'],
        }
      ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('allposts', { 
      comments, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
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
