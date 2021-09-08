const fs = require("fs");
const crypto = require("crypto");
class UserRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a Repo, require a filename");
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }
  async create(attrs) {
    attrs.id = this.randomId();
    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
  }
  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }
  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }
  async getOne(id) {
    const records = await this.getAll();
    return records.find((records) => records.id === id);
  }
  async delete(id) {
    const records = await this.getAll();
    return (filterRecords = records.filter((record) => record.id !== id));
    await this.writeAll(filterRecords);
  }
}
const repo = new UserRepository("users.json");
