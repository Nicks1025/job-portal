<template>
    <div id = "box" class = "text-center">
      <form @submit.prevent = "registerUser">
        <div class = "form-group">
            <label>Name : </label>
            <input type = "text" class = "form-control" placeholder = "name" v-model = "user.name" id = "name">
        </div>

        <div class = "form-group">
            <label>Username : </label>
            <input type = "text" class = "form-control" placeholder = "username" v-model = "user.username" id = "username">    
        </div>

        <div class = "form-group">
            <label>Password : </label>
            <input type = "password" class = "form-control" placeholder = "password" v-model = "user.password" id = "password">
        </div>

        <p>already have an account?<a href = "/login"> Log in</a></p>
        <p style = "color:red">{{ ErrMsg }}</p>

        <button>Register</button>
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
            name : '',
            username : '', 
            password : ''
        },
        ErrMsg : ''
      }
    },

    methods : {
        registerUser : function(){
            if(this.user.username && this.user.password) {
              if(this.user.username == "admin_123") {
                this.ErrMsg = "This username is not available. please use a different username"
              }
              else{
                this.$http.get(API_URL + "/getUser/" + this.user.username)
                .then(result => {
                    if(result.body.length != 0) {
                        this.ErrMsg = "user already exists!!"
                    }
                    else{
                        this.$http.post(API_URL + "/addUser", this.user)
                        .then(result => {
                          this.$router.push("/login")
                        })
                    }
                })
              }
            }
            else{
                this.ErrMsg = "fields cannot be empty"
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
  