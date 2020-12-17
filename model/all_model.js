const { Model } = require("objection");
const knex = require("../config/config");
Model.knex(knex);

const unique = require("objection-unique")({
    fields: ["email"],
    identifiers: ["id"],
});

class users extends unique(Model) {
    // Table name is the only required property.
    static get tableName() {
        return "users";
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["email"],

            properties: {
                id: { type: "integer" },
                fname: { type: "string" },
                username: { type: "string" },
                email: { type: "string" },
                phone_no: { type: "string" },
                password: { type: "string" },
            },
        };
    }
}

class blog extends unique(Model) {
    // Table name is the only required property.
    static get tableName() {
        return "blog";
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["title", "article"],

            properties: {
                id: { type: "integer" },
                title: { type: "string" },
                article: { type: "string" },
                users_id: { type: "integer" },
            },
        };
    }
    static get relationMappings() {
        return {
            users: {
                relation: Model.HasOneRelation,
                modelClass: users,
                join: {
                    from: "blog.users_id",
                    to: "users.id",
                },
            },
            // blog: {
            //     relation: Model.HasOneRelation,
            //     modelClass: blog,
            //     join: {
            //         from: "like_dislike_comment.post_id",
            //         to: "blog.id",
            //     },
            // },
        };
    }
}
class like_dislike_comment extends unique(Model) {
    // Table name is the only required property.
    static get tableName() {
        return "like_dislike_comment";
    }
    static get jsonSchema() {
        return {
            type: "object",

            properties: {
                id: { type: "integer" },
                post_id: { type: "integer" },
                users_id: { type: "integer" },
                like: { type: "string" },
                dislike: { type: "string" },
                comment: { type: "string" },
            },
        };
    }
    static get relationMappings() {
        return {
            users: {
                relation: Model.HasOneRelation,
                modelClass: users,
                join: {
                    from: "like_dislike_comment.user_id",
                    to: "users.id",
                },
            },
            blog: {
                relation: Model.HasOneRelation,
                modelClass: blog,
                join: {
                    from: "like_dislike_comment.post_id",
                    to: "blog.id",
                },
            },
        };
    }
}



module.exports = { users, blog, like_dislike_comment };
