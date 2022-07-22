import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Classes.css";

import { Card } from "react-bootstrap";

function ClassRosters() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get("/api/students").then((res) => {
      setClasses(res.data.classes);
    });
  }, []);

  console.log(classes);

  return (
    <div className="classes">
      <h1>Class Rosters</h1>

      <div className="class-list">
        {classes.map((subject) => (
          <Card key={subject.id} style={{ width: "18rem" }}>
            <Card.Body className="text">
              <Card.Title> {subject.name} </Card.Title>
              <Card.Text>
                <ul>
                  {subject.students.map((student) => (
                    <li>{student.name}</li>
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ClassRosters;
