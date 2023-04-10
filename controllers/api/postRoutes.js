const router = require('express').Router();
const { Posts } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Posts.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update blog post for logged in user
router.put('/:id', withAuth, async (req, res) => {
    console.debug(req.body);
    try {
        const existingPost = await Posts.update({
            title: req.body.title,
            location: req.body.location,
            petFriendly: req.body.petFriendly,
            familyFriendly: req.body.familyFriendly,
            content: req.body.content,
        },
            {
                where: {
                    id: req.params.id,
                }
            });
        res.status(200).json(existingPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete existing blog post for logged in user
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Posts.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(400).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;