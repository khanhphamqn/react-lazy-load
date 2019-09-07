const defaultHeader = {
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/javascript, */*; q=0.01'
};

const buildRequest = ( endpoint, opts) => fetch(endpoint, opts).then((response) => {
  if (response.ok) {
    return response.json();
  }
  else {
    throw new Error();
  }
})

class APIRequest {
  constructor(settings) {
    this.url = settings.url;
    this.opts = settings.opts;
  }
  get(endpoint, opts) {
    const options = {
      headers: {
        ...defaultHeader
      },
      ...this.opts,
      ...opts,
      method: 'GET'
    };
    return buildRequest(`${this.url}${endpoint}`, options);
  }
  post(endpoint, opts) {
    const options = {
      headers: {
        ...defaultHeader
      },
      ...this.opts,
      ...opts,
      method: 'POST'
    };
    return buildRequest(`${this.url}${endpoint}`, options);
  }
}

export default APIRequest;