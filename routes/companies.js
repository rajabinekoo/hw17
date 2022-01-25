const express = require("express");
const router = express.Router();
const { Company } = require("../database/model/company");
const companyValidator = require("../validation/company");

router.get("/", async function (_req, res) {
  try {
    const companies = await Company.find();
    res.render("company", {
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

router.get("/:id", async function (req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).send({ msg: "id param is empty!" });
    }
    const targetCompany = await Company.findById(req.params.id);
    res.render("companyInfo", {
      company: targetCompany,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

router.post("/", companyValidator, async function (req, res) {
  try {
    await Company.create(req.body);
    res.status(201).send({});
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

router.put("/:id", companyValidator, async function (req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).send({ msg: "id param is empty!" });
    }
    await Company.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({});
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).send({ msg: "id param is empty!" });
    }
    await Company.findByIdAndDelete(req.params.id);
    res.status(200).send({});
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

module.exports = router;
