import React from 'react';
import { auth } from '../../firebase/firebase.utils';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';

import { googleSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '' };
  }

  render() {
    const { signInWithGoogle } = this.props;

    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <p className="sub-title">Sign in with your email and password</p>

        <form action="" onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
            required
          />

          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton type="button" isGoogleSignIn onClick={() => signInWithGoogle()}>
              Sign In with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log('Unable to log in. Something terrible happened', error);
    }

    this.setState({ email: '', password: '' });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };
}

const mapDispatchToProps = (dispatch) => ({
  signInWithGoogle: () => dispatch(googleSignInStart()),
});

export default connect(null, mapDispatchToProps)(SignIn);
