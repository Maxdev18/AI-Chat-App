import { React, Link, Navigation, Footer } from '../client-imports';
import '../styles/pages/whyAI.css';

export const WhyAIPage = () => {
  return (
    <div className="why-main-container">
      <Navigation />
      <div className="why-container">
        <h1 className="why-title">Why AI?</h1>
        
        <p className="why-desc">
          Artificial Intelligence is becoming a new pioneer 
          due to its potential. Ranging from autonomy, 
          running simulations, and especially efficiency. 
          AI is growing exponentially every year with each 
          year reaching new milestones. With companies building 
          autonomous driving, with the military building 
          high precision drones, simulating blackholes 
          with a massive compute cluster, or possibly creating 
          a functional Artificial General Intelligence robot 
          which could destroy or benefit humanity as we know 
          it. All of these are very complex and aren’t 
          beneficial to the everyday person. So what if we 
          could bring AI to the everyday person with simplicity 
          and something that could potentially be beneficial 
          in the long run?<br /><br/>

          I have implemented a Natural Language Processing(NLP) 
          AI which is from a 3rd party source, called Alan AI, 
          which converts speech to text. After it’s converted, 
          from the developer’s point of view, we are able to 
          create commands based off of the person’s response 
          to the AI which then could be used to perform certain 
          actions within the application. The whole purpose 
          I wanted to create is to create an efficient user 
          experience with a semi-complex application.<br/><br/>

          The main functions which the AI is able to perform 
          are just few in number; respond to someone, create 
          a new room with specific settings, find a new room, 
          join a room, and manipulate a person’s permissions 
          within a room. They might sound simple, but the actual 
          implementation of these commands are by far more 
          complex because you have to account for possible 
          cases of a person’s response. From a technical point 
          of view, the number of cases could be infinite. So 
          we have to break it down and know the psychology and 
          know the most used response. This is very challenging 
          because every person's talking style is different 
          and might get frustrated if it’s not implemented. 
          This AI is just an NLP, not an actual AI which 
          goes through a complex algorithm like Hey Google. 
          Every bit of command and response has to be 
          written manually.<br/><br/>

          The goal was to see if people would like an environment 
          where you get to manipulate data within an application 
          with your own voice with minimal or no interactions 
          from the AI responding to the person. I’ve seen how 
          people don’t really like Alexa or Hey Google because 
          it can take a while for it to complete responding back. 
          So I wanted to eliminate the back talk and let it 
          perform tasks or requests without responding. Now 
          this may raise a question of how would you know if 
          the AI performs the task successfully? I have talked 
          about this in the, <Link to="/how-was-it-made" className="why-link">How was it made?</Link>, blog post which 
          you could go check out. So now you know that it 
          actually could be dependable upon, now with my own 
          curiosity I have thought, what kind of applications 
          could this work in. Could it be used in a more 
          complex environment with more complex data handling, 
          or is this the limit of NLP AI?
        </p>
      </div>
      <Footer />
    </div>
  )
};