import { useEffect, useState } from "react";

import Kpi from "./kpi";
import PaymentTableAction from "./table/paymentTableAction";
import Table from "./table/table";
import PaymentModal from "./modal/paymentModal";

import PaymentDataService from "../services/PaymentDataService";
import { formatValue } from "../utils/utils";
import PlayerDataService from "../services/PlayerDataService";

function Payments() {
  const [totalPlayers, setTotalPlayers] = useState(null);
  const [totalPayments, setTotalPayments] = useState(null);
  const [totalPaidValue, setTotalPaidValue] = useState(null);

  const tableColumns = ["ID", "Data", "Jogador", "Valor"];
  const [rows, setRows] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const updateRows = (data) => {
    if (!data) return; 

    setRows(
      data.map((pay) => {
        return {
          ID: pay.id,
          Data: new Date(pay.data).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            timeZone: "UTC"
          }),
          Jogador: pay.jogador.nome,
          Valor: "R$ " + formatValue(pay.valor, 2),
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
    PaymentDataService.getAll()
      .then((response) => updateRows(response.data))
      .catch((e) => {
        console.log("Erro: " + e);
      });
  };

  const updateTableBySearch = (playerName, paymentDate) => {
    if (playerName !== "" && paymentDate !== null) {
      PaymentDataService.getAllByPlayerAndDate(playerName, paymentDate)
        .then((response) => updateRows(response.data))
        .catch((e) => {
          console.log("Erro: " + e);
        });
    } else if (playerName !== "") {
      PaymentDataService.getAllByPlayer(playerName)
        .then((response) => updateRows(response.data))
        .catch((e) => {
          console.log("Erro: " + e);
        });
    } else if (paymentDate !== null) {
      PaymentDataService.getAllByDate(paymentDate)
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
      <Kpi
        totalPlayers={totalPlayers}
        totalPayments={totalPayments}
        totalPaidValue={totalPaidValue}
      />
      <PaymentTableAction
        onAddClicked={toggleAddModal}
        addActionTitle="Adicionar novo pagamento"
        onSearch={updateTableBySearch}
      />
      <div className="mt-4">
        <Table
          columns={tableColumns}
          data={rows}
          onActionClick={handleSelectRow}
        />
      </div>
      <PaymentModal
        payment={selectedRow}
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

export default Payments;
