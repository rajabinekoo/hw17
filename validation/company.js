const validator = require("validator");

function companyValidator(req, res, next) {
  const { name, registrationNumber, city, state, createdAt, phoneNumber } =
    req.body;
  if (
    !name?.trim() ||
    !registrationNumber?.trim() ||
    !city?.trim() ||
    !state?.trim() ||
    !phoneNumber?.trim()
  ) {
    return res.status(400).send({ msg: "Invalid inputs" });
  }
  if (name.length < 3) {
    return res.status(400).send({ msg: "name length must be greater then 3" });
  }
  if (!!createdAt?.trim() && !validator.isDate(createdAt)) {
    return res.status(400).send({ msg: "createdAt should be date format" });
  }
  if (!validator.isMobilePhone(phoneNumber, "fa-IR")) {
    return res.status(400).send({ msg: "Invalid phone number" });
  }
  next();
}

module.exports = companyValidator;
