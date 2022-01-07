A basic isomorphic app with React.

On the first request, the server sends pre-rendered html and the client side code along. 

On further actions and navigation, the client side code is executed like on a classic CSR SPA.

## how to use
- `npm install`
- `npm run build` for building the react app
- `npm start` for starting the server

## how to fetch data when I need to pre-render?
You can fetch any data you need before the pre-render in `server.js` file.

Any data that you put in `__FETCHED_DATA__` object will be injected in the application (and available both in SSR and CSR).

## what now?
This is obviously for very small use cases because: 
- there is no isomorphic router, 
- no hot module replacement when developing (you need to rebuild the react app at every change), 
- no logic for fetching specific piece of data before the first render, 
- no caching of pre-rendered html,
- and so on.
