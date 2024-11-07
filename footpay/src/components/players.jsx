import { useEffect, useState } from "react";

import Kpi from "./kpi";
import PlayerTableAction from "./table/playerTableAction";
import Table from "./table/table";

import PlayerDataService from "../services/PlayerDataService";
import PaymentDataService from "../services/PaymentDataService";
import PlayerModal from "./modal/playerModal";

import { calculateAge } from "../utils/utils";

function Players() {
  const [totalPlayers, setTotalPlayers] = useState(null);
  const [totalPayments, setTotalPayments] = useState(null);
  const [totalPaidValue, setTotalPaidValue] = useState(null);

  const tableColumns = ["ID", "Jogador", "Time", "Idade"];
  const [rows, setRows] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const updateRows = (data) => {
    if (!data) return; 

    setRows(
      data.map((player) => {
        return {
          ID: player.id,
          Jogador: player.nome,
          Time: player.time,
          Idade: calculateAge(player.datanasc),
        };
      })
    );
  };

  const toggleAddModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSelectRow = (row) => {
    toggleAddModal();
    setSelectedRow(row);
  };

  const updateKpis = () => {
    PlayerDataService.getTotalPlayers()
      .then((response) => {
        setTotalPlayers(response.data);
      })
      .catch((e) => {
        console.log("Erro: " + e);
      });

    PaymentDataService.getTotalPayments()
      .then((response) => {
        setTotalPayments(response.data);
      })
      .catch((e) => {
        console.log("Erro: " + e);
      });

    PaymentDataService.getTotalPaidValue()
      .then((response) => {
        setTotalPaidValue(response.data);
      })
      .catch((e) => {
        console.log("Erro: " + e);
      });
  };

  const updateTable = () => {
    PlayerDataService.getAll()
      .then((response) => updateRows(response.data))
      .catch((e) => {
        console.log("Erro: " + e);
      });
  };

  const updateTableBySearch = (playerName, teamName) => {
    if (playerName !== "" && teamName !== null) {
      PlayerDataService.findByNameAndTeam(playerName, teamName)
        .then((response) => updateRows(response.data))
        .catch((e) => {
          console.log("Erro: " + e);
        });
    } else if (playerName !== "") {
      PlayerDataService.findByName(playerName)
        .then((response) => updateRows(response.data))
        .catch((e) => {
          console.log("Erro: " + e);
        });
    } else if (teamName !== "") {
      PlayerDataService.findByTeam(teamName)
        .then((response) => updateRows(response.data))
        .catch((e) => {
          console.log("Erro: " + e);
        });
    } else {
      updateTable();
    }

    updateKpis();
  };

  const updateData = () => {
    updateTable();
    updateKpis();
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <>
      <Kpi totalPlayers={totalPlayers} totalPayments={totalPayments} totalPaidValue={totalPaidValue} />
      <PlayerTableAction
        onAddClicked={toggleAddModal}
        addActionTitle="Adicionar novo jogador"
        onSearch={updateTableBySearch}
      />
      <div className="mt-4">
        <Table
          columns={tableColumns}
          data={rows}
          onActionClick={handleSelectRow}
        />
      </div>
      <PlayerModal
        player={selectedRow}
        isOpen={isModalOpen}
        onClose={() => {
          toggleAddModal();
          setSelectedRow(null);
          updateData();
        }}
      />
    </>
  );
}

export default Players;
