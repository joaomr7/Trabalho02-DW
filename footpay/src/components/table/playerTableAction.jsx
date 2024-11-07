import MyDatePicker from "../base/datePicker";

import search from "../../assets/search.svg";
import trash from "../../assets/trash.svg";
import add from "../../assets/add.svg";
import { useState } from "react";

function PlayerTableAction({ onSearch, onAddClicked, addActionTitle }) {
  const [playerName, setPlayerName] = useState("");
  const [teamName, setTeamName] = useState("");

  const updatePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  const updateTeamName = (e) => {
    setTeamName(e.target.value);
  };

  const handleClearButton = () => {
    setPlayerName("");
    setTeamName("");
    onSearch("", "");
  };

  const handleSearchButton = () => {
    onSearch(playerName, teamName);
  };

  return (
    <div className="row">
      {/* Player Input */}
      <div className="col-4">
        <label htmlFor="player" className="form-label input-title ms-1">
          Jogador
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nome do Jogador"
            aria-label="Nome do Jogador"
            id="player"
            value={playerName}
            onChange={updatePlayerName}
          />
        </div>
      </div>
      <div className="col-4">
        {/* Team Input */}
        <label htmlFor="team" className="form-label input-title ms-1">
          Time
        </label>
        <div className="d-flex align-items-center">
        <input
            type="text"
            className="form-control"
            placeholder="Nome do Time"
            aria-label="Nome do Time"
            id="team"
            value={teamName}
            onChange={updateTeamName}
          />

          {/* Clean Button */}
          <img
            src={trash}
            alt="limpar"
            className="ms-3"
            style={{ width: "28px", height: "28px", cursor: "pointer" }}
            onClick={handleClearButton}
          />

          {/* Search Button */}
          <img
            src={search}
            alt="procurar"
            className="ms-3"
            style={{ width: "28px", height: "28px", cursor: "pointer" }}
            onClick={handleSearchButton}
          />
        </div>
      </div>
      {/* Add payment */}
      <div className="col-4 d-flex align-items-end justify-content-end">
        <button type="button" className="btn btn-custom" onClick={onAddClicked}>
          <img
            src={add}
            className="ms-3 me-2"
            style={{ width: "16px", height: "16px" }}
          />
          {addActionTitle}
        </button>
      </div>
    </div>
  );
}

export default PlayerTableAction;