export default function ({store, route, redirect}) {
  let isAuthed = store.dispatch('isAirdropAuth', {cookies: store.state.cookies});
  return isAuthed.then(res => {
      if (res !== 'success') {
        return redirect('/airdrop/signin');
      }
    }
  );
}

function routerFilter(code, routeName, redirect) {
  if (routeName !== 'backoffice' && (code === 423 || code === 200)) {
    return redirect('/backoffice');
  }
  if (routeName === 'backoffice' && (code !== 423 && code !== 200)) {
    return redirect('/backoffice/kyc');
  }
  /*  if (routeName === 'backoffice' && code === 511) {
      return redirect('/backoffice/kyc');
    }*/
}
