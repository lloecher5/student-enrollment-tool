const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//route used to get all students
router.get("/students", async (req, res, next) => {
  try {
    const students = await prisma.student.findMany({
      include: { class: true },
    });

    const classes = await prisma.class.findMany({
      include: { students: true },
    });
    res.json({ students, classes });
  } catch (error) {
    next(error);
  }
});

//route used to get an individual product
router.get("/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.student.findUnique({
      where: { id: Number(id) },
      include: { class: true },
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
});

//route used to add a new product
router.post("/students", async (req, res, next) => {
  try {
    const student = await prisma.student.create({
      data: req.body,
    });
    res.json(student);
  } catch (error) {
    next(error);
  }
});

//route used to delete a product
router.delete("/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStudent = await prisma.student.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedStudent);
  } catch (error) {
    next(error);
  }
});

//route used to update a product
router.patch("/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      include: {
        class: true,
      },
    });
    res.json(student);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
