export default function ({ $axios, redirect, app }) {
  $axios.onRequest((config) => {
    // app.store.dispatch('loader/set', true);
  });

  $axios.interceptors.response.use(
    function (response) {
      // app.store.dispatch('loader/set', false);
      return response;
    },
    function (error) {
      // app.store.dispatch('loader/set', false);
      return Promise.reject(error);
    }
  );
}
