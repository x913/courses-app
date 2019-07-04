const Course = require("./models/course");

(async () => {
  const course = new Course(
    "Airplane 2",
    "5566",
    "1.png",
    "7680de40-9db1-11e9-846c-7dc9c0ad09f7"
  );
  course.save();
})();
