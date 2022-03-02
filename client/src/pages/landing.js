import { React, Navigation, Link } from '../client-imports';
import '../styles/pages/landing.css';

export const Landing = (props) => {

  return (
    <div className='main-container'>
      {/* Include Navigation Component */}
      <Navigation user={props.user} loggedIn={props.loggedIn}/>

      {/* Header Section */}
      <div className='header-container'>
        <div className="header-main-container">
          <h1 className="header-title">
            Get together and chat among
            your friends or community
            without pressing a key</h1>
          <div className="header-cta-container">
            <Link to='/product' className="cta-learn cta-btn">Learn More</Link>
            <Link to='/register' className="cta-start cta-btn">Get Started</Link>
          </div>
        </div>
        <img src={require('../staticFiles/nlp-natural-language-processing-512.png')} alt="natural language processing" className="header-img" />
      </div>

      {/* Main Content Section */}
      <section className="content-section-container">
        <div className="subsection-1 subsection">
          <img src={require("../staticFiles/speed_priority_image.png")}
            alt="drawn computer"
            className="section-img section-img-1"/>
          <div className="section-text section-text-1">
            <h2 className="section-title section-title-1">Speed is our priority</h2>
            <p className="section-desc section-desc-1">
              Having a stable fast connection is an
              important role in keeping everyone happy
              so you can get your message across.
            </p>
          </div>
        </div>

        <div className="subsection-2 subsection">
          <div className="section-text section-text-2">
            <h2 className="section-title section-title-2">AI driven application</h2>
            <p className="section-desc section-desc-2">
              With simple expectations, comes with the need 
              of simple UI. With the AI being as the central 
              focus, we try to make it as easy as possible 
              for you to do whatever you need to do.
            </p>

            <Link to="/product" className="section-learn-btn cta-btn">Learn More</Link>
          </div>

          <img src={require("../staticFiles/nlpAI-image.png")}
            alt="Icon of two messages"
            className="section-img section-img-2"/>
        </div>

        <div className="subsection-3 subsection">
          <h2 className="section-title section-title-3">Features</h2>
          <div className="features-text-container">
            <div className="feature-text feature-text-1">
              <h2 className="feature-title feature-title-1">Create and organize groups</h2>
              <p className="feature-desc feature-desc-1">
                Be in charge of who is chatting with you. 
                Give or deny permissions freely as you 
                desire. Create chat rooms for fun activities, 
                or for your team.
              </p>
            </div>

            <div className="feature-text feature-text-2">
              <h2 className="feature-title feature-title-2">Control rooms with your voice</h2>
              <p className="feature-desc feature-desc-2">
                With the help of AI, send messages, update 
                permissions, find people, and manage almost 
                everthing else with just your voice.
              </p>
            </div>

            <div className="feature-text feature-text-3">
              <h2 className="feature-title feature-title-3">Create private rooms</h2>
              <p className="feature-desc feature-desc-3">
                Have certain people join your chat 
                room and leave out strangers. Hide 
                your chatting from others and 
                keep it secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-container">
        <h1 className="logo footer-logo">Chatting AI</h1>
        <div className="footer-link-container">
          <div className="footer-links">
            <h3 className="footer-title footer-title-products">Product</h3>
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/guildlines" className="footer-link">Guidelines</Link>
            <Link to="/blog" className="footer-link">How was it made</Link>
          </div>
          <div className="footer-links">
            <h3 className="footer-title footer-title-resources">Resources</h3>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/learn-ai-commands" className="footer-link">AI Commands</Link>
          </div>
        </div>
      </footer>
    </div>
  )
};