<script setup>
import { ref, onMounted } from 'vue'
import { useAcessorioStore } from '@/stores/acessorios'

const acessorioStore = useAcessorioStore()

const acessorio = ref({ descricao: '' })
const acessorios = ref([])  

const salvar = async () => {
  try {
    if (acessorio.value.id) {
      await acessorioStore.updateAcessorio(acessorio.value.id, acessorio.value)
    } else {
      await acessorioStore.createAcessorio(acessorio.value)
    }
    await AtualizarInformações()  
    limpar()
  } catch (error) {
    console.error('Erro ao salvar o acessório:', error)
  }
}

const limpar = () => {
  acessorio.value = { descricao: '' }
}

const excluir = async (id) => {
  try {
    await acessorioStore.deleteAcessorio(id)
    await AtualizarInformações()  
  } catch (error) {
    console.error('Erro ao excluir o acessório:', error)
  }
}

const editar = (acessorioItem) => {
  acessorio.value = { ...acessorioItem }
}

const AtualizarInformações = async () => {
  try {
    await acessorioStore.getAllAcessorios()
    acessorios.value = acessorioStore.acessorios  
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error)
  }
}

onMounted(async () => {
  await AtualizarInformações()
})
</script>

<template>
  <h1>Acessório</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="acessorio.descricao" placeholder="Descrição" />
    <button @click="salvar" class="gap">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="acessorioItem in acessorios" :key="acessorioItem.id">
      <span @click="editar(acessorioItem)">
        ({{ acessorioItem.id }}) - {{ acessorioItem.descricao }}
      </span>
      <button @click="excluir(acessorioItem.id)">X</button>
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
