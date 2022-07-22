import axios from "axios";
import { React, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./AddStudent.css";

function AddStudent() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [subject, setSubject] = useState("");
  const [classes, setClasses] = useState("");
  let classId;

  //get classes
  useEffect(() => {
    axios.get("/api/students").then((res) => {
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

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //set the classId
    for (let sub of classes) {
      if (subject === sub.name) {
        classId = sub.id;
      }
    }

    axios
      .post("/api/students", {
        name: fullName,
        age: age,
        classId: classId,
      })
      .then((res) => {
        navigate("/students");
      });
  };
  return (
    <div className="add-student">
      <h1>Enroll Student in New Class</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="full-name">Full Name: </label>
          <br />
          <input
            type="text"
            id="first-name"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            autoComplete="off"
            required
          />
        </p>

        <p>
          <label htmlFor="age">Age: </label>
          <br />
          <input
            type="number"
            id="age"
            onChange={(e) => setAge(Number(e.target.value))}
            value={age}
            autoComplete="off"
            required
          />
        </p>
        <p>
          <label htmlFor="class-select">Class: </label>
          <br />
          <select
            name="classes"
            id="class-select"
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            {selectOptions.map((select, index) => (
              <option key={index} value={select}>
                {select}
              </option>
            ))}
          </select>
        </p>
        <Button variant="dark" type="submit">
          Enroll Student
        </Button>
      </form>
    </div>
  );
}

export default AddStudent;
