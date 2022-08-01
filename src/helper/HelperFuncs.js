import axios from "axios";

const baseURL = "http://lotusfinanceapi.org/api";

const getQuote = (
  ticker,
  start,
  end,
  usePeriod,
  period,
  interval,
  setQuote,
  setUnixTimes
) => {
  axios
    .post(baseURL + "/quote", {
      ticker: ticker,
      period: usePeriod ? undefined : period,
      start_date: start,
      end_date: end,
      interval: interval,
    })
    .then((response) => {
      setQuote({
        labels: Object.values(response.data.UnixIdx).map((data) => {
          var dateFromInt = new Date(data / 1000000);
          return dateFromInt.toString();
        }),
        datasets: [
          {
            label: "Closing Price",
            data: Object.values(response.data.Close),
          },
        ],
      });
      setUnixTimes(
        Object.values(response.data.UnixIdx).map((data) => {
          return data / 1000000;
        })
      );
    });
};

const getMacdActions = (
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
) => {
  axios
    .post(baseURL + "/macdModel", {
      slow: slow,
      fast: fast,
      signal: signal,
      interval: interval,
      shares: shares,
      starting_price: price,
      cash: cash,
      period: usePeriod ? undefined : period,
      start_date: start,
      end_date: end,
      agg: agg,
    })
    .then((response) => {
      const scaler = (key) => {
        return (
          ((parseInt(key) - unixTimes[0] / 1000) /
            (unixTimes[1] - unixTimes[0])) *
          1000
        );
      };
      var trigs = response.data.triggers;
      const keys = Object.keys(trigs);
      keys.forEach((key, index) => {
        console.log(
          ((parseInt(key) - unixTimes[0] / 1000) /
            (unixTimes[1] - unixTimes[0])) *
            1000
        );
        let tempPt = {
          type: "point",
          xValue: scaler(key),
          yValue: trigs[key][0],
          radius: 5,
          backgroundColor:
            trigs[key][1] === "buy"
              ? "rgba(99, 255, 132, 0.25)"
              : "rgba(255, 99, 132, 0.25)",
        };
        triggers[`point ${index}`] = tempPt;
        setTriggers({
          ...triggers,
        });
        setReturns(response.data.returns);
      });
    });
};

const getRsiActions = (
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
) => {
  axios
    .post(baseURL + "/rsiModel", {
      window: win,
      interval: interval,
      shares: shares,
      starting_price: price,
      cash: cash,
      period: usePeriod ? undefined : period,
      start_date: start,
      end_date: end,
      agg: agg,
    })
    .then((response) => {
      const scaler = (key) => {
        return (
          ((parseInt(key) - unixTimes[0] / 1000) /
            (unixTimes[1] - unixTimes[0])) *
          1000
        );
      };
      var trigs = response.data.triggers;
      const keys = Object.keys(trigs);
      console.log(trigs);
      keys.forEach((key, index) => {
        console.log(
          ((parseInt(key) - unixTimes[0] / 1000) /
            (unixTimes[1] - unixTimes[0])) *
            1000
        );
        let tempPt = {
          type: "point",
          xValue: scaler(key),
          yValue: trigs[key][0],
          radius: 5,
          backgroundColor:
            trigs[key][1] === "buy"
              ? "rgba(99, 255, 132, 0.25)"
              : "rgba(255, 99, 132, 0.25)",
        };
        triggers[`point ${index}`] = tempPt;
        setTriggers({
          ...triggers,
        });
        setReturns(response.data.returns);
      });
    });
};

export { getQuote, getMacdActions, getRsiActions };
