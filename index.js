const express = require("express")
const app = express()

app.use(express.json())

const pool = require('./db')

// user
app.get("/getUser/:username", async(req,res) => {
    try {
        const user = await pool.query("select * from users where username = $1", [req.params.username])
        res.json(user.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.post("/addUser", async(req,res) => {
    
    try {
        const {name, username, password} = req.body
        const newUser = await pool.query("insert into users(name, username, password) values($1, $2, $3)", [name, username, password])
        res.json(newUser)
    } catch (error) {
        console.error(error.message)
    }
})


// profile

app.post("/addProfile", async(req,res) => {
    console.log("adding")
    try {
        const {username, fname, mname, lname, dob, email, phnumber, state, city, pin, address, collegename, branch, cgpa, profileCreated} = req.body
        const addProfile = await pool.query("insert into profile(username, fname, mname, lname," + 
        "dob, email, phnumber, state, city, pin, address, collegename, branch," + 
        "cgpa, profilecreated) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)", [username, fname, mname, lname, dob, email, phnumber, state, city, pin, address, collegename, branch, cgpa, profileCreated])

        res.json(addProfile)
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/getProfile/:username", async(req,res) => {
    try {
        const profile = await pool.query("select * from profile where username = $1", [req.params.username])
        res.json(profile.rows)
    } catch (error) {
        console.error(error.message)
    }
})



// jobs
app.get("/getJobs",async(req,res) => {
    try {
        const jobs = await pool.query("select * from jobs")
        res.json(jobs.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/getJob/:id",async(req,res) => {
    try {
        const jobs = await pool.query("select * from jobs where id = $1", [req.params.id])
        res.json(jobs.rows)
    } catch (error) {
        console.error(error.message)
    }
})


app.get("/allAppliedJobs", async(req,res) => {
    try {
        const jobs = await pool.query("select * from appliedjobs")
        res.json(jobs.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/jobsApplied/:id", async(req,res) => {
    try {
        const jobapplied = await pool.query("select * from appliedjobs where job_id = $1", [req.params.id])
        res.json(jobapplied.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.post("/jobsApplied", async(req,res) => {
    try {
        const {jobid, username, companyname, profile, type, location, salary, description} = req.body
        const jobapplied = await pool.query("insert into appliedjobs(job_id, username, companyname, profile, type, location," + 
        "salary, description) values($1, $2, $3, $4, $5, $6, $7, $8)", [jobid, username, companyname, profile, type, location, salary, description])
        res.json(jobapplied)
    } catch (error) {
        console.error(error.message)
    }
})



app.post("/addCompany", async(req,res) => {
    try {
        const {name, profile, type, location, description, skills, salary} = req.body
        const newCompany = await pool.query("insert into jobs(company, profile, type, location, description, skills," + 
        " salary) values($1, $2, $3, $4, $5, $6, $7)", [name, profile, type, location, description, skills, salary])
        res.json(newCompany)
    } catch (error) {
        console.error(error.message)
    }
})




const PORT = 5000
app.listen(PORT, ()=>{console.log(`server started on port ${PORT}`)})