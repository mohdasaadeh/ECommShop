const { json } = require("express");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");

class UsersRepository extends Repository {
  async create(attrs) {
    const records = await this.getAll();
    attrs.id = this.randomID();
    const salt = crypto.randomBytes(8).toString("hex");
    const scrypt = util.promisify(crypto.scrypt);
    const bufHash = await scrypt(attrs.password, salt, 64);
    const hash = bufHash.toString("hex");
    const hashAndSalt = `${hash}.${salt}`;
    attrs.password = hashAndSalt;

    records.push(attrs);
    this.writeAll(records);

    return attrs;
  }

  async comparePassword(hashAndSalt, password) {
    const [oldHash, salt] = hashAndSalt.split(".");
    const scrypt = util.promisify(crypto.scrypt);
    const bufHash = await scrypt(password, salt, 64);
    const newHash = bufHash.toString("hex");

    return oldHash === newHash;
  }
}

module.exports = new UsersRepository("users.json");
