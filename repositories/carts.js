const { json } = require("express");
const Repository = require("./repository");

class CartsRepository extends Repository {
  async create(attrs) {
    const records = await this.getAll();
    attrs.id = this.randomID();

    records.push(attrs);
    this.writeAll(records);

    return attrs;
  }
}

module.exports = new CartsRepository("carts.json");
