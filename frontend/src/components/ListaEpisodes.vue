<template>
  <div class="lista">
    <h1>LISTA EPISÓDIOS</h1>
    <span>Pesquisar por:</span>
    <b-row class="my-3">
      <b-col sm="3">
        <label for="name-filter">Nome:</label>
        <b-form-input
          id="name-filter"
          v-model="nome"
          placeholder="Close Rick-counters of the Rick Kind"
        ></b-form-input>
      </b-col>
      <b-col sm="2">
        <label for="episode-filter">Episódio:</label>
        <b-form-input
          id="episode-filter"
          v-model="episode"
          placeholder="S01E10"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="1">
        <b-button variant="success" @click="loadEpisodes()">pesquisar</b-button>
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
              <b-col sm="3" class="text-sm-right"><b>Nome ep:</b></b-col>
              <b-col>{{ row.item.name }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Data de exibição:</b></b-col
              >
              <b-col>{{ row.item.air_date }}</b-col>
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
      episode:'',
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "ID" },
        { key: "name", label: "Nome" },
        { key: "air_date", label: "Data de exibição" },
        { key: "episode", label: "Episódio" },
        { key: "show_details", label: "Show Details" },
      ],
    };
  },
  methods: {
    loadEpisodes() {
      const url = `${baseApiUrl}/episode?page=${this.page}&name=${this.nome}&episode=${this.episode}`;
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
    clear(){
      this.page = 1;
      this.nome = "";
      this.episode = "";
      // this.lista = [];
     
      this.loadEpisodes();
    }
    // formatEpisode(episodio){
    //     let episode = episodio.toString().split('https://rickandmortyapi.com/api/').splice(1)
    //     return episode
    //     // console.log(episode)
    // }
  },
  watch: {
    $route() {
      this.lista = [];
      this.page = 1;
    },
    page() {
      this.loadEpisodes();
    },
  },
  mounted() {
    this.loadEpisodes();
    // this.formatEpisode();
  },
};
</script>

<style>
.lista {
  padding: 20px;
  background-color: rgba(244, 252, 246, 0.733);
}
</style>