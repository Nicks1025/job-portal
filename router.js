import register from "../components/user_registration.vue"
import login from "../components/user_login.vue"
import jobs from "../components/job_list.vue"
import profile from "../components/profile.vue"
import jobsApplied from "../components/job_application"
import admin from "../components/admin.vue"

export default [
    {
        path : "/",
        component : register        
    },
    {
        path : "/login",
        component : login        
    },
    {
        path : "/jobs",
        component : jobs        
    },
    {
        path : "/profile",
        component : profile        
    },
    {
        path : "/jobsApplied",
        component : jobsApplied        
    },
    {
        path : "/admin",
        component : admin        
    }
]