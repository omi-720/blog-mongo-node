const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogController');


router.post('/blogs', controller.createBlog);
router.get('/blogs', controller.getAllBlogs);
router.get('/blogs/:id', controller.getBlogById);
router.patch('/blogs/:id', controller.updateBlog);
router.delete('/blogs/:id', controller.deleteBlog);


module.exports = router;