import { useEffect, useState } from "react";
import BaseModal from "../base/baseModal";
import MyDatePicker from "../base/datePicker";
import Select from "react-select";

import { ModalActionAdd, ModalActionEdit } from "./modalAction";
import PaymentDataService from "../../services/PaymentDataService";
import PlayerDataService from "../../services/PlayerDataService";

function PaymentModal({ payment, isOpen, onClose }) {
  const title = payment == null ? "Novo Pagamento" : "Editar Pagamento";

  const [paymentId, setPaymentId] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  const [paymentValue, setPaymentValue] = useState(0);
  const [paymentDate, setPaymentDate] = useState(null);

  const [playersList, setPlayerList] = useState([]);

  const [messageError, setMessageError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      PlayerDataService.getAll()
        .then((response) => {
          const data = response.data;

          const playerOptions = data.map((v) => ({
            value: v.id,
            label: v.nome + ` (${v.time}) (ID - ${v.id})`,
          }));

          setPlayerList(playerOptions);
        })
        .catch((e) => {
          console.log("Erro: " + e);
          onClose();
        });

      if (payment == null) {
        setPaymentId(null);
        setPlayerId(null);
        setPaymentValue(0);
        setPaymentDate(null);
      } else {
        PaymentDataService.findById(payment.ID)
          .then((response) => {
            const data = response.data;

            setPaymentId(data.id);
            setPlayerId(data.jogador.id);
            setPaymentValue(data.valor);
            setPaymentDate(new Date(data.data));
          })
          .catch((e) => {
            console.log("Erro: " + e);
            onClose();
          });
      }

      setMessageError(null);
    }
  }, [isOpen]);

  const validatePayment = () => {
    if (playerId == null) {
      setMessageError("Selecione um jogador.");
      return false;
    }

    if (paymentDate == null) {
      setMessageError("Escolha uma data válida.");
      return false;
    }

    setMessageError(null);
    return true;
  };

  const addPayment = () => {
    if (!validatePayment()) return;

    const newPayment = {
      data: paymentDate,
      valor: paymentValue,
      jogador: {
        id: playerId,
      },
    };

    PaymentDataService.create(newPayment)
      .then((response) => {
        onClose();
      })
      .catch((e) => {
        try {
          const errorResponse = JSON.parse(e.request.response);
          const errors = errorResponse.errors;
          setMessageError(errors[0].defaultMessage);
        } catch (excpt) {
        } finally {
          console.log("Erro: " + e);
        }
      });
  };

  const updatePayment = () => {
    if (!validatePayment()) return;

    const paymentData = {
      data: paymentDate,
      valor: paymentValue,
      jogador: {
        id: playerId,
      },
    };

    PaymentDataService.update(paymentId, paymentData)
      .then((response) => {
        onClose();
      })
      .catch((e) => {
        try {
          const errorResponse = JSON.parse(e.request.response);
          const errors = errorResponse.errors;
          setMessageError(errors[0].defaultMessage);
        } catch (excpt) {
        } finally {
          console.log("Erro: " + e);
        }
      });
  };

  const deletePayment = () => {
    PaymentDataService.delete(paymentId)
      .then((response) => {
        onClose();
      })
      .catch((e) => {
        try {
          const errorResponse = JSON.parse(e.request.response);
          const errors = errorResponse.errors;
          setMessageError(errors[0].defaultMessage);
        } catch (excpt) {
        } finally {
          console.log("Erro: " + e);
        }
      });
  };

  const updatePaymentValue = (e) => {
    setPaymentValue(e.target.value);
  };

  const updatePaymentDate = (date) => {
    setPaymentDate(date);
  };

  const action =
    payment == null ? (
      <ModalActionAdd onClose={onClose} onConclude={addPayment} />
    ) : (
      <ModalActionEdit
        onClose={onClose}
        onDelete={deletePayment}
        onSave={updatePayment}
      />
    );

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <h3 className="modal-title">{title}</h3>
        <div className="row px-4 pt-4 pb-3">
          <p className="form-label input-title modal-label-text ms-2">
            Jogador
          </p>
          <div className="input-group">
            <Select
              options={playersList}
              value={
                playerId != null
                  ? playersList.find((p) => p.value === playerId)
                  : null
              }
              className="w-100"
              placeholder="Selecionar..."
              isSearchable={true}
              onChange={(op) => setPlayerId(op.value)}
            />
          </div>
        </div>
        <div className="row px-4 py-2 pb-3">
          <label
            htmlFor="modal-value"
            className="form-label input-title modal-label-text ms-2"
          >
            Valor R$
          </label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="Nome do Jogador"
              aria-label="Nome do Jogador"
              id="modal-value"
              value={paymentValue}
              onChange={updatePaymentValue}
            />
          </div>
        </div>
        <div className="row px-4 pt-2 pb-3">
          <label
            htmlFor="modal-date"
            className="form-label input-title modal-label-text ms-2"
          >
            Data do Pagamento
          </label>
          <div className="input-group">
            <MyDatePicker
              id="modal-date"
              defaultValue={paymentDate}
              onDateChanged={updatePaymentDate}
            />
          </div>
        </div>
        <div className="row px-4 pt-2">
          {messageError != null ? (
            <p className="modal-error-msg ms-2">{messageError}</p>
          ) : null}
        </div>
        {action}
      </BaseModal>
    </>
  );
}

export default PaymentModal;
