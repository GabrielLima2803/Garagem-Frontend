<script setup>
import { ref, onMounted } from 'vue'
import { useVeiculoStore } from '@/stores/veiculos' 
import { useModeloStore } from '@/stores/modeloS'
import { useCoresStore } from '@/stores/cores' 
import { useAcessorioStore } from '@/stores/acessorios' 

const veiculoStore = useVeiculoStore()
const modeloStore = useModeloStore()
const corStore = useCoresStore()
const acessorioStore = useAcessorioStore()

const veiculo = ref({ id: null, modelo: null, cor: null, ano: '', preco: '', acessorios: [] })
const veiculos = ref([])
const modelos = ref([])
const cores = ref([])
const acessorios = ref([])

const salvar = async () => {
  try {
    if (veiculo.value.id) {
      await veiculoStore.updateVeiculo(veiculo.value.id, veiculo.value)
    } else {
      await veiculoStore.createVeiculo(veiculo.value)
    }
    await atualizarInformacoes()
    limpar()
  } catch (error) {
    console.error('Erro ao salvar o veículo:', error)
  }
}

const limpar = () => {
  veiculo.value = { id: null, modelo: null, cor: null, ano: '', preco: '', acessorios: [] }
}

const excluir = async (id) => {
  try {
    await veiculoStore.deleteVeiculo(id)
    await atualizarInformacoes()
  } catch (error) {
    console.error('Erro ao excluir o veículo:', error)
  }
}

const editar = (veiculoItem) => {
  veiculo.value = { ...veiculoItem, acessorios: veiculoItem.acessorios.map(a => a.id) }
}

const atualizarInformacoes = async () => {
  try {
    await veiculoStore.getAllVeiculos()
    veiculos.value = veiculoStore.veiculos
    await modeloStore.getAllModelos()
    modelos.value = modeloStore.modelos 
    await corStore.getAllCores()
    cores.value = corStore.cores
    await acessorioStore.getAllAcessorios()
    acessorios.value = acessorioStore.acessorios
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error)
  }
}

onMounted(async () => {
  await atualizarInformacoes()
})
</script>

<template>
  <h1>Veículos</h1>
  <hr />
  <div class="form">
    <label for="modelo">Modelo:</label>
    <select v-model="veiculo.modelo" required>
      <option value="" disabled>Selecione um modelo</option>
      <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">
        {{ modelo.nome }}
      </option>
    </select>

    <label for="cor">Cor:</label>
    <select v-model="veiculo.cor" required>
      <option value="" disabled>Selecione uma cor</option>
      <option v-for="cor in cores" :key="cor.id" :value="cor.id">
        {{ cor.nome }}
      </option>
    </select>

    <label for="ano">Ano:</label>
    <input type="number" v-model="veiculo.ano" required />

    <label for="preco">Preço:</label>
    <input type="number" v-model="veiculo.preco" step="0.01" required />

    <label for="acessorios">Acessórios:</label>
    <select v-model="veiculo.acessorios" multiple>
      <option v-for="acessorio in acessorios" :key="acessorio.id" :value="acessorio.id">
        {{ acessorio.descricao }}
      </option>
    </select>

    <button @click="salvar" class="gap">Salvar</button>
    <br />
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="veiculoItem in veiculos" :key="veiculoItem.id">
      <span @click="editar(veiculoItem)">
        ({{ veiculoItem.id }}) - Modelo: {{ modelos.find(m => m.id === veiculoItem.modelo)?.nome || 'Não disponível' }} - 
        Cor: {{ cores.find(c => c.id === veiculoItem.cor)?.nome || 'Não disponível' }} - 
        Ano: {{ veiculoItem.ano }} - Preço: R$ {{ veiculoItem.preco }}
      </span>
      <button @click="excluir(veiculoItem.id)">X</button>
    </li>
  </ul>
</template>

<style scoped>
.gap {
  margin-right: 10px;
  margin-left: 10px;
}

.form {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.form input[type="text"],
.form select {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.form input[type="text"]:focus,
.form select:focus {
  border-color: #007bff;
}

.form button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form button:hover {
  background-color: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;
}

li:hover {
  background-color: #fff;
  transform: translateY(-5px);
}

li span {
  cursor: pointer;
  margin-right: 10px;
}

li span:hover {
  text-decoration: underline;
}

li button {
  padding: 3px 6px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

li button:hover {
  background-color: #c82333;
}
</style>
