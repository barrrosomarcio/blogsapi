const DECODE = require('jwt-decode');
const { BlogPost, User, PostCategory } = require('../models');

const create = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { title, content, categoryIds } = req.body;
    const payload = DECODE(token);
    const { dataValues } = await User.findOne({ where: { email: payload.email } });
    const created = await BlogPost.create({ title,
      content,
      userId: dataValues.id,
      published: Date.now(),
      updated: Date.now() });
    for (let i = 0; i < categoryIds.length; i += 1) {
      PostCategory.create({ postId: created.dataValues.id, categoryId: categoryIds[i] });
    }
    return res.status(201).send(created);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const getAll = async (req, res) => {
  try {
    const result = await BlogPost.findAll({ include: [{ all: true, nested: true }] });
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BlogPost.findOne({ where: { id },
      include: [{ all: true, nested: true }] });
    console.log('Result', result);
    if (!result) {
      return res.status(404).send({
        message: 'Post does not exist',
      });
    }
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { email } = DECODE(req.headers.authorization);
    const user = await User.findOne({ where: { email } });
    const post = await BlogPost.findOne({ where: { id },
      include: [{ all: true, nested: true }] });
    const isTheSame = user.id === post.userId;
    if (isTheSame) {
      post.title = title;
      post.content = content;
      post.save();
      return res.status(200).send(post);
    }
    return res.status(401).send({ message: 'Unauthorized user' });
  } catch (error) {
    console.log(error);
  }
};
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = DECODE(req.headers.authorization);
    const { dataValues: user } = await User.findOne({ where: { email } });
    const post = await BlogPost.findOne({ where: { id },
      include: [{ all: true, nested: true }] });
    if (!post) {
      return res.status(404).send({ message: 'Post does not exist' });
    }
    if (user.id !== post.userId) {
      return res.status(401).send({ message: 'Unauthorized user' });
    }
    await post.destroy();
    return res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};