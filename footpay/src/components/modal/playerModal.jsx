import { useEffect, useState } from "react";
import BaseModal from "../base/baseModal";
import MyDatePicker from "../base/datePicker";

import { ModalActionAdd, ModalActionEdit } from "./modalAction";

import PlayerDataService from "../../services/PlayerDataService";

function PlayerModal({ player, isOpen, onClose }) {
  const title = player == null ? "Novo Jogador" : "Editar Jogador";

  const [playerId, setPlayerId] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [playerTeam, setPlayerTeam] = useState("");
  const [playerBirthday, setPlayerBirthday] = useState(null);

  const [messageError, setMessageError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      if (player == null) {
        setPlayerId(null);
        setPlayerName("");
        setPlayerTeam("");
        setPlayerBirthday(null);
      } else {
        PlayerDataService.findById(player.ID)
          .then((response) => {
            const data = response.data;

            setPlayerId(data.id);
            setPlayerName(data.nome);
            setPlayerTeam(data.time);
            setPlayerBirthday(new Date(data.datanasc));
          })
          .catch((e) => {
            console.log("Erro: " + e);
            onClose();
          });
      }

      setMessageError(null);
    }
  }, [isOpen, player]);

  const validatePlayer = () => {
    if (playerName.trim() === "") {
      setMessageError("O nome do jogador não pode ser vazio.");
      return false;
    }

    if (playerTeam.trim() === "") {
      setMessageError("O nome do time não pode ser vazio.");
      return false;
    }

    if (playerBirthday == null) {
      setMessageError("Escolha uma data de nascimento válida.");
      return false;
    }

    setMessageError(null);
    return true;
  };

  const addPlayer = () => {
    if (!validatePlayer()) return;

    const newPlayer = {
      nome: playerName,
      time: playerTeam,
      datanasc: playerBirthday,
    };

    PlayerDataService.create(newPlayer)
      .then(response => {
        onClose();
      })
      .catch(e => {
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

  const deletePlayer = () => {
    PlayerDataService.delete(playerId)
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

  const updatePlayer = () => {
    if (!validatePlayer()) return;

    const playerData = {
      nome: playerName,
      time: playerTeam,
      datanasc: playerBirthday,
    };

    PlayerDataService.update(playerId, playerData)
      .then((reponse) => {
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

  const updatePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  const updatePlayerTeam = (e) => {
    setPlayerTeam(e.target.value);
  };

  const updatePlayerBirthday = (date) => {
    setPlayerBirthday(date);
  };

  const action =
    player == null ? (
      <ModalActionAdd onClose={onClose} onConclude={addPlayer} />
    ) : (
      <ModalActionEdit
        onClose={onClose}
        onDelete={deletePlayer}
        onSave={updatePlayer}
      />
    );

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <h3 className="modal-title">{title}</h3>
        <div className="row px-4 pt-4 pb-3">
          <label
            htmlFor="modal-player"
            className="form-label input-title modal-label-text ms-2"
          >
            Jogador
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Jogador"
              aria-label="Nome do Jogador"
              id="modal-player"
              value={playerName}
              onChange={updatePlayerName}
            />
          </div>
        </div>
        <div className="row px-4 py-2 pb-3">
          <label
            htmlFor="modal-team"
            className="form-label input-title modal-label-text ms-2"
          >
            Time
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Jogador"
              aria-label="Nome do Jogador"
              id="modal-team"
              value={playerTeam}
              onChange={updatePlayerTeam}
            />
          </div>
        </div>
        <div className="row px-4 pt-2 pb-3">
          <label
            htmlFor="modal-date"
            className="form-label input-title modal-label-text ms-2"
          >
            Data de Nascimento
          </label>
          <div className="input-group">
            <MyDatePicker
              id="modal-date"
              defaultValue={playerBirthday}
              onDateChanged={updatePlayerBirthday}
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

export default PlayerModal;
