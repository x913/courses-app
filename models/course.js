const uuidv1 = require("uuid/v1");
const fs = require("fs");
const path = require("path");

class Course {
  constructor(title, price, image, id = null) {
    this.title = title;
    this.price = price;
    this.image = image;
    if (id === null) {
      this.id = uuidv1();
    } else {
      this.id = id;
    }
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(Course.storagePath(), "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }

  static async find(id) {
    const courses = await Course.getAll();
    return courses.find(a => a.id === id);
  }

  static storagePath() {
    return path.join(__dirname, "..", "data", "courses.json");
  }

  static saveAll() {
    fs.writeFileSync(Course.storagePath(), this);
  }

  async save() {
    const courses = await Course.getAll();
    console.log(courses);
    const currentCourse = courses.find(a => a.id === this.id);
    if (currentCourse) {
      currentCourse.title = this.title;
      currentCourse.price = this.price;
      currentCourse.image = this.image;
    } else {
      courses.push(this);
    }
    return new Promise((resolve, reject) => {
      fs.writeFile(Course.storagePath(), JSON.stringify(courses), err => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

module.exports = Course;
