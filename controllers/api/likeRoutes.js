const router = require('express').Router();
const { Likes } = require('../../models');
const withAuth = require('../../utils/auth');

// Update like or dislike value
router.put('/:id', withAuth, async (req, res) => {
    try {
        const likesCheck = await Likes.findAll({
            where: {
                post_id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (likesCheck.length == 0) {
            const newLike = await Likes.create({
                ...req.body,
                user_id: req.session.user_id,
              });
            res.status(200).json(newLike);
            return;
        };

        const existingLike = await Likes.update({
            ...req.body,
        },
        {
            where: {
                post_id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        res.status(200).json(existingLike);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;