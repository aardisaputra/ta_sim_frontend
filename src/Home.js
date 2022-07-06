import logo from "./logo.svg";
import "./Home.css";
import {
  Container,
  Row,
  InputGroup,
  FormControl,
  Dropdown,
  Button,
} from "react-bootstrap";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Home({ setTicker, setModel, model, ticker }) {
  const navigate = useNavigate();

  const launchBtn = useCallback(
    () =>
      navigate("/model", {
        replace: true,
      }),
    [navigate]
  );

  return (
    <div className="App">
      <Container fluid className="fill">
        <h1>TA Simulator</h1>
        <p>By yours truly</p>
        <Row className="justify-content-center">
          <Dropdown className="m-1">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {ticker}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setTicker("TSLA")}>
                TSLA
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTicker("AAPL")}>
                AAPL
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTicker("NOTJJ")}>
                LOVE
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="m-1">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {model}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setModel("MACD")}>
                MACD
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setModel("JOJO")}>
                IHATE
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setModel("COCK")}>
                BRADLEYLOVES
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button variant="primary" className="col-3 m-1" onClick={launchBtn}>
            Launch
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
