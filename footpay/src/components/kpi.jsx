import player from "../assets/player.svg";
import payment from "../assets/payment.svg";
import dollar from "../assets/dollar.svg";

import { formatValue } from "../utils/utils";
import { useEffect, useState } from "react";

function Kpi({ totalPlayers, totalPayments, totalPaidValue }) {
  const [kpiItems, setKpisItems] = useState([]);

  useEffect(() => {
    const kpis = [
      {
        title: "Jogadores",
        value: totalPlayers,
        precision: 0,
        prefix: "",
        icon: player,
      },
      {
        title: "Pagamentos",
        value: totalPayments,
        precision: 0,
        prefix: "",
        icon: payment,
      },
      {
        title: "Total Pago",
        value: totalPaidValue,
        precision: 2,
        prefix: "R$ ",
        icon: dollar,
      },
    ];

    setKpisItems(
      kpis.map((kpi) => (
        <div key={kpi.title} className="col-12 col-lg-4 mb-3">
          <div
            className="shadow card kpi-card-gradient"
            style={{ width: "100%" }}
          >
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center kpi-card-title">
                {kpi.title}
                <img
                  src={kpi.icon}
                  alt="icone"
                  className="ms-2 kpi-card-icon"
                />
              </h5>
              <p className="card-text kpi-card-value">
                {kpi.prefix + formatValue(kpi.value, kpi.precision)}
              </p>
            </div>
          </div>
        </div>
      ))
    );
  }, [totalPlayers, totalPayments, totalPaidValue]);

  return (
    <div>
      <h5 className="kpi-head-title ms-1">Indicadores</h5>
      <div className="row">{kpiItems}</div>
    </div>
  );
}

export default Kpi;
