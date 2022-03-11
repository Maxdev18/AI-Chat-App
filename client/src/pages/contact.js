import { React, Navigation, Footer, emailjs } from '../client-imports';
import '../styles/pages/contact.css';

export const Contact = () => {
  const form = React.useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_v2l6rok', 'template_it4rlm6', e.target,'user_XeaLLHJWZAwNz86SUdokG')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className="contact-main-container">
      <Navigation />
      <div className="contact-container">
        <h1 className="contact-title">Contact</h1>
        <form id="contact-form" onSubmit={sendEmail} ref={form}>
          <div className="email-form input-container">
            <label className="contact-label">Email:</label>
            <input type="email" name="email" className="contact-input email-input" placeholder="Email..." />
          </div>

          <div className="subject-form input-container">
            <label className="contact-label">Subject:</label>
            <input type="text" name="subject" className="contact-input subject-input" placeholder="What is your problem about..."/>
          </div>

          <div className="subject-form input-container">
            <label className="contact-label">Description:</label>
            <textarea type="text" name="description" className="contact-input desc-input" placeholder="Please describe your problem..."/>
          </div>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  )
};