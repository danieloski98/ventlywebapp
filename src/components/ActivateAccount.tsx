/* eslint-disable @typescript-eslint/no-useless-constructor */
import React, { Component, Fragment } from 'react'
import '../styles/activateaccount.css';

interface IDetail {
  icon: string;
  title: string;
  body: string;
  btnText?: string;
}

export default class ActivateAccount extends Component<any, any, any> {

  constructor(props: any) {
    super(props);
  }

  state = {
    writing: [
      {
        icon: require('../assets/images/surface1.svg'),
        title: 'Activate Your Vently Account',
        body: 'We need you to verify your account before your account is activated. Click on the button below to verify your email address',
        btnText: 'Verify Your Email Address',
      }
    ],
    submitting: false,
    disable: false,
  }

  verified = {
    icon: require('../assets/images/smiling.svg'),
    title: 'Account Activated Successfully',
    body: 'Awesome, Your account has been successfully activated. Log in to the app on your phone to finish setting up your account',
    btnText: 'success',
  };

  noAccount = {
    icon: require('../assets/images/error.svg'),
    title: 'There is no user with this account',
    body: 'Looks like you are trying to activate an account that doesn\'t exist. Log In to the app to create your account',
    btnText: 'try again'
  };

  error = {
    icon: require('../assets/images/error.svg'),
    title: 'This Account has been activated',
    body: 'Looks like you have already activated your account. Log In to the app to access your account',
    btnText: 'try again',
  };

  async submit() {
    try {
        this.setState({
          submitting: true,
        });
        const id = this.props['match'].params.id;
        const request = await fetch(`https://api.vent.ly/api/v1/auth/activateuser/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        switch(request.status){
          case 202: {
            this.state.writing.pop();
            this.state.writing.push(this.verified);
            this.setState({
              writing: this.state.writing,
              submitting: false,
              disable: true,
            });
            break
          }
          case 404: {
            this.state.writing.pop();
            this.state.writing.push(this.noAccount);
            this.setState({
              writing: this.state.writing,
              submitting: false,
            });
            const res = await request.json();
            console.log(res);
            break;
          }
          case 400: {
            this.state.writing.pop();
            this.state.writing.push(this.error);
            this.setState({
              writing: this.state.writing,
              submitting: false,
            });
            const res = await request.json();
            console.log(res);
            break;
          }
        }
    } catch (error) {
      
    } finally {
      console.log('Done');
    }
  }

  render() {
    return (
     <Fragment>
        <div className="w-full h-screen bg-gray-300">
          <div className="w-full h-16 flex justify-center items-center">
            <img src={require('../assets/images/logo1.png')} width="40" height="40" alt="logo"/>
          </div>
          <div className="xl:w-full xl:h-10/12 lg:h-11/12 md:w-full md:h-11/12 lg:w-full sm:w-full sm:h-11/12 flex justify-center items-center">
            <div className="xl:w-2/6 xl:h-9/12 lg:w-2/5 lg:h-auto lg:pb-10  md:w-3/6 md:pb-10 sm:w-11/12 sm:pb-10 bg-white shadow-lg">
              <div className="w-full h-24 bg-custom-red justify-center flex">
                <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center mt-16">
                  <img src={this.state.writing[0].icon} width="30" height="30" alt=""/>
                </div>
              </div>
              <h1 className="header text-center font-poppins-regular xl:text-lg xl:mt-12 lg:text-lg lg:mt-16 md:text-md md:mt-12 sm:mt-12 sm:text-md">{this.state.writing[0].title}</h1>
              <p className="text-center text-gray-600 font-heebo-regular xl:text-sm xl:pl-10 xl:pr-10 xl:mt-6 lg:text-sm lg:pl-10 lg:pr-10 lg:mt-5 md:pr-6 md:pl-6 md:mt-4 md:text-sm sm:pr-4 sm:pl-4 sm:mt-4 sm:text-sm">{this.state.writing[0].body}</p>
              <div className="w-full h-12 flex justify-center">
                <button disabled={this.state.disable} onClick={(e) => this.submit()} className="w-64 flex h-full rounded items-center xl:mt-8 lg:mt-5 justify-center text-sm text-white bg-custom-red md:mt-6 sm:mt-8">{
                  this.state.submitting? 'Activating Account...' :
                  this.state.writing[0].btnText
                }</button>
              </div>
              <h1 className="text-sm text-center mt-16 text-gray-600">Having issues? <a className="text-custom-red cursor-pointer underline" href="mailto:support@vent.ly">Contact Us</a></h1>
            </div>
          </div>
        </div>
     </Fragment>
    )
  }
}
