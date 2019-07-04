const fs = require("fs");
const path = require("path");

const storage = path.join(
  path.dirname(process.mainModule.filename),
  "data/card.json"
);

class Card {
  static async add(course) {
    console.log(course);

    const card = await Card.fetch();
    const currentCourse = card.courses.find(a => a.id == course.id);
    console.log(currentCourse);
    if (!currentCourse) {
      course.count = 1;
      card.courses.push(course);
    } else {
      currentCourse.count++;
    }
    card.price += +course.price;
    return new Promise((resolve, reject) => {
      fs.writeFile(storage, JSON.stringify(card), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();
    let idx = card.courses.findIndex(a => a.id === id);
    if (idx === -1) return card;
    card.price -= card.courses[idx].price;
    if (--card.courses[idx].count === 0) {
      card.courses.splice(idx, 1);
    }
    return new Promise((resolve, reject) => {
      fs.writeFile(storage, JSON.stringify(card), err => {
        if (err) {
          reject(err);
        } else {
          resolve(card);
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(storage, "utf-8", (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      });
    });
  }
}

module.exports = Card;
