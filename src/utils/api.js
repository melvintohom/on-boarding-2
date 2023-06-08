/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import axios from 'axios';

import { isSignedIn, signOut } from './auth';

// import { environment } from '../app.json';

const environment = 'local';

let BASE_API = '';
let BASE_APDIGITALES = '';
if (environment === 'local') {
  BASE_API = 'http://localhost:58538/';
  BASE_APDIGITALES = 'https://desaapdigitales.launion.com.gt/api/';
  // BASE_API = "http://192.168.64.106:45455/";
  // BASE_API = "http://192.168.1.7:45455/";
} else if (environment === 'dev') {
  BASE_API = 'https://desagestionapp.launion.com.gt/api/';
  BASE_APDIGITALES = 'https://desaapdigitales.launion.com.gt/api/';
} else if (environment === 'qa') {
  BASE_API = 'https://qagestionapp.launion.com.gt/api/';
  BASE_APDIGITALES = 'https://desaapdigitales.launion.com.gt/api/';
} else if (environment === 'prod') {
  BASE_API = 'https://api.launion.com.gt/';
  BASE_APDIGITALES = 'https://apdigitales.launion.com.gt/api/';
}

class Api {
  state = {
    token: {},
  };

  async baseApi() {
    return BASE_API;
  }

  getENV() {
    return environment;
  }

  APIS = function (name) {
    switch (name) {
      case 'digitalizacion':
        return BASE_APDIGITALES;
      default:
        return BASE_API;
    }
  };

  async Login(user, pass, type) {
    const fetchEndpoint = `${BASE_API}token`;

    const details = {
      userName: user,
      password: pass,
      auth_type: type,
      grant_type: 'password',
    };

    let formBody = [];
    for (const property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    formBody = formBody.join('&');

    const query = await fetch(fetchEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    });

    const request = await query.json();
    console.log('API[Login]: DATOS DE SESSION (TOKEN REQUEST)', request);
    return request;
  }

  async getUsuarios() {
    const fetchEndpoint = `${BASE_API}api/usuario/getUsuarios`;

    const request = await this.realizarPeticionGet(fetchEndpoint);
    console.log('API[getUsuarios]: ', request);

    if (request.statusCode === 401) {
      window.location.href = '/login';
    }

    return request;
  }

  //* *METODOS GENERALES***********//

  async fetchGetRequest(uri, base_api = BASE_API) {
    const fetchEndpoint = `${base_api}${uri}`;

    const request = await this.realizarPeticionGet(fetchEndpoint);
    console.log(`API[${uri}]: `, request);

    return request;
  }

  // eslint-disable-next-line consistent-return
  async realizarPeticionGet(endPoint) {
    try {
      // let auth = await isSignedIn();
      const fetchEndpoint = endPoint;

      const query = await fetch(fetchEndpoint);

      // const query = await fetch(fetchEndpoint, {
      //   // headers: {
      //   //   Authorization: "bearer " + auth.accessToken,
      //   // },
      // });

      const request = await this.processResponse(query);

      return request;
    } catch (error) {
      console.log(error);
    }
  }

  async post(uri, formData) {
    // Usamos Axios
    const auth = await isSignedIn();

    const fetchEndpoint = `${BASE_API}${uri}`;

    const request = await axios.post(fetchEndpoint, formData, {
      headers: { Authorization: `bearer ${auth.accessToken}` },
    });
    console.log(`REQUEST POST AXIOS [${uri}]`, request);

    return request;
  }

  async postFile(uri, formData) {
    const auth = await isSignedIn();
    const url = `${BASE_API}${uri}`;
    const request = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        'content-type': 'multipart/form-data',
      },
    });
    return request;
  }

  async post_custom_uri(uri, formData, base_api = BASE_API) {
    // Usamos Axios
    const auth = await isSignedIn();

    const fetchEndpoint = `${base_api}${uri}`;

    const request = await axios.post(fetchEndpoint, formData, {
      headers: { Authorization: `bearer ${auth.accessToken}` },
    });
    console.log(`REQUEST POST AXIOS [${uri}]`, request);

    return request;
  }

  async put(uri, formData, base_api = BASE_API) {
    const auth = await isSignedIn();

    const fetchEndpoint = `${base_api}${uri}`;

    const request = await axios.put(fetchEndpoint, formData, {
      headers: { Authorization: `bearer ${auth.accessToken}` },
    });
    console.log(`REQUEST POST AXIOS [${uri}]`, request);

    return request;
  }

  async realizarPeticionPostPut(fetchEndpoint, sendData, requestType) {
    fetchEndpoint = `${BASE_API}${fetchEndpoint}`;

    const auth = await isSignedIn();

    let formBody = [];
    for (const property in sendData) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(sendData[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    formBody = formBody.join('&');

    const query = await fetch(fetchEndpoint, {
      method: requestType,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: formBody,
    });

    const request = await this.processResponse(query);
    return request;
  }

  /// /////////////////////Generales

  async processResponse(response) {
    const statusCode = response.status;
    let data;
    try {
      data = response.json();
    } catch (e) {
      data = {};
    }

    const promiseResponse = await Promise.all([statusCode, data]).then((res) => ({
      statusCode: res[0],
      data: res[1],
    }));

    if (promiseResponse.statusCode === 401) {
      await signOut();
    }

    return promiseResponse;
  }

  async fetchGetRequestWithParams(uri, params, base_api = BASE_API) {
    const urlParameters =
      params != null
        ? `?${Object.keys(params)
            .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&')}`
        : '';

    const fetchEndpoint = `${base_api}${uri}${urlParameters}`;

    const request = await this.realizarPeticionGet(fetchEndpoint);
    console.log(`API[${fetchEndpoint}]: `, request);

    if (request.statusCode === 401) {
      if (await signOut()) {
        window.location.href = '/login';
      }

      return false;
    }

    return request;
  }

  async getWithParamsNoQuestionSymbol(uri, params) {
    const urlParameters =
      params != null
        ? `${Object.keys(params)
            .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&')}`
        : '';

    const fetchEndpoint = `${BASE_API}${uri}${urlParameters}`;

    const request = await this.realizarPeticionGet(fetchEndpoint);
    console.log(`API[${fetchEndpoint}]: `, request);

    if (request.statusCode === 401) {
      if (await signOut()) {
        window.location.href = '/login';
      }

      return false;
    }

    return request;
  }
}

export default new Api();
