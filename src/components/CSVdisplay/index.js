import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark as ColorTheme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillDelete, AiFillCopy, AiOutlineDownload } from "react-icons/ai";
import { toast } from "react-toastify";
import "./styles.css";

function CSVdisplay({ csv, handleClear }) {
  function handleSaveFile() {
    const outputValue = String(csv).trim();

    if (!outputValue.length) return;

    // download file type
    const fileFinalType = "text/csv";

    const type = `${fileFinalType};charset=utf-8`;
    const fileExtension = fileFinalType.split("/")[1];
    const fileName = `CSVConverter.${fileExtension}`;
    const blob = new Blob([outputValue], { type });
    const a = document.createElement("a");
    const url = URL.createObjectURL(blob);

    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // clearFields();

    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
  const handleCopy = () => {
    //Cria um elemento input (pode ser um textarea)
    let inputTest = document.createElement("input");
    inputTest.value = csv;
    //Anexa o elemento ao body
    document.body.appendChild(inputTest);
    //seleciona todo o texto do elemento
    inputTest.select();
    //executa o comando copy
    //aqui é feito o ato de copiar para a area de trabalho com base na seleção
    document.execCommand("copy");

    //remove o elemento
    document.body.removeChild(inputTest);

    return toast("✔ Copiado com sucesso !");
  };

  return (
    <>
      <SyntaxHighlighter language="csv" style={ColorTheme}>
        {csv}
      </SyntaxHighlighter>
      <div className="containerButton">
        <button className="button" type="button" onClick={handleClear}>
          <AiFillDelete size={20} />
        </button>
        <button className="button" type="button" onClick={handleCopy}>
          <AiFillCopy size={20} />
        </button>
        <button className="button" type="button" onClick={handleSaveFile}>
          <AiOutlineDownload size={20} />
        </button>
      </div>
    </>
  );
}

export default CSVdisplay;
