import { React, Navigation, Footer, Link } from '../client-imports';
import '../styles/pages/about.css';

export const About = () => {
  return (
    <div className='about-main-container'>
      <Navigation />
      <div className="about-container">
        <h1 className="about-title">About</h1>

        <div className="about-text-container">
          <h2 className="subtitle">What is Chatting AI?</h2>
          <p className="about-desc">
            Chatting AI is a simple chat web application for 
            people to connect with each other for free. Yeah very similar 
            to other chat applications but with one massive change. 
            Chatting AI has a built in Natural Language Processing(NLP) 
            AI so people could talk to each other almost without 
            ever having the need to touch the keyboard. Typing 
            with your mouth so to speak. <br/> <br/>

            The goal was to have people be able to update, 
            search, and respond, using only the AI for efficiency 
            purposes. Having to go through a little learning curve 
            on the commands, it will then become second nature and 
            you’ll feel like Tony Stark. The AI 
            itself doesn’t respond much since it’s specifically made 
            to operate and perform commands which you give it. The 
            features aren't too special, just the same as any old chat app.
          </p>

          <h2 className="subtitle">The Why</h2>
          <p className="about-desc">
            The average typing speed in the world is around 
            40 words per minute. So what is faster? Talking. 
            Talking has an average speed of 163 words per 
            minute, just over 4 times as fast! So what I have 
            thought to create is a chat application using 
            Natural Language Processing(NLP) AI from a third
            party source called Alan AI for the 
            main functionalities of all chat applications 
            in general like Discord and Telegram. Now, 
            obviously this isn’t as advanced as 
            the others because it’s not a legitimate 
            business but a personal side project. The 
            intentions are not there, so don’t expect 
            updates and new features.
          </p>

          <h2 className="subtitle">Purpose</h2>
          <p className="about-desc">
            The sole purpose is to try a new method of using 
            NLP in an environment where it could possibly speed 
            up user interactions and save time for everyone. 
            I wanted to build something where people can talk 
            to each other really fast without typing or even 
            touching the mouse because I think that it would 
            be a lot more beneficial to eliminate staring at 
            a screen and reply by using your voice to operate 
            everything and not have to click everywhere. 
            I want people to feel the chatting experience as 
            a normal conversation(for those of you who don’t 
            like to talk to people in general). As I was 
            building this, I found out that this is really 
            close to simulating a phone call. And yes I know, 
            the latency is terrible, but pretty close. 
            This isn’t an app where you are lured to stay 
            online for hours on end, it’s a new way of speeding 
            up the process of replies. Now just imagine if 
            you were able to use this general AI functionality 
            for other things, like updating and manipulating 
            your own data without ever touching the keyboard 
            or mouse and clicking through multiple pages and 
            waiting for them to load(Hint: I have a business 
            idea for this). Efficiency could potentially be 
            capped out at this level in a company. What I’m 
            trying to say is, autonomy with AI is the future.
          </p>
        </div>

        <div className="social-container">
          <p className="about-desc">
            If interested more about the projects 
            I’m working on, follow me on my 
            socials down below
          </p>
          <div className="social-links">
            <a href="https://twitter.com/MaximMelnik10" className="fa fa-twitter" target="_blank"></a>
            <a href="https://www.linkedin.com/in/maxim-melnik-770a34219/" className="fa fa-linkedin" target="_blank"></a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}