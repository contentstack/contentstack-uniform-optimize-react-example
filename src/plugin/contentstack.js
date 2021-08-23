// Helper function

const contentstack = require('contentstack');

const Stack = contentstack.Stack({
  api_key: process.env.REACT_APP_API_KEY,
  delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
  environment: process.env.REACT_APP_ENVIRONMENT,
  region: process.env.REACT_APP_REGION ? process.env.REACT_APP_REGION : 'us',
});

export default {

  getEntryByUrl(contentTypeUid, entryUrl, referenceFieldPath) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where('url', `${entryUrl}`).find();
      data.then(
        (result) => {
          resolve(result[0]);
        },
        (error) => {
          reject(error);
        }
      );
    });
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
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },
};
