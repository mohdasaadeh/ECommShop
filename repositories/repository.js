const { json } = require("express");
const fs = require("fs");
const crypto = require("crypto");

module.exports = class Repository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Please Enter the Filename!");
    }

    this.filename = filename;

    try {
      fs.accessSync(filename);
    } catch (err) {
      fs.writeFileSync(filename, "[]");
    }
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, { encoding: "utf8" })
    );
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomID() {
    return crypto.randomBytes(4).toString("hex");
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    this.writeAll(filteredRecords);
  }

  async getOne(attrs) {
    const records = await this.getAll();
    return records.find((record) => {
      let attrCheck = true;
      for (let attr in attrs) {
        if (attrs[attr] !== record[attr]) {
          attrCheck = false;
        }
      }
      return attrCheck;
    });
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  }
};
