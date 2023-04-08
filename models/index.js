const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');
const Likes = require('./Likes');

Users.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Posts.hasMany(Comments, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Posts.belongsTo(Users, {
  foreignKey: 'user_id',
});

Comments.belongsTo(Users, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

Likes.belongsTo(Users, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

Posts.hasMany(Likes, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

module.exports = { Users, Posts, Comments };
