<template>

  <div class="black-bg" v-if="모달창상태 == 1">
    <div class="white-bg">
      <h4>상세페이지</h4>
      <p>상세페이지 내용</p>
      <button @click="모달창상태 = 0">닫기</button>
    </div>
  </div>



  <div class="menu">
    <a v-for="(a,i) in menus" :key="i"> {{ a }} </a>
  </div>



  <div v-for="(a,i) in 원룸들" :key="i">
    <img :src="원룸들[i].image" alt="roomImg" class="room_img">
    <h4 @click="모달창상태 = 1">{{원룸들[i].title}}</h4>
    <p>{{ 원룸들[i].price }} 만원</p>
    <button @click="신고수[0]++">허위매물신고</button> 
    <span>신고수 : {{신고수[0]}}</span>
  </div>
</template>

<script>

import data from './oneroom';

export default {
  name: 'App',
  // 데이터 바인딩
  data(){
    return{
      원룸들 : data,
      모달창상태 : 0,
      price1 : 80,
      price2 : 70,
      menus : ['Home', 'Shop', 'About'],
      products : ['역삼동원룸', '천호동원룸', '마포구원룸'],
      신고수 : [0,0,0],
    }
  },
  // 함수 생성
  methods : {
    increase(){
      this.신고수++
    }
  },
  components: {
  }
}
</script>

<style>
body{
  margin: 0;
}
div{
  box-sizing: border-box;
}
.black-bg{
  width: 100%;
  height: 100%;
  background : rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}
.white-bg{
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu{
  background: darkblue;
  padding: 15px;
  border-radius: 5px;
}

.menu a{
  color: white;
  padding: 10px;
}

.room_img{
  width: 100%;
  margin-top: 40px;
}
</style>
