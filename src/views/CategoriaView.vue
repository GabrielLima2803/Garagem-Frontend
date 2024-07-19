<script setup>
import { ref, onMounted } from 'vue'
import { useCategoriasStore } from '@/stores/categorias' 

const categoriaStore = useCategoriasStore()

const categoria = ref({ descricao: '' })
const categorias = ref([]) 

const salvar = async () => {
  try {
    if (categoria.value.id) {
      await categoriaStore.updateCategoria(categoria.value.id, categoria.value)
    } else {
      await categoriaStore.createCategoria(categoria.value)
    }
    await AtualizarInformações()  
    limpar()
  } catch (error) {
    console.error('Erro ao salvar a categoria:', error)
  }
}

const AtualizarInformações = async () => {
  try {
    await categoriaStore.getAllCategorias()
    categorias.value = categoriaStore.categorias  
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error)
  }
}

const limpar = () => {
  categoria.value = { descricao: '' }
}

const excluir = async (id) => {
  try {
    await categoriaStore.deleteCategoria(id)
    await AtualizarInformações()  
  } catch (error) {
    console.error('Erro ao excluir a categoria:', error)
  }
}

const editar = (categoriaItem) => {
  categoria.value = { ...categoriaItem }
}

onMounted(async () => {
  await AtualizarInformações()
})
</script>

<template>
  <h1>Categoria</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="categoria.descricao" placeholder="Descrição" />
    <button @click="salvar" class="gap">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="categoriaItem in categorias" :key="categoriaItem.id">
      <span @click="editar(categoriaItem)">
        ({{ categoriaItem.id }}) - {{ categoriaItem.descricao }}
      </span>
      <button @click="excluir(categoriaItem.id)">X</button>
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
