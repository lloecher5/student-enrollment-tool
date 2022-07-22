import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Classes.css";

import { Button, Card } from "react-bootstrap";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState("");

  useEffect(() => {
    axios.get("/api/students").then((res) => {
      setClasses(res.data.classes);
    });
  }, []);

  const addNewClass = (e) => {
    e.preventDefault();
    axios
      .post("/api/classes", {
        name: newClass,
      })
      .then((res) => {
        window.location.reload();
      });
  };

  const deleteClass = (e) => {
    console.log(e.target);
    e.preventDefault();
    axios.delete(`/api/classes/${e.target.id}`).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div className="classes">
      <h1>Current Classes Offered</h1>

      <div className="class-list">
        {classes.map((subject) => (
          <Card key={subject.id} style={{ width: "18rem" }}>
            <Card.Body className="text">
              <Card.Title> {subject.name} </Card.Title>
              <Card.Text>
                <b>Number of students enrolled:</b> {subject.students.length}
              </Card.Text>
              <Button variant={"danger"} onClick={deleteClass} id={subject.id}>
                Delete Class
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <form>
        <input
          type="text"
          onChange={(e) => setNewClass(e.target.value)}
          value={newClass}
          autoComplete="off"
          required
        />
        <br></br>
        <br></br>
        <Button variant={"success"} onClick={addNewClass}>
          Add New Class
        </Button>
      </form>
    </div>
  );
}

export default Classes;
