import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  if (process.client) {
    var storage = window.sessionStorage;
    if (typeof Storage === 'undefined') storage = window.localStorage;
    new VuexPersistence({
      key: 'vuex',
      storage: storage,
    }).plugin(store);
  }
};
