import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'src/firebase';

const LoginDialog: React.FC<{ open: boolean }> = ({ open }) => {
  const authConfig: firebaseui.auth.Config = {
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult() {
        return false;
      },
      uiShown() {},
    },
    signInFlow: 'popup',
  };

  return (
    <Dialog
      aria-labelledby="Login dialog"
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle>Login</DialogTitle>
      <StyledFirebaseAuth
        uiConfig={authConfig}
        firebaseAuth={firebase.auth()}
      />
    </Dialog>
  );
};

export default LoginDialog;
