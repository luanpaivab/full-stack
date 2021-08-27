<template>
  <div
    :class="`${
      selected === ''
        ? 'home-with-bkimg'
        : selected !== ''
        ? 'home-without-bkimg'
        : 'not-exists'
    }`"
  >
    <h1>LISTAS RICK AND MORTY</h1>
    <div class="row-one my-3">
      <div class="radio">
        <b-form-group label="Escolha a Lista" v-slot="{ ariaDescribedby }">
          <b-form-radio
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="characters"
            >Lista de Personagens</b-form-radio
          >
          <b-form-radio
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="episodes"
            >Lista de Episódios</b-form-radio
          >
        </b-form-group>
      </div>
      <div class="imagem" v-if="selected !== ''">
        <img
          src="https://http2.mlstatic.com/D_NQ_NP_817089-MLB40428228981_012020-O.jpg"
          alt="rickandmorty"
        />
      </div>
    </div>
    <b-row class="align-items-center">
      <div class="mt-3" v-if="selected === 'characters'">
        <ListaPersonagens />
      </div>

      <div class="mt-3" v-if="selected === 'episodes'">
        <ListaEpisodes />
      </div>
    </b-row>
  </div>
</template>

<script>
import ListaPersonagens from "./ListaPersonagens.vue";
import ListaEpisodes from "./ListaEpisodes.vue";

export default {
  name: "Home",
  components: { ListaPersonagens, ListaEpisodes },
  data() {
    return {
      selected: "",
    };
  },
};
</script>

<style>
.home-with-bkimg {
  padding: 20px;
  color: #fff;
  height: auto;
  min-height: 100vh;

  width: 100%;
  background-image: url("https://www.freepnglogos.com/uploads/rick-and-morty/rick-and-morty-background-rick-morty-wallpaper-speedpaint-youtube-2.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}

.home-without-bkimg {
  padding: 20px;
  /* background-color: rgb(214, 214, 214); */
  height: auto;
  min-height: 100vh;
}
.row-one {
  display: flex;
  justify-content: space-between;
}
.row-one img {
  width: 200px;
  height: 150px;
}
</style>