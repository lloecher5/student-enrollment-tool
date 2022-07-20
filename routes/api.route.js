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

//route used to get an individual student
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

//route used to add a new student
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

//route used to add a new class

router.post("/classes", async (req, res, next) => {
  try {
    const subject = await prisma.class.create({
      data: req.body,
    });
    res.json(subject);
  } catch (error) {
    next(error);
  }
});

//route used to delete a student
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

//route used to assign new class to student
router.put("/add-class/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.update({
      where: { id: Number(id) },
      data: {
        classes: {
          connect: { id: 3 },
        },
      },
    });

    res.json(student);
  } catch (error) {
    next(error);
  }
});

//route used to remove a student from specific class
//remove a given student from a class
router.put("/remove-class/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.update({
      where: { id: Number(id) },
      data: {
        classes: {
          disconnect: { id: 2 },
        },
      },
    });

    res.json(student);
  } catch (error) {
    next(error);
  }
});

//route used to update a student
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
