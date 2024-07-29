const readyCallStack = [];

function readyCall() {
  readyCallStack.forEach((fn) => {
    fn();
  });
}

function readyInit() {
  if (document.readyState !== "loading") {
    readyCall();
  } else {
    document.addEventListener("DOMContentLoaded", readyCall);
  }
}

readyInit();

function ready(fn) {
  readyCallStack.push(fn);
}

function updateQueryParam(key, value) {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url);
}

function getQueryParam(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

class LRUCache {
  #length;
  #cache;
  constructor(length) {
    this.#length = length;
    this.#cache = new Map();
  }

  get(key) {
    if (!this.#cache.has(key)) {
      return;
    }
    const value = this.#cache.get(key);
    this.#cache.delete(key);
    this.#cache.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.#cache.has(key)) {
      this.#cache.delete(key);
    }
    if (this.#cache.size === this.#length) {
      this.#cache.delete(this.#cache.keys().next().value);
    }
    this.#cache.set(key, value);
  }
}
// https://api.github.com/search/repositories?q=stars%3A%3E1&sort=stars&order=desc&type=Repositories&page=1&per_page=10
class Api {
  #cache;
  constructor(baseURL = "https://api.github.com/") {
    this.#cache = new LRUCache(10);
    this.axios = axios.create({
      baseURL,
    });
    // 添加响应拦截器
    this.axios.interceptors.response.use(
      (response) => {
        console.log("response: ", response);
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        if (response.request.responseURL) {
          this.#cache.set(response.request.responseURL, response.data);
        }
        return response;
      },
      function (error) {
        console.log("error: ", error);
        return Promise.reject(error);
      }
    );
  }
  async fetch(params) {
    const key = JSON.stringify(params);
    const cacheData = this.#cache.get(key);
    if (cacheData) {
      return cacheData;
    }
    const res = await this.axios(params);
    this.#cache.set(key, res);
    return res;
  }
  // https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&type=Repositories&page=1&per_page=1
  async getRepositories(query) {
    const { page, per_page, q, sort, order, type } = query;
    const res = await this.fetch({
      url: "/search/repositories",
      params: {
        page,
        per_page,
        q,
        sort,
        order,
        type,
      },
    });
    return res;
  }
}

const api = new Api();
