import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import React, { useLocation, useState, useNavigate, useCallback } from "react";
import RangeSlider from "react-bootstrap-range-slider";

function RsiOptions({ show, handleClose, options, setOptions, handleRsiRun }) {
  const [win, setWindow] = useState(0);
  const [interval, setInterval] = useState("1m");
  const [shares, setShares] = useState(100);
  const [price, setPrice] = useState(1000);
  const [cash, setCash] = useState(1000);
  const [usePeriod, setUsePeriod] = useState(false);
  const [period, setPeriod] = useState("1d");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [agg, setAgg] = useState(20);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      options={options}
      setOptions={setOptions}
    >
      <Modal.Header closeButton>
        <Modal.Title>RSI Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="Window">
            <Form.Label>Window</Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder="0"
                onChange={(e) => setWindow(parseInt(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId="interval">
            <Form.Label>Interval</Form.Label>
            <Col>
              <Form.Select
                onChange={(e) => setInterval(e.target.value)}
                aria-label="Default select example"
              >
                <option value="1m">1m</option>
                <option value="2m">2m</option>
                <option value="5m">5m</option>
                <option value="15m">15m</option>
                <option value="30m">30m</option>
                <option value="60m">60m</option>
                <option value="90m">90m</option>
                <option value="1h">1h</option>
                <option value="1d">1d</option>
                <option value="5d">5d</option>
                <option value="1wk">1wk</option>
                <option value="1mo">1mo</option>
                <option value="3mo">3mo</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group controlId="shares">
            <Form.Label>Number of Initial Shares</Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder="69"
                onChange={(e) => setShares(parseInt(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId="Starting Price">
            <Form.Label>Starting Share Price</Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder="100 (in dollars)"
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId="cash">
            <Form.Label>Cash</Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder="1000 (in dollars)"
                onChange={(e) => setCash(parseInt(e.target.value))}
              />
            </Col>
          </Form.Group>

          <Form.Group className="m-3" controlId="usePeriod">
            <Form.Check
              checked={usePeriod}
              type="checkbox"
              label="Use Start/End Dates"
              onChange={() => setUsePeriod(!usePeriod)}
            />
          </Form.Group>

          <Form.Group controlId="period">
            <Form.Label>Period</Form.Label>
            <Col>
              <Form.Select
                disabled={usePeriod}
                onChange={(e) => setPeriod(e.target.value)}
                aria-label="Default select example"
              >
                <option value="1d">1d</option>
                <option value="5d">5d</option>
                <option value="1mo">1mo</option>
                <option value="3mo">3mo</option>
                <option value="6mo">6mo</option>
                <option value="1y">1y</option>
                <option value="2y">2y</option>
                <option value="5y">5y</option>
                <option value="10y">10y</option>
                <option value="ytd">YTD</option>
                <option value="max">Max</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group controlId="startdate">
            <Form.Label>Start Date</Form.Label>
            <Col>
              <Form.Control
                disabled={!usePeriod}
                type="date"
                onChange={(e) => setStart(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId="enddate">
            <Form.Label>End Date</Form.Label>
            <Col>
              <Form.Control
                disabled={!usePeriod}
                type="date"
                onChange={(e) => setEnd(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="agg">
            <Form.Label column sm="4">
              Aggression Level
            </Form.Label>
            <Col sm="8" className="mt-2">
              <RangeSlider
                value={agg}
                onChange={(changeEvent) => setAgg(changeEvent.target.value)}
                min={20}
                max={200}
                size="lg"
                tooltipLabel={(currentValue) => `${currentValue}%`}
                tooltip="on"
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            handleRsiRun(
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
            )
          }
        >
          Run
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RsiOptions;
