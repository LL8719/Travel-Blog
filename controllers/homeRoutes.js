const router = require('express').Router();
const { Posts, Users, Comments, Likes } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts from root
router.get('/', async (req, res) => {
  try {
    res.redirect('/homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts from homepage
router.get('/homepage', async (req, res) => {
  try {
    let postData;
    console.debug(req.query);
    // Filters for the search query
    if(req.query.location != "" && req.query.petFriendly && req.query.familyFriendly){
      postData = await Posts.findAll({
        where: {location: req.query.location, petFriendly: true, familyFriendly: true},
        include: [
          {
            model: Users,
            attributes: ['username'],
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: 1 },
            as: "Liked",
            required: false
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: -1 },
            as: "Disliked",
            required: false
          },
        ],
      });
    }else if(req.query.location != "" && req.query.familyFriendly){
      console.debug(req.query.location);
      postData = await Posts.findAll({
        where: {location: req.query.location, familyFriendly: true},
        include: [
          {
            model: Users,
            attributes: ['username'],
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: 1 },
            as: "Liked",
            required: false
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: -1 },
            as: "Disliked",
            required: false
          },
        ],
      });
    }else if(req.query.location != "" && req.query.petFriendly){
      
      postData = await Posts.findAll({
        where: {location: req.query.location, petFriendly: true},
        include: [
          {
            model: Users,
            attributes: ['username'],
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: 1 },
            as: "Liked",
            required: false
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: -1 },
            as: "Disliked",
            required: false
          },
        ],
      });
    }else if(req.query.petFriendly && req.query.familyFriendly){
      
      postData = await Posts.findAll({
        where: {petFriendly: true, familyFriendly: true},
        include: [
          {
            model: Users,
            attributes: ['username'],
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: 1 },
            as: "Liked",
            required: false
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: -1 },
            as: "Disliked",
            required: false
          },
        ],
      });
    }
    else if(req.query.petFriendly){
      postData = await Posts.findAll({
        where: {petFriendly: true},
        include: [
          {
            model: Users,
            attributes: ['username'],
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: 1 },
            as: "Liked",
            required: false
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: -1 },
            as: "Disliked",
            required: false
          },
        ],
      });
    }
    else if(req.query.familyFriendly){
      postData = await Posts.findAll({
        where: {familyFriendly: true},
        include: [
          {
            model: Users,
            attributes: ['username'],
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: 1 },
            as: "Liked",
            required: false
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: -1 },
            as: "Disliked",
            required: false
          },
        ],
      });
    }else if(req.query.location && req.query.location != ""){
      console.debug(req.query.location);
      postData = await Posts.findAll({
        where: {location: req.query.location},
        include: [
          {
            model: Users,
            attributes: ['username'],
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: 1 },
            as: "Liked",
            required: false
          },
          {
            model: Likes,
            attributes: ['id', 'value', 'user_id', 'post_id'],
            where: { value: -1 },
            as: "Disliked",
            required: false
          },
        ],
      });
    }else{
    // Get all posts and JOIN with user data
    postData = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ['username'],
        },
        {
          model: Likes,
          attributes: ['id', 'value', 'user_id', 'post_id'],
          where: { value: 1 },
          as: "Liked",
          required: false
        },
        {
          model: Likes,
          attributes: ['id', 'value', 'user_id', 'post_id'],
          where: { value: -1 },
          as: "Disliked",
          required: false
        },
      ],
    });
    }
    // Serialize and reverse data so the template can read it from the last to the first
    const posts = postData.map((post) => post.get({ plain: true })).reverse();

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
        {
          model: Comments,
          attributes: ['id', 'comment_text', 'date_created', 'user_id', 'post_id'],
          include: {
            model: Users,
            attributes: ['username'],
          },
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
    console.debug(err);
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


/*Graveyard

// Get all comments
router.get('/comments', withAuth, async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
    const commentData = await Comments.findAll({
      where: {
        post_id: 1,
      },
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
    res.render('comments', { 
      comments, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

*/