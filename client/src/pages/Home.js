import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  function handleClick(e) {
    navigate("/add-student");
  }
  return (
    <>
      <h1 className="title">Enroll Your Students For Classes</h1>

      <p>Click on the button below to add students to classes.</p>
      <Button variant="dark" onClick={handleClick}>
        Enroll Students
      </Button>
    </>
  );
};

export default Home;
