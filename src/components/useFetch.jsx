import axios from "axios";

export default class PostService {
  static async getAll(page = 1) {
    return await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=$10&_page=${page}`
    )
  }
  
  static async getById(id) {
    return await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    )
  } static async getComments(id) {
    return await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    )
  }
}

