import axios from "axios";
import apiConfig from "./apiConfig";
// import Vue from 'vue';

let api = axios.create({
  baseURL: apiConfig,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

export default api;