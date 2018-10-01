export default function ({store, route, redirect}) {
  let isAuthed = store.dispatch('isAirdropAuth', {cookies: store.state.cookies});
  return isAuthed.then(res => {
      if (res !== 'success') {
        return redirect('/airdrop/signup');
      }
    }
  );
}
