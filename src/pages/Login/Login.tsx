import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTE_CONSTANTS } from '../../CONSTANTS';
import styles from './Login.module.css';

export const Login = () => {
  const [showMessage, setShowMessage] = useState(false);

  const signIn = {
    email: '',
    password: '',
    remember: false,
  };

  const onChangeSignIn = (event: React.ChangeEvent<HTMLInputElement>): void => {
    switch (event.target.id) {
      case 'email':
        signIn.email = event.target.value;
        break;
      case 'password':
        signIn.password = event.target.value;
        break;
      case 'remember':
        signIn.remember = event.target.checked;
        break;
      default:
    }
  };

  const onSubmit = (): void => {
    // event.preventDefault();
    // restService.post(API_CONSTANTS.LOGIN, this.signIn).then((response) => {
    //   response.text().then((token) => {
    //     if (token) {
    //       this.props.authorize({ authorize: token });
    //       this.signIn.remember
    //         ? storageService.setTokenToLocalStorage(token)
    //         : storageService.setTokenToSessionStorage(token);
    //       this.props.history.push('/main');
    //     } else {
    //       this.setState({ ...this.state, showMessage: true });
    //     }
    //   });
    // });
    setShowMessage(true);
  };

  return (
    <main className={styles.main}>
      <CssBaseline />
      <Paper className={styles.paper}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src="./img/logo.svg" />

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={onSubmit} className={styles.form} color="secondary">
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input onChange={onChangeSignIn} disableUnderline id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              onChange={onChangeSignIn}
              disableUnderline
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox onChange={onChangeSignIn} value="remember" id="remember" color="secondary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="secondary" className={styles.submit}>
            Sign in
          </Button>
          {showMessage && (
            <Typography component="p" variant="subtitle2" color="secondary">
              This user does not exist, maybe your password or email is not correct
            </Typography>
          )}
          <Typography component="p" variant="subtitle2">
            If you are unable to authorize, you may need to{' '}
            <NavLink to={ROUTE_CONSTANTS.REGISTRATION_PAGE}>register</NavLink>
          </Typography>
        </form>
      </Paper>
    </main>
  );
};
