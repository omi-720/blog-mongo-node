const mongoose = require('mongoose');


const BlogSchema = new mongoose.Schema(
{
title: {
type: String,
required: [true, 'Title is required'],
minlength: [5, 'Title must be at least 5 characters'],
maxlength: [100, 'Title must be at most 100 characters'],
trim: true,
},
content: {
type: String,
required: [true, 'Content is required'],
minlength: [20, 'Content must be at least 20 characters'],
trim: true,
},
author: {
type: String,
required: [true, 'Author is required'],
match: [/^[A-Za-z\s]+$/, 'Author name must contain only letters and spaces'],
trim: true,
},
category: {
type: String,
enum: {
values: ['tech', 'lifestyle', 'education', 'travel'],
message: 'Category must be one of: tech, lifestyle, education, travel',
},
default: 'tech',
},
views: {
type: Number,
default: 0,
min: [0, 'Views cannot be negative'],
},
isPublished: {
type: Boolean,
default: false,
},
publishedAt: {
type: Date,
},
},
{
timestamps: true,
versionKey: false,
}
);


// Custom validation: if isPublished is true, publishedAt must be present
BlogSchema.pre('validate', function (next) {
if (this.isPublished && !this.publishedAt) {
this.invalidate('publishedAt', 'publishedAt is required when isPublished is true');
}
next();
});


const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;