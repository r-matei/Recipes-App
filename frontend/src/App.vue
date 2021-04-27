<template>
  <div id="app">
    <v-app>
      <main>
        <v-container class="pa-0" fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;800&display=swap');
#app {
  font-family: proxima-nova, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #c4c4c4;
  font-family: 'Raleway', sans-serif;
}

</style>
