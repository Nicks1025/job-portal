<template>
    <div id="box">
      <button @click = "logout" id = "logout">logout</button>
      <form @submit.prevent = "addCompany">
        <div class = "form-group">
          <label>Company name : </label>
          <input type = "text" class = "form-control" placeholder = "Company name" v-model = "company.name">
        </div>
  
        <div class = "form-group">
          <label>Profile : </label>
          <input type = "text" class = "form-control" placeholder = "profile" v-model = "company.profile">
        </div>
  
        <div class = "form-group">
          <label>Type : </label>
          <input type = "text" class = "form-control" placeholder = "type - full tym/internship" v-model = "company.type">
        </div>
  
        <div class = "form-group">
          <label>Location : </label>
          <input type = "text" class = "form-control" placeholder = "location" v-model = "company.location">
        </div>
  
        <div class = "form-group">
          <label>Description : </label>
          <input type = "text" class = "form-control" placeholder = "description" v-model = "company.description">
        </div>
  
        <div class = "form-group">
          <label>Skills : </label>
          <input type = "text" class = "form-control" placeholder = "skills" v-model = "company.skills">
        </div>
  
        <div class = "form-group">
          <label>Salary : </label>
          <input type = "text" class = "form-control" placeholder = "salary" v-model = "company.salary">
        </div>
  
        <button>ADD</button>
      </form>
    </div>
  </template>
  
  <script>
  const API_URL = "http://localhost:5000"
  export default {
    data () {
      return {
        company : {
          name : '', 
          profile : '', 
          type : '',
          location : '',
          description : '', 
          skills : '', 
          salary : ''
        }
      }
    },
    methods : {
      addCompany : function(){
        this.$http.post(API_URL + "/addCompany", this.company)
        .then(data => {
          console.log("successful")
        })
      },
      logout : function(){
        this.$session.destroy()
        this.$router.push("/login")
      }
    }
  }
  </script>
  
  <style>
  #box{
    width:400px;
    padding:10px 15px;
    border:1px solid grey;
    border-radius:5px;
    margin:auto;
    margin-top:40px;
  }

  .form-group{
    margin-bottom:10px;
  }

  button{
    padding:5px 10px;
    border-radius:5px;
    background-color: yellow;
  }

  #logout{
    position:absolute;
    right:30px;
    top:10px;
  }
  </style>
  