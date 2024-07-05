import axios from "axios";

export default class MarcaApi {
  async buscarTodasAsMarca() {
    const { data } = await axios.get("/marcas/");
    return data.result;
  }
  async adicionarMarca(marca) {
    const { data } = await axios.post("/marcas/", marca);
    return data.result;
  }
  async atualizarMarca(marca) {
    const { data } = await axios.put(`/marcas/${marca.id}/`, marca);
    return data.result;
  }
  async excluirMarca(id) {
    const { data } = await axios.delete(`/marcas/${id}/`);
    return data.result;
  }
}