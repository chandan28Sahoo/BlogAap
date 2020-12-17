const like_comments = require("../model/all_model").like_dislike_comment;

module.exports = class SerVice {
    async findAllLikeComments() {
        return await like_comments.query();
    }

    async check_by_user_id(user_id) {
        return await like_comments.query().findOne({ user_id: user_id });
    }
    async create_like(details) {
        return await like_comments.query().insertGraph(details);
    }
    async updateById(id, details) {
        console.log(details);
        const updateRiddles = await like_comments.query().findById(id);
        // console.log(updateRiddles, "44555");
        const updated = await updateRiddles.$query().patch(details);
        // console.log(updated, "dfghj");
        return updated;
    }

    async findAll(user_id) {
        const data = await like_comments
            .query()
            .withGraphFetched("users")
            .withGraphFetched("blog")
            .findOne({ user_id: user_id });
        return data;
    }
};