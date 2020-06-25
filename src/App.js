import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaAngleRight } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Card from "./components/Card";
import CSVdisplay from "./components/CSVdisplay";
import JSONdisplay from "./components/JSONdisplay";

function App() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");

  function json2csv(json) {
    const header = Object.keys(json[0])
      .map((e) => `"${e}"`)
      .join(";");

    let body = json.map((e) => Object.values(e));

    body = body
      .map((e) => e.map((elements) => `"${elements}"`).join(";"))
      .join("\n");

    return `${header}\n${body}`;
  }

  const handleClick = () => {
    try {
      const finalJson = JSON.parse(json);
      if (typeof finalJson === "object") {
        setCsv(json2csv(finalJson));
      }
    } catch (error) {
      toast.error(`JSON Invalido : ${error}`);
    }
  };

  const handleClear = () => {
    setCsv("");
    setJson("");
  };

  return (
    <div className="App">
      <ToastContainer />
      <Card>
        <JSONdisplay json={json} setJson={setJson} />
      </Card>
      <button className="button" type="button" onClick={handleClick}>
        CSV <FaAngleRight size={20} />
      </button>
      <Card>
        <CSVdisplay csv={csv} handleClear={handleClear} />
      </Card>
    </div>
  );
}

export default App;
