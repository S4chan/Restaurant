const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const restaurants = require("./public/jsons/restaurant.json").results;
const BASE_IMG_URL =
  "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/";

//元寫法 app.use(express.static("public"));
app.use("/public", express.static("public"));
app.use("/javascripts", express.static("public/javascripts"));
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

app.get("/restaurants", (req, res) => {
  res.render("index", { restaurants, BASE_IMG_URL });
});

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find(
    (restaurant) => restaurant.id.toString() === id
  );
  res.render("show", { restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.trim();
  const matchRestaurants = restaurants.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.category.toLowerCase().includes(keyword.toLowerCase())
  );

  res.render("index", { restaurants: matchRestaurants });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
