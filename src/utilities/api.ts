export const API_URL = process.env.API_URL;

/**
 * Fetches an url
 * @param url The url to fetch
 * @param options Fetch options
 * @returns The fetch promise
 */
export const fetchApi: (
  url: string,
  options: RequestInit
) => Promise<{ [key: string]: any }> = (url, options) => {
  if (!options.headers && options.body) {
    options.headers = new Headers();
    options.headers.append("Content-Type", "application/json");
  }

  /*if (!options.headers.get("Content-Type")) {
    options.headers.append("Content-Type", "application/json");
  }*/

  /*if (!options.headers.get("X-Requested-With")) {
		options.headers.append("X-Requested-With", "XMLHttpRequest");
	}*/

  /*if (!options.headers.get("Authorization") && token) {
    options.headers.append("Authorization", "Bearer " + token);
  }*/

  //de *must* fallback to no directory for backwards compat
  return fetch(API_URL + url, options).then(response =>
    response
      .json()
      .then(json => {
        if (response.ok) {
          if (json && json.errors && json.errors.length !== 0) {
          }

          return { json, response, error: null };
        }

        return Promise.reject({
          json: null,
          response: null,
          error: "Response wasn't ok!"
        });
      })
      .catch(e => Promise.reject({ json: null, response: null, error: e }))
  );
};
