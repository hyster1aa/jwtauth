module.exports = class userDto {
    surname;
    id;

    constructor(model) {
        this.surname = model.u_surname;
        this.id = model.user_id;
    }
}