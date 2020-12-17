exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("fname", 255).notNullable();
        table.string("lname", 255).notNullable();
        table.string("username", 255).notNullable();
        table.string("email", 255).notNullable();
        table.string("phone_no", 250).notNullable();
        table.string("password", 255).notNullable();
    });
    await knex.schema.createTable("blog", (table) => {
        table.increments("id").primary();
        table.string("title", 100).notNullable();
        table.string("article", 10485760).notNullable();
        table.integer("users_id").references("users.id");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
    await knex.schema.createTable("like_dislike_comment", function(table) {
        table.increments("id").primary();
        table.integer("post_id").references("blog.id");
        table.integer("user_id").references("users.id");
        table.string("like");
        table.string("dislike");
        table.string("comment");
    });
    return true;
};

exports.down = async function(knex) {
    await knex.schema.dropTable("like_dislike_comment");
    await knex.schema.dropTable("blog");
    await knex.schema.dropTable("users");
    return true;
};