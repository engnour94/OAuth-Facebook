
const authorizeUrl = 'https://www.facebook.com/v10.0/dialog/oauth';
const options = {
  client_id: '1243292162768569',
  redirect_uri: 'https://fb-outh-by-nour.herokuapp.com/oauth',
  state: 'some_random_string',
};

const queryString = Object.keys(options)
  .map((key) => {
    return `${key}=${encodeURIComponent(options[key])}`;
    // client_id=f99cc8c339968475c82d&scope=readEncodeColon&state=some_randome_string
  }).join('&');

console.log('query string: ', queryString);

const authUrl = `${authorizeUrl}?${queryString}`;
const a = document.getElementById('oauth');
a.setAttribute('href', authUrl);


