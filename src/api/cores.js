import axios from "axios";

export default class CoresApi {
  async buscarTodasAsCores() {
    const { data } = await axios.get("/cores/");
    return data.result;
  }
  async adicionarCores(cor) {
    const { data } = await axios.post("/cores/", cor);
    return data.result;
  }
  async atualizarCores(cor) {
    const { data } = await axios.put(`/cores/${cor.id}/`, cor);
    return data.result;
  }
  async excluirCores(id) {
    const { data } = await axios.delete(`/cores/${id}/`);
    return data.result;
  }
}