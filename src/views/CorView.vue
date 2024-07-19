<script setup>
import { ref, onMounted } from 'vue'
import { useCoresStore } from '@/stores/cores'

const coresStore = useCoresStore()

const cor = ref({ nome: '' })
const cores = ref([])  

const salvar = async () => {
  try {
    if (cor.value.id) {
      await coresStore.updateCor(cor.value.id, cor.value)
    } else {
      await coresStore.createCor(cor.value)
    }
    await AtualizarInformações() 
    limpar()
  } catch (error) {
    console.error('Erro ao salvar a cor:', error)
  }
}

const limpar = () => {
  cor.value = { nome: '' }
}

const excluir = async (id) => {
  try {
    await coresStore.deleteCor(id)
    await AtualizarInformações()  
  } catch (error) {
    console.error('Erro ao excluir a cor:', error)
  }
}

const editar = (corItem) => {
  cor.value = { ...corItem }
}

const AtualizarInformações = async () => {
  try {
    await coresStore.getAllCores()
    cores.value = coresStore.cores  
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error)
  }
}

onMounted(async () => {
  await AtualizarInformações()
})
</script>

<template>
  <h1>Cor</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="cor.nome" placeholder="Nome" />
    <button @click="salvar" class="gap">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="corItem in cores" :key="corItem.id">
      <span @click="editar(corItem)">
        ({{ corItem.id }}) - {{ corItem.nome }}
      </span>
      <button @click="excluir(corItem.id)">X</button>
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
}

.form input[type="text"] {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.form input[type="text"]:focus {
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
