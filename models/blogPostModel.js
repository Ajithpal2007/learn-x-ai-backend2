import mongoose from 'mongoose';

const blogPostSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, default: 'https://via.placeholder.com/800x400/EBF5FF/1D4ED8?text=Learn-X-AI' },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;