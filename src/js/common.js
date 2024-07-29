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
// https://api.github.com/search/repositories?q=stars%3A%3E1&sort=stars&order=desc&type=Repositories&page=1&per_page=10
class Api {
  constructor(baseURL = "https://api.github.com/") {
    this.axios = axios.create({
      baseURL,
    });
  }
  // https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&type=Repositories&page=1&per_page=1
  async getRepositories({ page, per_page, q, sort, order, type }) {
    return this.axios({
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
  }
}

const api = new Api();
