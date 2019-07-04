const fs = require("fs");

const readJSON = async filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const remove = (id, card) => {
  let idx = card.courses.findIndex(a => a.id === id);
  if (idx === -1) return card;
  card.price -= card.courses[idx].price;
  if (--card.courses[idx].count === 0) {
    card.courses.splice(idx, 1);
  }
  return card;
};

(async () => {
  const data = await readJSON("./data/card.json");
  let newCard = remove("7e9b25e0-9db1-11e9-821f-e753376868bc", data);
  newCard = remove("7e9b25e0-9db1-11e9-821f-e753376868bc", data);
  newCard = remove("7e9b25e0-9db1-11e9-821f-e753376868bc", data);
  newCard = remove("7e9b25e0-9db1-11e9-821f-e753376868bc", data);
  console.log(newCard);
})();
