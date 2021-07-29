// Helper function

import axios from 'axios';

const contentstack = require('contentstack');

const Stack = contentstack.Stack({
  api_key: process.env.REACT_APP_API_KEY,
  delivery_token: process.env.REACT_APP_ACCESS_TOKEN,
  environment: process.env.REACT_APP_ENVIRONMENT,
  region: process.env.REACT_APP_REGION ? process.env.REACT_APP_REGION : 'us',
});

export default {
  
  getData(url) {
    let header_data = {
      headers: {
        api_key: process.env.REACT_APP_API_KEY,
        access_token: process.env.REACT_APP_ACCESS_TOKEN, // mention your delivery token with variable as access_token
      },
    };
    return axios.get(url, header_data);
  },

  getEntry(contentTypeUid, referenceFieldPath) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            console.log(result);
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },
};
