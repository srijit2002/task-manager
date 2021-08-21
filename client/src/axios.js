import axios from "axios"

const instance=axios.create({
    baseURL:"https://task-manager-dashboard.herokuapp.com"
    
})
export default instance;