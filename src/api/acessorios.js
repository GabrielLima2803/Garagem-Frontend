
import axios from "axios";

export default class AcessorioApi {
  async buscarTodasAsAcessorio() {
    const { data } = await axios.get("/acessorios/");
    return data.result;
  }
  async adicionarAcessorio(acessorio) {
    const { data } = await axios.post("/acessorios/", acessorio);
    return data.result;
  }
  async atualizarAcessorio(acessorio) {
    const { data } = await axios.put(`/acessorios/${acessorio.id}/`, acessorio);
    return data.result;
  }
  async excluirAcessorio(id) {
    const { data } = await axios.delete(`/acessorios/${id}/`);
    return data.result;
  }
}
