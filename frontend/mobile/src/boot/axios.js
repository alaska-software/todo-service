import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

const axiosInstance = axios.create({
    //Use the IP 10.0.2.2 to access the host your emulator is running on
    //Read more https://developer.android.com/studio/run/emulator-networking#networkaddresses
    //baseURL: "http://10.0.2.2:9100/",
    baseURL: 'http://localhost:9100/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default defineBoot(({ app }) => {
    // Make axios available globally on the app instance
    app.config.globalProperties.$axios = axios
    app.config.globalProperties.$api = axiosInstance
})

export { axiosInstance }
