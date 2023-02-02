<template>
  <div>
    <div id = "nav">
      <h1>{{this.$session.get("username")}}</h1>
      <div style = "display:flex; align-items: center;">
        <div>
          <button @click = "profile">Profile</button>
          <p id = "alert" v-show = "showAlert" >profile already created</p>
        </div>
        <button @click = "jobsApplied">applied jobs</button>
        <button @click = "logout">Logout</button>
      </div>
    </div>

    <div id="box" v-for = "job,index in jobs">
      <h1><u>{{ job.company }}</u></h1>
    
      <div id = "skills">
        <div>
          <h4>{{ job.profile }}</h4>     
          <span class = "fa fa-star"></span>{{ job.type }}
          <p><span class = "fa fa-location"></span> {{ job.location }}</p>
          <p>Salary : {{ job.salary }}</p>
        </div>
        
        <div>
          <h5>Skills Required </h5>
          <li>{{ job.skills }}</li>
        </div>
      </div>
      <h3>Description : </h3>
      <p>{{ job.description }}</p>
      <button @click = "apply(index, job.id)">Apply now</button>
    </div>

  </div>
  </template>
  
  <script>
  const API_URL = "http://localhost:5000"
  export default {

    beforeCreate(){
      if(!this.$session.exists()){
        this.$router.push("/login")
      }
      else{
        this.$http.get(API_URL + "/getJobs")
        .then(data => {
          this.jobs = data.body
        })

        this.$http.get(API_URL + "/getProfile/" + this.$session.get("username"))
        .then(data => {
          this.profiles = data.body
          console.log(this.profiles)
        })

      }
    },

    data () {
      return {
        profiles : [],
        jobs : [],

        jobApplied : {
          jobid : '',
          username : this.$session.get("username"),
          companyname : '',
          profile : '',
          type : '',
          location : '',
          salary : '', 
          description : ''
        },
        showAlert : false
      }
    },
    methods : {
      apply : function(index, id){
        // if(!this.jobApplied.includes(id)) {

          this.$http.get(API_URL + "/jobsApplied/" + id)
          .then(result => {
            if(result.body.length == 0) {
              this.$http.get(API_URL + "/getJob/" + id)
              .then(result => {
                if(result.body.length != 0) {
                  this.jobApplied.jobid = result.body[0].id;
                  this.jobApplied.companyname = result.body[0].company;
                  this.jobApplied.profile = result.body[0].profile
                  this.jobApplied.type = result.body[0].type
                  this.jobApplied.location = result.body[0].location
                  this.jobApplied.salary = result.body[0].salary
                  this.jobApplied.description = result.body[0].description
                  
                  this.$http.post(API_URL + "/jobsApplied", this.jobApplied)
                  .then(data => {
                    console.log("posted")
                  })
                }
              })

            }
            else{
              console.log("already applied")
            }
          })
          // console.log(this.jobApplied)
        // }

        if(this.profiles.length == 0) {
          this.$router.push("/profile")
        }
      },

      profile : function(){
        if(this.profiles.length != 0) {
          this.showAlert = true
          const timer = setTimeout(() => {
            this.showAlert = false
          },3000)
          // clearTimeout(timer)
          console.log("profile already created")
        }
        else{
          this.$router.push("/profile")
        }
      },

      logout : function(){
        this.$session.destroy()
        this.$router.push("/login")
      },

      jobsApplied : function(){
        this.$router.push("/jobsApplied")
      }
    }
  }
  </script>
  
  <style>
  body{
    box-sizing: border-box;
    padding:0;
    margin:0;
  }

  #nav{
    display:flex;
    align-items: center;
    justify-content:space-between;
    padding-left : 20px;
    padding-right:50px;
    width:100%;
    background-color:black;
    color:white;
    height:70px;
  }
  #box{
    display:inline-block;
    width:48%;
    border:1px solid grey;
    margin:1% 1%;
    padding:1% 3%;
    background-color:blanchedalmond
  }

  #skills{
    display:flex;
    align-items: center;
    justify-content:space-between;
  }

  button{
    padding:5px 10px;
    border-radius:10px;
    background-color:yellow
  }

  #alert{
    position:absolute;
    top:15%; 
    color:red;
    background-color:antiquewhite;
    border: 1px solid grey;
    padding: 5px 10px;
    width:130px;
  }
  </style>
  