import http from "../http-common";

class PaymentDataService {
  getAll() {
    return http.get("/pagamento/");
  }

  getAllByPlayerAndDate(playerName, date) {
    return http.get(
      `/pagamento/?nomeJogador=${playerName}&dataPagamento=${date}`
    );
  }

  getAllByPlayer(playerName) {
    return http.get(`/pagamento/?nomeJogador=${playerName}`);
  }

  getAllByDate(date) {
    return http.get(`/pagamento/?dataPagamento=${date}`);
  }

  findById(id) {
    return http.get(`/pagamento/${id}`);
  }

  create(data) {
    return http.post("/pagamento/", data);
  }

  update(id, data) {
    return http.put(`/pagamento/${id}`, data);
  }

  delete(id) {
    return http.delete(`/pagamento/${id}`);
  }

  getTotalPayments() {
    return http.get("/pagamento/total");
  }

  getTotalPaidValue() {
    return http.get("/pagamento/total_pago");
  }
}

export default new PaymentDataService();
