const blog = require("../model/all_model").blog;

module.exports = class SerVice {
    async findBlog() {
        return await blog.query();
    }
    async check_by_title(title) {
        return await blog.query().findOne({ title: title });
    }
    async create_blog(details) {
        return await blog.query().insertGraph(details);
    }

    async findAll(users_id) {
        const data = await blog
            .query()
            .withGraphFetched("users")
            // .withGraphFetched("blog")
            .findOne({ users_id: users_id });
        return data;
    }
};