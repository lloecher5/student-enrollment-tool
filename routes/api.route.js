const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//route used to get classes and students
router.get("/students", async (req, res, next) => {
  try {
    const students = await prisma.student.findMany({
      include: { classes: true },
    });

    const classes = await prisma.class.findMany({
      include: { students: true },
    });

    res.json({ students, classes });
  } catch (error) {
    next(error);
  }
});

//route used to add a new student
router.post("/students", async (req, res, next) => {
  try {
    const student = await prisma.student.create({
      data: {
        name: req.body.name,
        age: req.body.age,
        classes: {
          connect: { id: req.body.classId },
        },
      },
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
          connect: { id: req.body.classId },
        },
      },
    });

    res.json(student);
  } catch (error) {
    next(error);
  }
});

//route used to remove a student from specific class
router.put("/remove-class/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.update({
      where: { id: Number(id) },
      data: {
        classes: {
          disconnect: { id: req.body.classId },
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

//route used to delete a class
router.delete("/classes/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedClass = await prisma.class.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedClass);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
