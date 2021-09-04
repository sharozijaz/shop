const fs = require("fs");
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
    const records = await this.getAll();
    records.push(attrs);
    await fs.promises.writeFile(this.filename, JSON.stringify(records));
  }
}
const repo = new UserRepository("users.json");
