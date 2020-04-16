/* eslint-disable @typescript-eslint/no-useless-constructor */
import React, {Fragment} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {RouteComponentProps} from 'react-router';

interface Props extends RouteComponentProps<{email: string}> {
    
}

export default class ResetPassword extends React.Component<Props, any, any> {
    ValidationSchema = yup.object().shape({
        password: yup.string().min(8, 'minimium length is 8 characters').required('this field is required').trim(),
        confirmPassword: yup.string().min(8, 'minimium length is 8 characters').required('this field is required').trim(),
    });
    state = {
        showPassword: 'password',
        confirmPassword: 'password',
        submitting: false,
        image: require('../assets/images/lock.png'),
        error: false,
        msg: 'Reset Your Password',
        errorMsg: '',
        completed: false,
        completedImage: require('../assets/images/succespass.svg')
    }
    props: Props;
    constructor(props: Props) {
        super(props);
        this.props= props;
    }

    componentDidMount() {
        console.log(this.props);
    }

    async submit(password: string, confirmpassword: string) {
        try{
            this.setState({
                submitting: true,
                image: require('../assets/images/lock.png'),
                error: false,
                errorMsg: '',
                msg: 'Reset Your Password',
            });
            if(confirmpassword !== password) {
                this.setState({
                    error: true,
                    errorMsg: 'Passwords do not match',
                    submitting: false,
                    image: require('../assets/images/error.svg')
                });
            } else {
                const requestBody = { Password: confirmpassword }
                const email = this.props.match.params['email'];
                const request = await fetch(`https://api.vent.ly/api/v1/auth/resetpassword/${email}`, {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                switch(request.status) {
                    case 201: {
                        this.setState({
                            error: false,
                            errorMsg: '',
                            submitting: false,
                            msg: 'Password Reset Successfully',
                            completed: true,
                            image: require('../assets/images/succespass.svg'),
                        });
                        console.log(request.status);
                        const res = await request.json();
                        console.log(res);
                        break;
                    }
                    case 404: {
                        const res = await request.json();
                        this.setState({
                            error: true,
                            errorMsg: res.message,
                            submitting: false,
                            msg: '',
                            image: require('../assets/images/error.svg'),
                        });
                        console.log(request.status);
                        console.log(res);
                        break;
                    }
                    case 400: {
                        const res = await request.json();
                        this.setState({
                            error: true,
                            errorMsg: res.message,
                            submitting: false,
                            msg: '',
                            image: require('../assets/images/error.svg'),
                        });
                        console.log(request.status);
                        console.log(res);
                        break;
                    }
                    case 500: {
                        this.setState({
                            error: true,
                            errorMsg: 'Server error',
                            submitting: false,
                            msg: '',
                            image: require('../assets/images/error.svg')
                        });
                        console.log(request.status);
                        const res = await request.json();
                        console.log(res);
                        break;
                    }
                }
            }
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        return(
            <Fragment>
               <div className="w-full h-screen bg-gray-300 pb-10 overflow-auto">

                <div className="w-full h-20 xl:items-center xl:flex xl:justify-center lg:flex lg:justify-center lg:items-center md:flex md:justify-center md:items-center sm:flex sm:justify-center sm:items-center">
                    <img src={require('../assets/images/logo1.png')} width="50" height="50" alt="" />
                </div>
                <div className="xl:w-full xl:h-auto  xl:flex xl:justify-center lg:flex lg:justify-center md:flex md:justify-center sm:flex sm:justify-center">
                    <div className="xl:w-2/6 xl:h-9/12 xl:mt-16 lg:w-2/5 lg:h-auto lg:pb-10  md:w-3/6 md:pb-10 sm:w-11/12 sm:pb-10 bg-white shadow-lg">
                        <div className="w-full h-24 bg-custom-red flex justify-center ">
                            <div className="w-24 h-24 rounded-full mt-16 bg-white flex justify-center items-center">
                                <img src={this.state.image} width="30" height="30" alt=""/>
                            </div>
                        </div>
                        <h1 className="font-heebo-medium text-center text-lg mt-16 text-gray-600">{
                            this.state.error? this.state.errorMsg : this.state.msg
                        }</h1>
                        {
                            this.state.completed? 
                            (
                                <div className="text-center">
                                    <h1 className="font-heebo-regular text-sm text-gray-600 mt-10 pl-12 pr-12">Your password has successfully been reset. Log in to the app to access your account</h1>
                                    <h1 className="text-md text-center mt-10 text-gray-600">Having issues? <span className="text-custom-red cursor-pointer underline">Contact Us</span></h1>
                                </div>
                            ) :
                            <Formik 
                        initialValues={{password: '', confirmPassword: ''}}
                        onSubmit={() => alert('submitted')}
                        validationSchema={this.ValidationSchema}
                        >
                         {
                             ({
                                 values,
                                 handleChange,
                                 handleBlur,
                                 setFieldTouched,
                                 errors,
                                 touched
                             }) => (
                                <div className="flex justify-center mt-4 ">
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-col">
                                           <div className="sm:w-full sm:flex sm:justify-center">
                                           <input type={this.state.showPassword} onBlur={(e) => setFieldTouched('password', true, true)} placeholder="Password" value={values.password} onChange={handleChange('password')} className="xl:w-4/5 xl:h-12 lg:w-4/5 lg:h-12 md:w-4/5 md:h-12 bg-gray-300 rounded-lg p-2 sm:w-4/5 sm:h-12"/>
                                           </div>
                                           {touched.password && errors.password && (<p className="text-red-500 ml-12 mt-1 text-sm font-heebo-regular">{errors.password}</p>)}
                                        </div>
                                        <div className="flex flex-col mt-4">
                                            <div className="sm:w-full sm:flex sm:justify-center">
                                                <input onBlur={(e) => setFieldTouched('confirmPassword', true, true)} value={values.confirmPassword} type={this.state.showPassword} onChange={handleChange('confirmPassword')} placeholder="ConfirmPassword" className="xl:w-4/5 xl:h-12 lg:w-4/5 lg:h-12 md:w-4/5 md:h-12 bg-gray-300 rounded-lg p-2 sm:w-4/5 sm:h-12"/>
                                            </div>
                                            {touched.confirmPassword && errors.confirmPassword && (<p className="text-red-500 ml-12 mt-1 text-sm font-heebo-regular">{errors.confirmPassword}</p>)}
                                        </div>
                                        <div className="flex flex-col mt-4">
                                            <div className="sm:w-full sm:flex sm:justify-center">
                                                <button onClick={(e) => this.submit(values.password, values.confirmPassword)} disabled={this.state.submitting} className="xl:w-4/5 xl:h-12 lg:w-4/5 lg:h-12 md:w-4/5 md:h-12 bg-gray-300 rounded-lg p-2 sm:w-4/5 sm:h-12 text-white bg-custom-red">{
                                                    this.state.submitting? 'Submitting...' : 'Submit'
                                                }</button>
                                            </div>
                                        </div>
                                       
                                        <h1 className="text-sm text-center mt-8 text-gray-600">Having issues? <a className="text-custom-red cursor-pointer underline" href="mailto:support@vent.ly">Contact Us</a></h1>
                                    </div>
                                </div>
                             )
                         }
                        </Formik>
                        }
                    </div>
                </div>

               </div>
            </Fragment>
        )
    }
}