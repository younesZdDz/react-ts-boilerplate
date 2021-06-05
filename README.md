# React boilerplate
# `1. Ecosystem`
* [Redux-toolkit](https://github.com/reduxjs/redux-toolkit) as a toolset for Redux development 
* [React-router](https://github.com/ReactTraining/react-router) as a routing package
* [React-helmet](https://github.com/nfl/react-helmet) to manage document head changes
* [Formik](https://github.com/formium/formik) + [Yup](https://github.com/jquense/yup) for form validation
* [Axios](https://github.com/axios/axios) as HTTP client
* [Material-ui](https://material-ui.com/) as styling solution (theming, classNames hashing ...) 

# `2. Project structure`
* `server`: this folder contains development and production server configuration
* `src/components` and `src/containers`: We use the container/component architecture. `containers/` contains React components which are connected to the redux store. `components/` contains dumb React components which depend on containers for data. Container components care about how things work, while components care about how things look. <br>
We treat single pages (e.g. the LoginPage, the HomePage, etc.) as containers and their small parts (e.g. the Login form, the Navigation bar) as components.
* `src/shared`: this folder contains the shared logic, mostly reusable types, hooks, contexts ...
* `src/api`:  this folder contains helper functions to communicate with an API, for example the request inteceptor that adds the access token to outgoing requests.
* `src/redux`:  this folder contains the redux logic. We use redux-toolkit which combines: 
   - [Reselect](https://github.com/reduxjs/reselect) library, as store selector.
   - [Immer](https://github.com/immerjs/immer) library, which helps you create the next immutable state tree by simply modifying the current tree.
   - [Redux-thunk](https://github.com/reduxjs/redux-thunk) and [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension) middlewares included by default.
* `src/assets`:  this folder contains static app assets (images ...).
* `src/config`:  this folder contains the config file for the environement variables.
