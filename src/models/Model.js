import React, { useLocation, useState, useNavigate, useCallback } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  InputGroup,
  FormControl,
  Dropdown,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import "./Model.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

import axios from "axios";

import MacdOptions from "./MacdOptions";
import { getQuote, getMacdActions } from "../helper/HelperFuncs";

//async function to get live stock quote data
//labels (x-axis) time
//data (y-axis) closing price

//chartjs plugin annotation
//async function get buying and selling points
//determine x and y value
//annotate red and green

Chart.register(annotationPlugin);
const baseURL = "http://127.0.0.1:5000";

function Model({ setModel, model, ticker }) {
  const [quote, setQuote] = useState({
    labels: "Empty",
    datasets: [{ label: "Empty", data: [] }],
  });
  const [triggers, setTriggers] = useState({});
  const [unixTimes, setUnixTimes] = useState([]);

  const [show, setShow] = useState(false);
  const [options, setOptions] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMacdRun = async (
    slow,
    fast,
    signal,
    interval,
    shares,
    price,
    cash,
    usePeriod,
    period,
    start,
    end,
    agg
  ) => {
    getQuote(
      ticker,
      start,
      end,
      usePeriod,
      period,
      interval,
      setQuote,
      setUnixTimes
    );
    getMacdActions(
      slow,
      fast,
      signal,
      interval,
      shares,
      price,
      cash,
      usePeriod,
      period,
      start,
      end,
      agg,
      setTriggers,
      triggers,
      unixTimes
    );
  };

  const testOptions = {
    plugins: {
      autocolors: false,
      annotation: {
        annotations: triggers,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
    responsive: true,
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">{ticker}</Navbar.Brand>
          <Navbar id="basic-navbar-nav">
            <Nav className="me-auto">
              <Dropdown className="m-1">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {model}
                </Dropdown.Toggle>
                <Button variant="primary" className="" onClick={handleShow}>
                  Options
                </Button>
                <MacdOptions
                  handleClose={handleClose}
                  show={show}
                  options={options}
                  setOptions={setOptions}
                  handleMacdRun={handleMacdRun}
                />

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
            </Nav>
          </Navbar>
        </Container>
      </Navbar>
      <div className="graphArea">
        <Line data={quote} options={testOptions} />
      </div>
    </div>
  );
}

export default Model;
