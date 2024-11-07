import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:7001/books-spring-boot-weblogic/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});
// http://localhost:8080/api/v1
// http://localhost:7001/books-spring-boot-weblogic/api/v1