export default function ({store, redirect}) {
  let isAuthed = store.dispatch('get2fa', {cookies: store.state.cookies});
  return isAuthed.then(res => {
    if (res.code !== 200) return redirect('/auth/login');
  });
}
