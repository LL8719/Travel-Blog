const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');
const Likes = require('./Likes');

Users.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Posts.belongsTo(Users, {
  foreignKey: 'user_id',
});

Posts.hasMany(Comments, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comments.belongsTo(Posts, {
  foreignKey: 'post_id',
});

Users.hasMany(Comments, {
  foreign_key: 'user_id',
  onDelete: 'CASCADE',
});

Comments.belongsTo(Users, {
  foreignKey: 'user_id',
});

Posts.hasMany(Likes, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Posts.hasMany(Likes, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
  where: { value: 1 },
  as: "Liked"
});

Posts.hasMany(Likes, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
  where: { value: -1 },
  as: "Disliked"
});

Likes.belongsTo(Posts, {
  foreignKey: 'post_id',
});

module.exports = { Users, Posts, Comments, Likes };
