import { React, Navigation, Footer } from '../client-imports';
import '../styles/pages/howWasItMade.css';

export const HowWasItMade = () => {
  return (
    <div className="howMade-main-container">
      <Navigation />
      <div className="howMade-container">
        <h1 className="howMade-title">How was it made?</h1>

        <div className="howMade-desc-container">
          <h2 className="howMade-subtitle">Phase 1 - Planning Process</h2>
          <p className="howMade-desc">
            Designing isn’t my best suit. You can say that I don’t really 
            have the best eye in the world, but I did try to learn the 
            best design practices in the current industry. It did improve 
            dramatically after I learned the 10/30/60 rule for color 
            picking. Anyways, I went to Figma and started to design the 
            homepage and built out the other pages. After a couple days, 
            I had my design, I still tweaked a few things here and there 
            while I was building the site but for the most part I kept 
            everything the same for the most part.
          </p>

          <h2 className="howMade-subtitle">Phase 2 - Build Process</h2>
          <p className="howMade-desc">
            One thing that I have learned is that things don’t always 
            go to plan. You run into bugs and you're stuck on it for 
            like 5 hours and you look everywhere online and then find 
            the solution on your own. One great example was when I got a 
            CORS error when I placed the backend middleware API routes 
            above the cors config in the main server.js file. I felt 
            really dumb afterwards but you live and you learn as they say. <br /><br />
            I built the entire app on 2 different servers. One to host the 
            client and the other to host the backend. I was thinking about 
            doing 3 as the 3rd one would host the websockets but I decided 
            to do 2. In a real world scenario, it would be best to separate 
            the load between all servers so one doesn’t crash and the entire 
            thing falls. This is what Kubernetes is used for. I never used 
            Kubernetes before but I think I might someday, who knows where 
            life might take me. The backend was built using javascript, 
            Node, and Express primarily with some other libraries added 
            for authentication, web sockets, and email service. The 
            frontend was built with JSX, react, and css. Basic and simple 
            I thought, but one thing that I can tell you is this, once 
            you start building large apps, the complexity level grows 
            exponentially. There is so much you have to take into account; 
            state management, efficiency, file structure. Where is the best 
            place for the code? What is the time complexity if I do this? 
            Can I make this faster? Is the code readable? Is the current 
            feature scalable? Am I making more API requests than I really 
            have to? Can I add a shortcut in any way possible? What is the 
            best design pattern for this current situation? Is there a 
            possible security breach which could happen in this? All of 
            these, you have to take into account and if you mess something 
            up, it could cost you a lot of money. But the road to a senior 
            engineer is to practice, practice, practice, and run into a lot 
            of errors.
          </p>

          <h2 className="howMade-subtitle">Phase 3 - AI Implementation</h2>
          <p className="howMade-desc">
            This was actually a lot simpler than I thought. Alan’s 
            Software development kit(SDK) was really easy to use and 
            was straightforward. Their documentation was also relatively 
            simple and made sense of their syntax. While implementing the 
            AI, I ran into an issue where I have used a useEffect hook to 
            have the Alan button appear on the screen as the user and 
            rooms in the dependency array of the useEffect. The issue 
            was when I tried using the current state of the user and 
            rooms array after the AI gave me a response after I gave 
            it a command. Whenever I tried to use the state, it gave 
            me the default value. But if I log out the user outside of 
            the Alan button callback function, I have the user, perfectly 
            fine, but when I log out the user inside the callback, then 
            it shows an empty object even though outside its scope has 
            the user. Alan allows you to return a json object as a response 
            instead of a verbal response from the AI itself. Also, Alan has 
            a method called setVisualState which you can set the state of 
            your app to and then use it in the SDK. This is exactly what 
            I did to solve the issue. I set the state for Alan on the 
            client, then in the SDK I returned the values back to the client. 
            I then used that data to do whatever I needed to do. I hated 
            this way because it’s hurting them and myself since I’m making 
            an extra request to their server just for that data to be sent 
            back to me and I could potentially be paying for requests being 
            made. After Alan contacted me, they said it was a problem with 
            stale closure. And it was. This was a first and this is the 
            ugliest problem I probably encountered so far because it’s so 
            deceiving. They said thank you for pointing that out and they 
            updated their documentation. The solution was to use the useRef 
            hook and use the state that way. This was a much better 
            solution than mine because this reduces the line of code and 
            reduces the amount of requests being made to their server. 
            Yes, I saved the day for other developers which might 
            potentially use Alan and got them out of some headache. 
            After that, I did some final checks, then simply pushed the 
            code to github and heroku, now I’m done.
          </p>

          <h2 className="howMade-subtitle">Inspiration</h2>
          <p className="howMade-desc">
            There was still so much more to tell but I’m going to cut 
            you loose here. In the beginning, it’s kind of discouraging 
            and you will run into a massive learning curve if you have 
            never done a large project before. Even though this entire 
            project is around 4,400 lines of code, it’s nothing compared 
            to companies. I actually paused on the project because I 
            thought it was too confusing but I just kept going back to 
            it because I knew that it will pass and I will learn and 
            gain the necessary knowledge in the end. The pure excitement 
            that you get when you're done is unbelievable. You see all 
            the hardships that you went through and how you solved it 
            and you know that you built it yourself. When you see how 
            everything works together and see people use it, even if 
            it’s your friends who are testing it out, you have a 
            functioning app. One thing that I’ll say is this, do your 
            work diligently.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
};