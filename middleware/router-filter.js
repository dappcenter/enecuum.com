export default function ({route, redirect}) {
  if (routes.indexOf(route.path) > -1) {
    redirect('/app/signup');
  }
}

const routes = ['/app', '/app/'];
