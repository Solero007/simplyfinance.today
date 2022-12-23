import Vue from 'vue';

Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('money', function (value) {
  if (!value) return '£0';
  value = value || 0;
  let unitValue = (value / 100).toFixed(2);
  return `£${unitValue}`;
});


Vue.filter('roundDown', function (value) {
  if (!value) return 0;
  if (value <= 100) return value;
  return Math.floor(value / 10) * 10;
});

Vue.filter('viewCount', function (value) {
  if (!value) return 1;
  if (value <= 100) return value;
  return Math.floor(value / 10) * 10 + '+';
});

Vue.filter('numberFormatted', function (value) {
  if (!value) return null;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

Vue.filter('slug', function (value) {
  if (!value) return null;
  return value.replace(/ /g, '-').toLowerCase();
});
