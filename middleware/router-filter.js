export default function ({route, redirect}) {
  console.log('router', route.path);
  if (routes.indexOf(route.path) > -1) {
    redirect('/app/signup');
  }
}

const routes = ['/app', '/app/'];
