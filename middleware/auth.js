export default function ({store, redirect}) {
  let isAuthed = store.dispatch('isAuth', {cookies: store.state.cookies});
  return isAuthed.then(res => {
    if (res !== 'success') {
      return redirect('/signin');
    }
  });
}
