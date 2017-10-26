<template>
  <div id="app" :class="{ connected: connected }">
    <div class="versus">
      <img id="img-1" src="./assets/logo.png">
      <img id="img-2" src="./assets/logo.png">
      <img id="img-3" src="./assets/logo.png">
    </div>
    <div class="buttons">
      <button class="white" @click="addPointToTeamWhite()">WHITE</button>
      <button class="black" @click="addPointToTeamBlack()">BLACK</button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'app',
  data () {
    return {
      connected: false,
      socket: null
    }
  },
  methods: {
    addPointToTeamWhite: function() {
      if (this.connected) {
        console.log('White!!')
        this.socket.emit('clickWhite');
      }
    },
    addPointToTeamBlack: function() {
      if (this.connected) {
        console.log('Black!!')
        this.socket.emit('clickBlack');
      }
    }
  },
  mounted: function() {
    this.socket = io("192.168.43.155" + ':' + 9000);
    this.socket.on('connect', () => {
      console.log('Connected! ' + this.connected);
      this.connected = true;
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected :( ' + this.connected);
      this.connected = false;
    })
  }
}
</script>

<style lang="scss">
body {
  background: linear-gradient(to right, #ffffff 0%,#e5e5e5 47%,#1c1c1c 53%,#0a0809 100%);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: " ";
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
    height: 20px;
    background-color: orangered;
    box-shadow: 1px 1px 1px 0px;
    border-radius: 10px;
  }
  &.connected::before {
    background-color: limegreen;
  }
}

.buttons {
  position: absolute;
  min-height: 300px;
  top: 340px;
}

button {
  width: 130px;
  height: 100px;
  font-weight: bold;
  font-size: 35px;
  border-radius: 5px;
  border: none;
  margin: 0 10px;

  &.black {
    background-color: white;
    color: black;
  }
  &.white {
    background-color: black;
    color: white;
  }
}

.versus {
  position: absolute;
  width: 300px;
  min-height: 300px;
  top: 20px;

  img {
    display: block;
    position: absolute;

    @keyframes img1 {
      from { transform: scale(3);}
      to   { transform: scale(1);}
    }

    @keyframes img2 {
      from { transform: rotate(0deg);}
      to   { transform: rotate(120deg);}
    }

    @keyframes img3 {
      from { transform: rotate(0deg);}
      to   { transform: rotate(300deg);}
    }


    &#img-1 {
      animation: img1 2s;
      width: 170px;
      height: 170px;
      top: 60px;
    }
    &#img-2 {
      animation: img2 2s;
      transform: rotate(120deg);
      width: 130px;
      left: 126px;
      top: 60px;
    }
    &#img-3 {
      animation: img3 2s;
      transform: rotate(300deg);
      width: 130px;
      height: 130px;
      top: 170px;
      left: 150px;
    }
  }
}
</style>
