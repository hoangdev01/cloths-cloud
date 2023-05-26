const SequelizeSlugify = require("sequelize-slugify");

const Bill = require("./Bill");
const Cart = require("./Cart");
const Event = require("./Event");
const Rate = require("./Rate");
const Service = require("./Service");
const Tag = require("./Tag");
const User = require("./User");

SequelizeSlugify.slugifyModel(Tag, {
  source: ["name"],
  suffixSource: ["description"],
});
SequelizeSlugify.slugifyModel(Service, {
  source: ["name"],
  suffixSource: ["description"],
});
SequelizeSlugify.slugifyModel(Event, {
  source: ["name"],
  suffixSource: ["description"],
});
SequelizeSlugify.slugifyModel(Bill, {
  source: ["totalPrice"],
});
SequelizeSlugify.slugifyModel(Cart, {
  source: ["amount"],
});
SequelizeSlugify.slugifyModel(Rate, {
  source: ["date"],
  suffixSource: ["quality"],
});
SequelizeSlugify.slugifyModel(User, {
  source: ["name"],
});
