<template>
    <div id = "registrationForm">
        <p style = "color:red">please enter details carefully. once submitted it cannot be edited</p>
      <form @submit.prevent = "submitProfile">
        <div id = "name">

          <div class = "form-group">
            <label>First Name : </label>
            <input type = "text" class = "form-control" placeholder = "first name" v-model = "user.fname" required>
          </div>
  
          <div class = "form-group">
            <label>Middle Name : </label>
            <input type = "text" class = "form-control" placeholder = "middle name" v-model = "user.mname" required>
          </div>
          
          <div class = "form-group">
            <label>Last Name : </label>
            <input type = "text" class = "form-control" placeholder = "last name" v-model = "user.lname" required>
          </div>

        </div>
        
        <div class = "form-group">
          <label>Date of Birth : </label>
          <input type = "date" v-model = "user.dob" required>
        </div>

        <div class = "form-group">
          <label>Email : </label>
          <input type = "email" class = "form-control" placeholder = "email" v-model = "user.email" required>
        </div>

        
        <div class = "form-group">
          <label>Phone no. : </label>
          <input type = "number" class = "form-control" v-model = "user.phnumber" required>
        </div>

        <div id = "name">
          <div class = "form-group">
            <label>State : </label>
            <input type = "text" class = "form-control" placeholder = "state" v-model = "user.state" required>
          </div>

          <div class = "form-group">
            <label>City : </label>
            <input type = "text" class = "form-control" placeholder = "city" v-model = "user.city" required>
          </div>

          <div class = "form-group">
            <label>Pincode : </label>
            <input type = "text" class = "form-control" placeholder = "" v-model = "user.pincode" required>
          </div>
        </div>

        
        <div class = "form-group" style = "display:flex; align-items:center">
          <label style = "margin-right : 10px">Permanent Address : </label>
          <textarea style = "width:400px" v-model = "user.address" required></textarea>
        </div>

        <div class = "mt-5" id = "name">
          <div class = "form-group">
            <label>College Name :</label>
            <input type = "text" class = "form-control" placeholder = "college name" v-model = "user.collegename" required>
          </div>

          <div class = "form-group">
            <label>Branch : </label>
            <input type = "text" class = "form-control" placeholder = "Branch" v-model = "user.branch" required>
          </div>

        </div>

        
        <div class = "form-group">
          <label>CGPA : </label>
          <input type = "text" class = "form-control" v-model = "user.cgpa" required>
        </div>

        <div class = "form-group">
          <label>Updated Resume : </label>
          <input type = "file">
        </div> 

        <button>Submit</button>
      </form>
    </div>
</template>

<script>
const API_URL = "http://localhost:5000"
export default{
    beforeCreate(){
        if(!this.$session.exists()){
            this.$router.push("/login")
        }
        else{
            this.$http.get(API_URL + "/getProfile/" + this.$session.get("username"))
            .then(data => {
                this.profile = data.body
            })
        }
    },
    data(){
        return{
            profile : [],
            user : {
                username : this.$session.get("username"),
                fname : '', 
                mname : '',
                lname : '',
                dob : '',
                email : '',
                phnumber : '',
                state : '',
                city : '', 
                pin : '',
                address : '', 
                collegename : '',
                branch : '',
                cgpa : '',
                profileCreated : "true"
            }
        }
        
    },
    methods : {
        submitProfile : function(){
            console.log("clicked")
                this.$http.post(API_URL + "/addProfile", this.user)
                .then(data => {
                    console.log("added")
                    this.$router.push("/jobs")
                })
        }
    }
}
</script>

<style>
#registrationForm{
    position:absolute;
    top:6%;
    left:10%;
    width:80%;
    padding:10px 20px;
    background-color:linen;
    margin-bottom:6%;
  }

  .form-group{
    margin-bottom:10px;
  }

  .form-group input{
    width:300px;
    margin-top:5px;
  }

  .form-group input[type = "date"] {
    width:200px;
    border-radius: 5px;
  }

  #name{
    display:flex;
    align-items: center;
    justify-content: space-between;
  }

  button{
    padding:5px 10px;
    border-radius:10px;
    background-color:yellow
  }

</style>