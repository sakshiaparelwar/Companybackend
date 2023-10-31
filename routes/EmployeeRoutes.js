const express = require("express");
const router = express.Router();
const employeeSchema = require("../schema/employeeSchema");

router.post("/create-employee", (req, res, next) => {
  employeeSchema.create(req.body, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});

router.get("/", (req, res, next) => {
  employeeSchema.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});

router.post("/login", (req, res, next) => {
  const { name, phone, email, password } = req.body;
  employeeSchema.findOne({ email }).then((employee) => {
    if (employee) {
      if (employee.password === password) {
        res.json("login successfull");
      } else {
        res.json("password incorrect");
      }
    } else {
      res.json("No record found");
    }
  });
});

router.delete("/delete-employee/:id", (req, res, next) => {
  employeeSchema.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});

router
  .route("/update-employee/:id")
  .get((req, res, next) => {
    employeeSchema.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      } else {
        return res.json(data);
      }
    });
  })
  .put((req, res, next) => {
    employeeSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      (err, data) => {
        if (err) {
          return next(err);
        } else {
          return res.json(data);
        }
      }
    );
  });

module.exports = router;
