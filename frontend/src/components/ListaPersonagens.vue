<template>
  <div class="lista">
    <h1>LISTA PERSONAGENS</h1>
    <span>Pesquisar por:</span>

    <b-row class="my-3">
      <b-col sm="2">
        <label for="nome-filter">Nome:</label>
        <b-form-input
          id="nome-filter"
          v-model="nome"
          placeholder="Rick Sanchez"
        ></b-form-input>
      </b-col>
      <b-col sm="2">
        <label for="status-filter">status:</label>
        <b-form-input
          id="status-filter"
          v-model="status"
          placeholder="Alive"
        ></b-form-input>
      </b-col>
      <b-col sm="2">
        <label for="especie-filter">Espécie:</label>
        <b-form-input
          id="especie-filter"
          v-model="especie"
          placeholder="Alien"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="1">
        <b-button variant="success" @click="loadCharacters()">pesquisar</b-button>
      </b-col>
      <b-col sm="1">
        <b-button variant="secondary" @click="clear()">limpar</b-button>
      </b-col>
    </b-row>

    <div class="tabela">
      <b-table
        class="mt-4"
        striped
        bordered
        hover
        :items="lista"
        :fields="fields"
        responsive="sm"
      >
        <template #cell(show_details)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? "Hide" : "Show" }} Details
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Localização de Origem:</b></b-col
              >
              <b-col>{{ row.item.location.name }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Episódios que participou:</b></b-col
              >
              <b-col>{{ formatEpisode(row.item.episode) }}</b-col>
            </b-row>
          </b-card>
        </template>
      </b-table>
      <b-pagination
        class="pt-3"
        size="md"
        v-model="page"
        :total-rows="count"
        :per-page="limit"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "../../global";

export default {
  name: "ListaPersonagens",
  data: function () {
    return {
      mode: "",
      lista: [],
      nome:'',
      genero:'',
      status:'',
      especie:'',
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "ID" },
        { key: "name", label: "Nome" },
        { key: "status", label: "Status" },
        { key: "species", label: "Espécie" },
        { key: "show_details", label: "Show Details" },
      ],
    };
  },
  methods: {
    loadCharacters() {
      const url = `${baseApiUrl}/character?page=${this.page}&name=${this.nome}&status=${this.status}&species=${this.especie}`;
      axios
        .get(url)
        .then((res) => {
          this.lista = res.data.results;
          this.count = res.data.info.count;
          console.log(this.page);
        })
        .catch((error) => {
          alert(error.response.data.msg);
        });
    },
    formatEpisode(episodio) {
      let episode = episodio
        .toString()
        .split("https://rickandmortyapi.com/api/")
        .splice(1);
      return episode;
      // console.log(episode)
    },
    clear(){
      this.page = 1;
      this.nome = "";
      this.status = "";
      this.especie = "";
      // this.lista = [];
     
      this.loadCharacters();
    }
  },
  watch: {
    $route() {
      this.lista = [];
      this.page = 1;
    },
    page() {
      this.loadCharacters();
    },
  },
  mounted() {
    this.loadCharacters();
    // this.formatEpisode();
  },
};
</script>

<style>
.lista {
  padding: 20px;
}
</style>