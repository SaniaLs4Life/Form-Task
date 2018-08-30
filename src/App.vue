<template>
  <div id="app">
      <app-container></app-container>
      <app-success v-show="false"></app-success>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    }
  }
}
</script>

<style>
*{
    box-sizing: border-box;
}
body{
    background: #F7F7F7;
    font-family: 'Comfortaa';
    margin: 0;
    padding: 0;

}
.container{
    margin:auto;
}
.header{
    background: #355990;
    border-top:15px solid #1E3B68;
    padding:2em;
    color:white;    

}
.header div{
    width:870px;
    margin:auto;
    font-size: 25px;
}
.about, .coordinator, .when{
    max-width: 900px;
    padding:2em;
    margin:auto;
    color:#385B92;
    font-size: 14px;
    background:#FFF;
    box-shadow: 0px 0px 2px 0px rgba(181,181,181,0.86);
    margin-top:25px;
}
.button{
    max-width: 900px;
    padding:2em;
    margin:auto;
    font-size: 14px;
    text-align: center;
}
.success{
    max-width: 900px;
    padding:2em;
    margin:auto;
    font-size: 14px;
    background: #F0FCF3;
    box-shadow: 0px 0px 2px 0px rgba(181,181,181,0.86);
}
.success h2{
    color:#72C077;
}
.success p{
    color:#666;
}
.button input[type="submit"]{
    padding:15px;
    outline:none;
    border:none;
    background:#FF8E1D;
    font-weight: bold;
    color:#FFF;
    cursor: pointer;
    border-radius: 2px;
}
form label{
    color:#385B92;
}

.number{
    width:70px !important;
}
input[type="text"], .multiline, select, input[type="email"], input[type="date"]{
    padding:10px;
    outline: none;
    border-radius: 1px;
    border:1px solid #DDDDDF;
    width: 500px;
    resize: none;
    color: #666;
    margin-top:10px;
}
table{
    margin-top:25px;
}
.about table tr td, .coordinator table tr td{
    width: 150px;
}
.counter{
    float: right;
    color: #999;
    font-style: italic;
    font-size: 10px;
}
.desc{
    color: #999;
    font-style: italic;
    font-size: 10px;
}
input[type="date"]{
    width:200px;
    padding:7px;
    outline: none;
    border-radius: 1px;
    border:1px solid #DDDDDF;
    color: #666;
    margin-left:60px;
}
input[type="time"]{
    width:80px !important;
    padding:7px;
    outline: none;
    border-radius: 1px;
    border:1px solid #DDDDDF;
    color: #666;
}
.duration{
    width:100px !important;
}
#duration{
    margin-left:60px;
}
.error{
    background:#FFB2B2;
    color:#FFF;
    font-size: 11px;
    padding:5px;
    margin-top:9px;
    position: relative;
    left:7px;
    border-radius: 2px;
    text-align: center;
    width:180px;
}
.error::after, .error::before{
    right: 100%;
	top: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}
.error::after{
    border-color: rgba(136, 183, 213, 0);
	border-right-color: #FFB2B2;
	border-width: 5px;
	margin-top: -5px;
}
.error::before{
    border-color: rgba(194, 225, 245, 0);
	border-right-color: #FFB2B2;
	border-width: 5px;
	margin-top: -5px;
}

</style>
