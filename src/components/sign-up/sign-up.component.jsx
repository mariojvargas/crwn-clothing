import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = ({ signUpUser }) => {
  const [registrationInfo, setRegistrationInfo] = useState(initialState);
  const { displayName, email, password, confirmPassword } = registrationInfo;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password don't match!");

      return;
    }

    signUpUser({
      displayName,
      email,
      password,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setRegistrationInfo({
      ...registrationInfo,
      [name]: value,
    });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>

      <p>Sign up with your email and password</p>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />

        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpUser: (signUpInfo) => dispatch(signUpStart(signUpInfo)),
});

export default connect(null, mapDispatchToProps)(SignUp);
