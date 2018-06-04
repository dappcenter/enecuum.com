export default function ({route, redirect}) {
  if (routes.indexOf(route.path) > -1) {
    !process.env.dev ? redirect('/') : null;
  }
}

const routes = ['/account'];
