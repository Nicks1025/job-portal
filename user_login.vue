<template>
    <div id = "box">

      <form @submit.prevent = "loginUser">

        <div class = "form-group">
            <label>Username : </label>
            <input type = "text" class = "form-control" placeholder = "username" v-model = "user.username" id = "username">    
        </div>

        <div class = "form-group">
            <label>Password : </label>
            <input type = "password" class = "form-control" placeholder = "password" v-model = "user.password" id = "password">
        </div>

        <p>don't have an acocunt ? <a href = "/">register here</a></p>
        <p style = "color:red">{{ ErrMsg }}</p>

        <button>Login</button>
      </form>

    </div>
  </template>
  
  <script>
  const API_URL = "http://localhost:5000"
  export default {
    beforeCreate(){
      if(this.$session.exists()){
        this.$session.destroy()
      }
    },
    data () {
      return {
        user : {
          username : '',
          password : ''
        },

        ErrMsg : ''
      }
    },

    methods :{
      loginUser : function(){
       if(this.user.username && this.user.password) {
        if(this.user.username == "admin_123" && this.user.password == "admin"){
          this.$session.start()
          this.$router.push("/admin")
        }
        else{
          this.$http.get(API_URL + "/getUser/" + this.user.username)
          .then(data => {
            if(data.body[0].password == this.user.password) {
              this.$session.start()
              this.$session.set("name", data.body[0].name)
              this.$session.set("username", this.user.username)
  
              this.$router.push("/jobs")
            }
            else{
              this.ErrMsg = "incorrect password"
            }
          })
        }
       }
       else{
        this.ErrMsg = "above credentials are required"
       } 
      }
    }
  }
  </script>
  
  <style>
  #box{
    position:relative;
    width:500px;
    border:1px solid grey;
    border-radius : 10px;
    padding:50px;
    margin:30px auto;
    background-color:blanchedalmond
  }

  #name, #username, #password {
    position:absolute;
    left:30%;
    width:200px;
  }

  .form-group{
    display:flex;
    align-items: center;
    margin-bottom:40px;
  }

  button{
    padding:5px 10px;
    border-radius:10px;
    background-color:lawngreen
  }
  </style>
  