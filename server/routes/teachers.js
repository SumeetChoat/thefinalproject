const { Router } = require("express");
const authenticator = require("../middleware/authenticator");
const teacherController = require("../controllers/teachers");

const teacherRouter = Router();

// teacherRouter.use(authenticator)

teacherRouter.post("/assignment", teacherController.createAssignment);
teacherRouter.patch("/assignment", teacherController.updateAssignment);
teacherRouter.get("/students", teacherController.getStudents);
teacherRouter.get("/assignments", teacherController.getCreatedAssignments);

teacherRouter.delete("/assignment", teacherController.deleteAssignment);
teacherRouter.delete("/student", teacherController.removeStudent);
teacherRouter.delete("/delete", teacherController.deleteTeacher);

module.exports = teacherRouter;
