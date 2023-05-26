const Account = require("./Account");
const Bill = require("./Bill");
const BillDetail = require("./BillDetail");
const Cart = require("./Cart");
const Event = require("./Event");
const Image = require("./Image");
const Permission = require("./Permission");
const Rate = require("./Rate");
const Role = require("./Role");
const RoleAccounts = require("./RoleAccounts");
const RolePermissions = require("./RolePermissions");
const Service = require("./Service");
const ServiceEvents = require("./ServiceEvents");
const TagServices = require("./TagServices");
const Tag = require("./Tag");
const User = require("./User");
const Category = require("./Category");

// Belongsto index
// @User
User.belongsTo(Account, { foreignKey: "accountId", targetKey: "id" });
Account.hasOne(User, { foreignKey: "accountId", sourceKey: "id" });

// @Bill
Bill.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
User.hasMany(Bill, { foreignKey: "userId", sourceKey: "id" });

//@BillDetail
BillDetail.belongsTo(Bill, { foreignKey: "billId", targetKey: "id" });
BillDetail.belongsTo(Service, { foreignKey: "serviceId", targetKey: "id" });
Bill.hasMany(BillDetail, { foreignKey: "billId", sourceKey: "id" });
Service.hasMany(BillDetail, { foreignKey: "serviceId", sourceKey: "id" });

//@Cart
Cart.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
Cart.belongsTo(Service, { foreignKey: "serviceId", targetKey: "id" });
User.hasMany(Cart, { foreignKey: "userId", sourceKey: "id" });
Service.hasMany(Cart, { foreignKey: "serviceId", sourceKey: "id" });

//@Image
Image.belongsTo(Service, { foreignKey: "serviceId", targetKey: "id" });
Service.hasMany(Image, { foreignKey: "serviceId", sourceKey: "id" });

//@Rate
Rate.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
Rate.belongsTo(Service, { foreignKey: "serviceId", targetKey: "id" });
User.hasMany(Rate, { foreignKey: "userId", sourceKey: "id" });
Service.hasMany(Rate, { foreignKey: "serviceId", sourceKey: "id" });

//RoleAccounts
RoleAccounts.belongsTo(Role, { foreignKey: "roleId", targetKey: "id" });
RoleAccounts.belongsTo(Account, { foreignKey: "accountId", targetKey: "id" });
Role.hasMany(RoleAccounts, { foreignKey: "roleId", sourceKey: "id" });
Account.hasMany(RoleAccounts, { foreignKey: "accountId", sourceKey: "id" });

//@RolePermissions
RolePermissions.belongsTo(Role, { foreignKey: "roleId", targetKey: "id" });
RolePermissions.belongsTo(Permission, {
  foreignKey: "permissionId",
  targetKey: "id",
});
Role.hasMany(RolePermissions, { foreignKey: "roleId", sourceKey: "id" });
Permission.hasMany(RolePermissions, {
  foreignKey: "permissionId",
  sourceKey: "id",
});

//@Service
Service.belongsTo(Category, { foreignKey: "categoryId", targetKey: "id" });
Category.hasOne(Service, { foreignKey: "categoryId", sourceKey: "id" });

//@ServiceEvents
ServiceEvents.belongsTo(Service, { foreignKey: "serviceId", targetKey: "id" });
ServiceEvents.belongsTo(Event, { foreignKey: "eventId", targetKey: "id" });
Service.hasMany(ServiceEvents, { foreignKey: "serviceId", sourceKey: "id" });
Event.hasMany(ServiceEvents, { foreignKey: "eventId", sourceKey: "id" });

//@TagServices
TagServices.belongsTo(Tag, { foreignKey: "tagId", targetKey: "id" });
TagServices.belongsTo(Service, { foreignKey: "serviceId", targetKey: "id" });
Service.hasMany(TagServices, { foreignKey: "serviceId", sourceKey: "id" });
Tag.hasMany(TagServices, { foreignKey: "tagId", sourceKey: "id" });
