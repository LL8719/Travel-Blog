const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');

Post.hasMany(Comments, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(Users, {
  foreignKey: 'user_id'
});

Comments.belongsTo(Users, {
  foreignKey: 'user_id'
});

module.exports = { Users, Posts, Comments };
