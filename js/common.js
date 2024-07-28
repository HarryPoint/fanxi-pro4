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

class Api {
  constructor(baseURL = "https://apifoxmock.com/m1/4090542-3728567-default") {
    this.axios = axios.create({
      baseURL,
    });
  }
  async getNews({ pageSize, page }) {
    return this.axios({
      url: "/news",
      params: {
        pageSize,
        page,
      },
    });
  }
  async getNewsDetail({ id }) {
    return this.axios({
      url: `/news/${id}`,
    });
  }
}
