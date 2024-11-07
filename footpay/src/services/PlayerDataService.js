import http from "../http-common";

class PlayerDataService {
  getAll() {
    return http.get("/jogador/");
  }

  findByName(name) {
    return http.get(`/jogador/?nome=${name}`);
  }

  findByTeam(team) {
    return http.get(`/jogador/?time=${team}`);
  }

  findByNameAndTeam(name, team) {
    return http.get(`/jogador/?nome=${name}&time=${team}`);
  }

  findById(id) {
    return http.get(`/jogador/${id}`);
  }

  create(data) {
    return http.post("/jogador/", data);
  }

  update(id, data) {
    return http.put(`/jogador/${id}`, data);
  }

  delete(id) {
    return http.delete(`/jogador/${id}`);
  }

  getTotalPlayers() {
    return http.get("/jogador/total");
  }
}

export default new PlayerDataService();
