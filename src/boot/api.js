class Api {
  constructor() {
    this.baseUrl = process.env.SERVER_URL;
    this.apiUrl = `${process.env.SERVER_URL}/api/v1`;
    this.clientUrl = process.env.CLIENT_URL;
  }
  async get({ endpoint, params, token } = {}) {
    let url = `${this.apiUrl}/${endpoint}`;
    return await new Promise((resolve, reject) => {
      fetch(
        url + "?" + new URLSearchParams(params),
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {}
      )
        .then((response) => {
          if (!response.ok) {
            reject(response);
          } else {
            resolve(response.json());
          }
        })
        .catch((error) => resolve(error));
    });
  }
  async post({ endpoint, data, token } = {}) {
    let url = `${this.apiUrl}/${endpoint}`;
    return await new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            reject(response);
          } else {
            resolve(response.json());
          }
        })
        .catch((error) => resolve(error));
    });
  }
  async delete({ endpoint, params, token } = {}) {
    let url = `${this.apiUrl}/${endpoint}`;
    return await new Promise((resolve, reject) => {
      fetch(url + "?" + new URLSearchParams(params), {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
        .then((response) => {
          if (!response.ok) {
            reject(response);
          } else {
            resolve(response.json());
          }
        })
        .catch((error) => resolve(error));
    });
  }
  async xFormPost({ endpoint, data, token } = {}) {
    let url = `${this.apiUrl}/${endpoint}`;
    return await new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      })
        .then((response) => {
          if (!response.ok) {
            reject(response);
          } else {
            resolve(response.json());
          }
        })
        .catch((error) => resolve(error));
    });
  }
}

const api = new Api();

// for use inside Vue files through this.$axios and this.$api
// (only in Vue Options API form)
export default ({ app }) => {
  app.provide("api", api);
};

// Here we define a named export
// that we can later use inside .js files:
export { api };
