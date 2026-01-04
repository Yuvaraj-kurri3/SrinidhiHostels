const production = "https://srinidhihostelsbackend.onrender.com";
const development = "http://localhost:5000";

const api = process.env.NODE_ENV === "production" ? production : development;

export default api;