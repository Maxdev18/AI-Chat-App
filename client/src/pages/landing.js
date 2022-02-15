import { React, Navigation } from '../client-imports';

const Landing = (props) => {

  return (
    <div className='main-container'>
      <Navigation user={props.user} loggedIn={props.loggedIn}/>
      <div className='header-container'>
        
      </div>
    </div>
  )
};

module.exports = Landing;