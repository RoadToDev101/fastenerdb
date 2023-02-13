const mongoose = require("mongoose");

const threadTypeSchema = new mongoose.Schema({
  threadTypeId: {
    type: String,
    required: true,
    unique: true,
  },
  threadTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const headTypeSchema = new mongoose.Schema({
  headTypeId: {
    type: String,
    required: true,
    unique: true,
  },
  headTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const driveTypeSchema = new mongoose.Schema({
  driveTypeId: {
    type: String,
    required: true,
    unique: true,
  },
  driveTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const pointTypeSchema = new mongoose.Schema({
  pointTypeId: {
    type: String,
    required: true,
    unique: true,
  },
  pointTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const shankTypeSchema = new mongoose.Schema({
  shankTypeId: {
    type: String,
    required: true,
    unique: true,
  },
  shankTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const featureSchema = new mongoose.Schema({
  headType: {
    headTypeId: {
      type: mongoose.Types.ObjectId,
      ref: "HeadType",
    },
  },
  driveType: {
    driveTypeId: {
      type: mongoose.Types.ObjectId,
      ref: "DriveType",
    },
  },
  pointType: {
    pointTypeId: {
      type: mongoose.Types.ObjectId,
      ref: "PointType",
    },
  },
  shankType: {
    [shankTypeId]: {
      type: mongoose.Types.ObjectId,
      ref: "ShankType",
    },
  },
  threadType: {
    [threadTypeId]: {
      type: mongoose.Types.ObjectId,
      ref: "ThreadType",
    },
    topThreadAngle: {
      type: Number,
    },
    bottomThreadAngle: {
      type: Number,
    },
  },
});

const applicationsSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: true,
    unique: true,
  },
  applicationName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const coatingSchema = new mongoose.Schema({
  coatingId: {
    type: String,
    unique: true,
    required: true,
  },
  coatingName: {
    type: String,
    unique: true,
    required: true,
  },
});

const materialSchema = new mongoose.Schema({
  materialId: {
    type: String,
    required: true,
    unique: true,
  },
  materialName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const productionDrawingSchema = new mongoose.Schema({
  drawingName: {
    type: String,
  },
  version: {
    type: String,
  },
  file: {
    type: Buffer,
  },
  revisedDate: {
    type: Date,
    default: Date.now,
  },
});

productionDrawingSchema.index({ drawingName: 1, version: 1 }, { unique: true });

const codeReportSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  file: {
    type: Buffer,
  },
  revisedDate: {
    type: Date,
    default: Date.now,
  },
});

const SKUSchema = new mongoose.Schema({
  SKUcode: {
    type: String,
    unique: true,
    required: true,
  },
  packagingQuantity: {
    type: Number,
  },
  isCollated: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const commercialDimensionSchema = new mongoose.Schema({
  overallLength: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  headDiameter: {
    type: Number,
  },
  threadLength: {
    type: Number,
  },
  shankDiameter: {
    type: Number,
  },
  nailGauge: {
    type: String,
  },
});

const mechanicalPropertiesSchema = new mongoose.Schema({
  yieldStrength: {
    type: String,
  },
  tensionStrength: {
    type: String,
  },
  shearStrength: {
    type: String,
  },
  torsionalStrength: {
    type: String,
  },
  coreHardness: {
    type: String,
  },
  surfaceHardness: {
    type: String,
  },
});

const loadTypeSchema = new mongoose.Schema({
  lowerLoad: {
    type: Number,
  },
  upperLoad: {
    type: Number,
  },
});

const wtwWithdrawalLoadSchema = new mongoose.Schema({
  minEmbedmentThreadLength: {
    type: Number,
  },
  load: loadTypeSchema,
});

const wtwShearLoadSchema = new mongoose.Schema({
  woodSideMemberThickness: {
    type: Number,
  },
  load: loadTypeSchema,
});

const stwShearLoadSchema = new mongoose.Schema({
  steelThickness: {
    type: Number,
  },
  load: loadTypeSchema,
});

const allowableLoadSchema = new mongoose.Schema({
  woodToWood: {
    withdrawal: [wtwWithdrawalLoadSchema],
    shear: [wtwShearLoadSchema],
    steelToWood: {
      shear: [stwShearLoadSchema],
    },
  },
});

const modelSchema = new mongoose.Schema({
  modelNumber: {
    type: String,
    unique: true,
    required: true,
  },
  features: featureSchema,
  commercialDimensions: commercialDimensionSchema,
  SKUs: [SKUSchema],
  mechanicalProperties: mechanicalPropertiesSchema,
  screwAllowableLoads: allowableLoadSchema,
});

const productSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
  },
  modelName: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  models: [modelSchema],
  materialId: {
    type: mongoose.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  coatings: {
    coatingId: {
      type: mongoose.Types.ObjectId,
      ref: "Coating",
      required: true,
    },
    layer: {
      type: Number,
      unique: true,
      required: true,
    },
    thickness: {
      type: Number,
    },
  },
  productionDrawings: [productionDrawingSchema],
  codeReports: [codeReportSchema],
  applicationsID: {
    type: mongoose.Types.ObjectId,
    ref: "Applications",
    required: true,
  },
});

const roleSchema = new mongoose.Schema({
  roleID: {
    type: String,
    required: true,
    unique: true,
  },
  roleName: {
    type: String,
    required: true,
    unique: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, // `username` must be unique
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roleID: {
    type: mongoose.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

const ThreadType = mongoose.model("ThreadType", threadTypeSchema);
const HeadType = mongoose.model("HeadType", headTypeSchema);
const DriveType = mongoose.model("DriveType", driveTypeSchema);
const PointType = mongoose.model("PointType", pointTypeSchema);
const ShankType = mongoose.model("ShankType", shankTypeSchema);
const Role = mongoose.model("Role", roleSchema);
const Application = mongoose.model("Applications", applicationsSchema);
const Coating = mongoose.model("Coating", coatingSchema);
const Material = mongoose.model("Material", materialSchema);
const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  Product,
  ThreadType,
  HeadType,
  DriveType,
  PointType,
  ShankType,
  Material,
  Coating,
  Application,
  User,
  Role,
};
