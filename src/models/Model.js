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
import RsiOptions from "./RsiOptions";
import { getQuote, getMacdActions, getRsiActions } from "../helper/HelperFuncs";

Chart.register(annotationPlugin);
const baseURL = "http://127.0.0.1:5000";

function Model({ setModel, model, ticker }) {
  const [quote, setQuote] = useState({
    labels: "Empty",
    datasets: [{ label: "Empty", data: [] }],
  });
  const [triggers, setTriggers] = useState({});
  const [unixTimes, setUnixTimes] = useState([]);

  const [showMacd, setMacdShow] = useState(false);
  const [showRsi, setShowRsi] = useState(false);
  const [options, setOptions] = useState([]);

  const [returns, setReturns] = useState(0);

  const handleClose = () => {
    if (model == "MACD") {
      setMacdShow(false);
    } else if (model == "RSI") {
      setShowRsi(false);
    }
  };

  const handleShow = () => {
    if (model == "MACD") {
      setMacdShow(true);
    } else if (model == "RSI") {
      setShowRsi(true);
    }
  };

  const handleMacdRun = (
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
      unixTimes,
      setReturns
    );
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
  };

  const handleRsiRun = (
    win,
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
    getRsiActions(
      win,
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
      unixTimes,
      setReturns
    );
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
                  show={showMacd}
                  options={options}
                  setOptions={setOptions}
                  handleMacdRun={handleMacdRun}
                />
                <RsiOptions
                  handleClose={handleClose}
                  show={showRsi}
                  options={options}
                  setOptions={setOptions}
                  handleRsiRun={handleRsiRun}
                />

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setModel("MACD")}>
                    MACD
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setModel("RSI")}>
                    RSI
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
      <div className="returnsText">Total Predicted Returns: ${returns}</div>
    </div>
  );
}

export default Model;
