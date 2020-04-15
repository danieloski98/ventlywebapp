import React, { Component, Fragment } from 'react'

export default class HomePage extends Component {
    componentDidMount() {
        console.log(window.innerHeight)
    }
  render() {
    return (
        <Fragment>
            <div className="w-full h-20 flex items-center justify-center">
                <img src={require('../assets/images/logo.png')} width="50" height="50" alt="logo"/>
            </div>  
            <div className="xl:flex lg:flex md:flex sm:flex w-full xl:flex-row lg:flex-col-reverse md:flex-col-reverse sm:flex-col-reverse sm:pb-10">
                <div className="xl:flex-1  xl:p-10 xl:w-full xl:text-left lg:flex-1 lg:p-1 lg:w-full sm:w-full md:w-full  h-auto lg:text-center md:text-center md:w-full md:p-10 md:flex-1 sm:flex-1 sm:text-center ">
                    <h1 className="font-poppins-regular xl:text-3xl xl:mt-40 xl:ml-20 xl:tracking-wide lg:text-3xl lg:mt-10 lg:ml-10 lg:mr-10 lg:tracking-wide md:text-2xl md:mt-10 md:ml-10 md:mr-10 md:tracking-wide sm:text-2xl sm:mt-10 sm:ml-1 sm:mr-1 sm:tracking-wide">This Page Is Under Construction</h1>
                    <h3 className="font-heebo-regular xl:text-lg xl:text-gray-600  xl:ml-20 xl:mt-2 lg:text-lg lg:text-gray-600 lg:ml-20 lg:mr-20 lg:mt-2 md:text-sm md:text-gray-600 md:mr-10 md:ml-10 md:mt-3 sm:text-sm sm:text-gray-600 sm:mr-10 sm:ml-10 sm:mt-3">Our engineers are working on this App, Expect Something Great. If you have any questions <br className="xl:hidden lg:block md:block sm:block"/>email: support@vent.ly</h3>
                </div>
                <div className="sm:block sm:p-6 md:block lg:block xl:block xl:flex-1 lg:flex-1 w-full h-auto">
                    <img src={require('../assets/images/construction.png')} alt="construction"/>
                </div>
            </div>
        </Fragment>
    )
  }
}
