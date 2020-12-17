const Users = require("../model/all_model").users;

module.exports = class UserService {
    async findAll() {
        return await Users.query();
    }

    async createUsers(details) {
        return await Users.query().insertGraph(details);
    }
    async check_user(email) {
        return await Users.query().findOne({ email: email });
    }
    async check_by_Name(name) {
        return await Users.query().findOne({ name: name });
    }
    async updateByEmail(email, details) {
        console.log(details);
        const updateRiddles = await Users.query().findOne({ email: email });
        const updated = await updateRiddles.$query().patch(details);
        return updated;
    }

    async deleteByName(name) {
        console.log("sdfghjk");
        const deleteRiddles = await Users.query().findOne({ name: name });
        const deletes = await deleteRiddles.$query().delete();
        return deletes;
    }
};