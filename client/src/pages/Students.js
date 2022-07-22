import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Students.css";

import { Card, Button } from "react-bootstrap";

function Students() {
  const [students, setStudents] = useState([]);
  const [newClass, setNewClass] = useState("");
  const [classes, setClasses] = useState("");

  let classId;

  //get students and classes
  useEffect(() => {
    axios.get("/api/students").then((res) => {
      setStudents(res.data.students);
      setClasses(res.data.classes);
    });
  }, []);

  //get of all of the classes and their ids together
  const options = {};
  for (let subject of classes) {
    if (options[subject.id]) {
      continue;
    } else {
      options[subject.id] = subject.name;
    }
  }
  const selectOptions = [];

  for (let option in options) {
    selectOptions.push(options[option]);
  }

  const deleteStudent = (e) => {
    e.preventDefault();

    axios.delete(`/api/students/${e.target.id}`).then((res) => {
      window.location.reload();
    });
  };

  const addClass = (e) => {
    e.preventDefault();
    //set the classId
    for (let sub of classes) {
      if (newClass === sub.name) {
        classId = sub.id;
      }
    }

    axios
      .put(`/api/add-class/${e.target.id}`, {
        classId: classId,
      })
      .then((res) => {
        window.location.reload();
      });
  };

  const deleteClass = (e) => {
    e.preventDefault(e);

    //set the classId
    for (let sub of classes) {
      if (e.target.dataset.val === sub.name) {
        classId = sub.id;
      }
    }

    axios
      .put(`/api/remove-class/${e.target.id}`, {
        classId: classId,
      })
      .then((res) => {
        window.location.reload();
      });
  };
  return (
    <div className="students">
      <h1>Current Students Enrolled</h1>

      <div className="student-list">
        {students.map((student) => (
          <Card key={student.id} style={{ width: "18rem" }}>
            <Card.Body className="text">
              <Card.Title>Name: {student.name}</Card.Title>
              <Card.Text>
                <b>Age:</b> {student.age}
                <br></br>
                <b>Classes: </b>
                <ul>
                  {student.classes.map((subject) => (
                    <>
                      <li key={subject.id}>{subject.name}</li>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        id={student.id}
                        data-val={subject.name}
                        onClick={deleteClass}
                      >
                        Remove Class
                      </Button>
                    </>
                  ))}
                </ul>
                <br />
                <div>
                  <select
                    name="classes"
                    id="class-select"
                    onChange={(e) => setNewClass(e.target.value)}
                  >
                    <option value="">--Please choose an option--</option>
                    {selectOptions.map((select, index) => (
                      <option key={index} value={select}>
                        {select}
                      </option>
                    ))}
                  </select>
                  <br></br>
                  <br></br>
                  <Button
                    variant={"success"}
                    id={student.id}
                    onClick={addClass}
                  >
                    Add class
                  </Button>
                </div>
              </Card.Text>
              <Button
                variant={"danger"}
                id={student.id}
                onClick={deleteStudent}
              >
                Drop Out
              </Button>
              <br></br>
              <br></br>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Students;
