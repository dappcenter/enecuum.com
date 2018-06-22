export default function ({store, route, redirect}) {
  let isAuthed = store.dispatch('isAuth', {cookies: store.state.cookies});
  return isAuthed.then(res => {
      if (res !== 'success') {
        return redirect('/auth/login');
      }
      let statusCode = store.state.kyc.code;
      if (route.name !== 'backoffice' && statusCode === 423) {
        return redirect('/backoffice');
      }
    }
  );
}
