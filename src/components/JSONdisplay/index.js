import React from "react";

function JSONdisplay({ json, setJson }) {
  function handleInputFileChange(evt) {
    const file = evt.target.files[0];
    if (!file) return;

    readFileAndStoreContent(file);
  }

  function readFileAndStoreContent(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      setJson(reader.result);
    };
    reader.readAsText(file);
  }

  return (
    <>
      <textarea
        onChange={(e) => {
          setJson(e.target.value);
        }}
        value={json}
      />
      <div class="button" style={{ width: "300px" }}>
        <input
          type="file"
          name="file-input"
          id="fileInput"
          class="d-none"
          onChange={handleInputFileChange}
        />
        <p>Upload JSON</p>
      </div>
    </>
  );
}

export default JSONdisplay;
