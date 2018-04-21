import 'whatwg-fetch';

export default async function request(url, options = {}) {
  const { body = null, method = 'GET', contentType = 'application/json' } = options;
  const params = {};
  const headers = {
    'Content-Type': contentType,
    // 'Accept':accept,
  };

  //
  params.method = method;
  params.headers = headers;

  if (method !== 'GET') {
    params.body = JSON.stringify(body);
  }
  params['Referrer-Policy'] = 'no-referrer';
  const response = await fetch(url, params);
  // const responseJson = await response.json();
  const responseJson = response.text().then((text) => text ? JSON.parse(text) : {});
  if (response.status === 200) {
    return responseJson;
  }


  const error = new Error(responseJson.message);
  throw error;
}
