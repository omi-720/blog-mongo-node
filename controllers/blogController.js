const Blog = require('../models/Blog');
await blog.save();
try{
res.status(201).json({ success: true, data: blog });
}
 catch (err) {
next(err);

};


// Get all blogs, optional filter by category
exports.getAllBlogs = async (req, res, next) => {
try {
const filter = {};
if (req.query.category) {
filter.category = req.query.category;
}
const blogs = await Blog.find(filter).sort({ createdAt: -1 });
res.json({ success: true, count: blogs.length, data: blogs });
} catch (err) {
next(err);
}
};


// Get a single blog by ID and increment views
exports.getBlogById = async (req, res, next) => {
try {
const { id } = req.params;
const blog = await Blog.findById(id);
if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });


// increment views manually
blog.views = (blog.views || 0) + 1;
await blog.save();


res.json({ success: true, data: blog });
} catch (err) {
next(err);
}
};


// Update blog: run validators
exports.updateBlog = async (req, res, next) => {
try {
const { id } = req.params;
const updated = await Blog.findByIdAndUpdate(id, req.body, {
new: true,
runValidators: true,
context: 'query',
});
if (!updated) return res.status(404).json({ success: false, message: 'Blog not found' });
res.json({ success: true, data: updated });
} catch (err) {
next(err);
}
};


// Delete blog
exports.deleteBlog = async (req, res, next) => {
try {
const { id } = req.params;
const deleted = await Blog.findByIdAndDelete(id);
if (!deleted) return res.status(404).json({ success: false, message: 'Blog not found' });
res.json({ success: true, message: 'Blog deleted' });
} catch (err) {
next(err);
}
};