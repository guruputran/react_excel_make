/** @format */
//https://codingstatus.com/add-and-delete-table-rows-dynamically-using-react-js/
import { useState, useEffect } from "react";
import TableRows from "./TableRows";
import { utils, writeFile } from "xlsx";
//https://www.youtube.com/watch?v=F7dQLO5Jhp4

function AddDeleteTableRows() {
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      fullName: "",
      emailAddress: "",
      salary: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };
  const handleClick = () => {
    console.log("Submitted", rowsData);
    //rowsData has table info as object array
    var wb = utils.book_new(),
      ws = utils.json_to_sheet(rowsData);
    utils.book_append_sheet(wb, ws, "MySheet1");
    writeFile(wb, `./MyExcel.xlsx`);
    var fd = new FormData();
    fd.append("data", new File([rowsData], "sheetjs.xlsx"));

    /* send data */
    var req = new XMLHttpRequest();
    req.open("POST", `http://localhost:8000/upload`, true);
    req.send(fd);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <table className="table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Salary</th>
                  <th>
                    <button
                      className="btn btn-outline-success"
                      onClick={addTableRows}
                    >
                      +
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableRows
                  rowsData={rowsData}
                  deleteTableRows={deleteTableRows}
                  handleChange={handleChange}
                />
              </tbody>
            </table>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
      <span>
        <button onClick={handleClick} className="btn btn-danger btn-sm">
          Submit
        </button>
      </span>
    </>
  );
}
export default AddDeleteTableRows;
