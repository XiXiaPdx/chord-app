import React, { Component } from 'react';
const axios = require('axios');

class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmedPassword: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.password !== this.state.confirmedPassword) {
      this.setState({ passwordMismatch: true });
      return;
    }
    this.setState({ submitDisabled: true })
    axios.post(`${process.env.REACT_APP_API_URL}register`, {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmedPassword: this.state.confirmedPassword,
    })
      .then((response) => {
        this.setState({ submitDisabled: false })
        if (response.status === 200) this.props.history.push('/chordsheets');
      })
      .catch(error => {
        this.setState({ submitDisabled: false })
        console.log(error.response.data.response)
        this.setState({ error: error.response.data.response })
      }
        )
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="card card__form">
        <h1>Create an Account</h1>
        <form className="register">
          <div className="card__input-item">
            <label htmlFor="name">Name</label>
            <input name="name" onChange={this.handleChange} type="text" placeholder="Username" value={this.state.name}/>
          </div>
          <div className="card__input-item">
            <label htmlFor="email">Email</label>
            <input name="email" onChange={this.handleChange} type="text" placeholder="Email" value={this.state.text} />
          </div>
          <div className="card__input-item">
            <label htmlFor="password">Password</label>
            <input name="password" onChange={this.handleChange} type="password" placeholder="Password" value={this.state.password} />
          </div>
          <div className="card__input-item">
            <label htmlFor="confirmedPassword">Confirm Password</label>
            <input name="confirmedPassword" onChange={this.handleChange} type="password" placeholder="Confirm Password" value={this.state.confirmedPassword} />
          </div>
          {this.state.error ? <p>{this.state.error}</p> : ''}
          {this.state.passwordMismatch ? <p>Passwords must match</p> : ''}
          <button type="submit" onClick={this.handleSubmit} disabled={this.state.submitDisabled} className="button button--grey button--med">Create Account</button>
        </form>
      </div>
    );
  }
}

export default Register;