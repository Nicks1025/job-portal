<template>
    <div>
      <div id="box" v-for = "job,index in jobs">
      <h1><u>{{ job.companyname }}</u></h1>
    
      <div id = "skills">
        <div>
          <h4>{{ job.profile }}</h4>     
          <span class = "fa fa-star"></span>{{ job.type }}
          <p><span class = "fa fa-location"></span> {{ job.location }}</p>
          <p>Salary : {{ job.salary }}</p>
        </div>
      </div>
      <h3>Description : </h3>
      <p>{{ job.description }}</p>
    </div>
    </div>
  </template>
  
  <script>
  const API_URL = "http://localhost:5000"
  export default {
    beforeCreate(){
      if(this.$session.exists()){
        this.$http.get(API_URL + "/allAppliedJobs")
        .then(result => {
          this.jobs = result.body
          console.log(this.jobs)
        })
      }
      else{
        this.$router.push("/login")
      }
    },
    data () {
      return {
        jobs : []
      }
    }
  }
  </script>
  
  <style>

  body{
    box-sizing: border-box;
    padding:1%;
    margin:0;
  }
    #box{
    display:inline-block;
    width:100%;
    border:1px solid grey;
    margin:1% 0%;
    padding:1% 3%;
    background-color:blanchedalmond
  }

  button{
    padding:5px 10px;
    border-radius:10px;
    background-color:yellow
  }
  </style>
  