import edit from "../../assets/edit.svg";

function Table({ columns, data, onActionClick }) {
  const columnItems = [
    ...columns.map((c) => <th key={c} className="table-header-transparent">{c}</th>),
    <th key='action' className="table-icon-cell table-header-transparent"></th>
  ]

  const rowItems = data.map((row, index) => (
    <tr key={index}>
      {columns.map((c) => (
        <td key={`${index}-${c}`}>{row[c]}</td>
      ))}
      <td>
        <button
          type="button"
          className="btn btn-icon table-icon-btn"
          onClick={() => onActionClick(row)}
          style={{ border: "none", background: "transparent" }}
        >
          <img
            src={edit}
            alt="editar"
            style={{ width: "16px", height: "16px", display: "block", margin: "auto" }}
          />
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="table-responsive">
      <table className="shadow table table-borderless table-hover rounded-table">
        <thead className="table-header">
          <tr>{columnItems}</tr>
        </thead>
        <tbody>{rowItems}</tbody>
      </table>
    </div>
  );
}

export default Table;
