const sequelize = require('../config/connection');
const { Users, Posts, Comments } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Posts.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comments.create({
      ...comment,
      post_id: 1,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
