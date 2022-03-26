import { React, Link, Navigation, Footer } from '../client-imports';
import '../styles/pages/commands.css';

export const Commands = () => {
  return (
    <div className="commands-main-container">
      <Navigation />
      <div className="commands-container">
        <h1 className="commands-title">AI Commands Documentation</h1>
        <div className="commands-content-container">
          <div className="commands-docs-desc-container">
            <p className="commands-docs-desc p-txt">
              The commands for the application come with a minor 
              learning curve. When learned, you could manage the 
              main aspects of the application with your voice. 
              But the drawback is clicking the AI activation button 
              in the bottom right corner of the application. In 
              this documentation are the listed implemented commands 
              from Chatting AI. Each command has its own description 
              of its purpose and function. The commands themselves 
              are highlighted in the light gray background. When 
              there is parenthesis surrounding keywords like room, 
              user, id, etc, this is the entity itself when being 
              practiced within the application by a user. Responses 
              from the AI are general and universal within the 
              application which will later be covered more in depth 
              in the next section.
            </p>
          </div>

          <div className="commands-docs-desc-container">
            <h2 className="commands-sub-title">Responses from the AI</h2>
            <p className="commands-docs-desc p-txt">
              After a user gives a command to the AI, it has been 
              made so that the AI repeats what the user has said. 
              This is important because we need to have a way to 
              confirm the operation was done on the correct entity 
              and so there will be less confusion for the user. The 
              responses are short and are specifically created for 
              efficiency purposes. The AI also repeats back the 
              entity which the user has said as a confirmation. If 
              the AI won’t recognise the entity or doesn’t 
              understand the user, then it will ask you to try 
              again. An example of this would be as follows:
            </p>
            <div className="command-wrapper-container">
              <div className="command-wrapper">
                <p className="p-txt com">Command:</p>
                <p className="p-txt code">
                  “Join room FG8D2”
                </p>
              </div>
              
              <div className="command-response">
                <p className="p-txt com">Response from AI:</p>
                <p className="p-txt code">"Joined room FG8D2"</p>
              </div>
            </div>

            <p className="p-txt">
              The underlined words are the entities which the user 
              is searching for. This same general logic can be 
              applied to other commands.Usernames are unique so you 
              can search someone specifically by their username. 
              Made it this way in-order to distinguish between 2 
              rooms which might have the same name. Since rooms in 
              Chatting AI are public, the best and easiest way for 
              people to join a room is to search the room name and 
              the admin’s username assuming they will give their 
              username to you. One benefit to this is security. 
              Hackers will have to know someone before even trying 
              to bait them with something.
            </p>
          </div>

          <h1 className="commands-section">Commands</h1>
          <div className="command-container-parent">
            <div className="command-container">
              <h2 className="commands-sub-title">Leaving a room</h2>
              <p className="p-txt">
                Leaving a room only works if you're not the admin 
                of a room. If you’re the admin of the room, then 
                the operation will be denied. The commands are 
                very simple and easy to memorize. The command and 
                the response from the AI are listed down below:
              </p>

              <div className="command-wrapper-container">
                <div className="command-wrapper">
                  <p className="p-txt com">Command:</p>
                  <p className="p-txt">“Leave room (room)”</p>
                </div>
                  
                <div className="command-response">
                  <p className="p-txt com">Response from AI:</p>
                  <p className="p-txt">"Joined room (room)"</p>
                </div>
              </div>
            </div>

            <div className="command-container">
              <h2 className="commands-sub-title">Joining a room</h2>
              <p className="p-txt">
                There are no restrictions in joining a room. All 
                the information you need is the room id which you 
                would like to join. You would have to ask the 
                person/admin for their room id to get in from 
                external sources assuming you know them. People 
                with big chat channels could give out their room 
                id by sharing on other social media platforms. 
                The command and the response from the AI are 
                listed down below:
              </p>
              
              <div className="command-wrapper-container">
                <div className="command-wrapper">
                  <p className="p-txt com">Command:</p>
                  <p className="p-txt">“Join room (room id)”</p>
                </div>
                  
                <div className="command-response">
                  <p className="p-txt com">Response from AI:</p>
                  <p className="p-txt">"Joined room (room id)"</p>
                </div>
              </div>
            </div>

            <div className="command-container">
              <h2 className="commands-sub-title">Opening a room</h2>
              <p className="p-txt">
                Opening a room is simple. It will also lead you to 
                the ability of using another command which you're 
                able to ask for the latest response within a chat 
                room, but this command will be covered later. The 
                command and the response from the AI are listed 
                down below:
              </p>

              <div className="command-wrapper-container">
                <div className="command-wrapper">
                  <p className="p-txt com">Command:</p>
                  <p className="p-txt">“Open room (room)”</p>
                </div>
                  
                <div className="command-response">
                  <p className="p-txt com">Response from AI:</p>
                  <p className="p-txt">"Opened room (room)"</p>
                </div>
              </div>
            </div>

            <div className="command-container">
              <h2 className="commands-sub-title">Getting the latest response from a room</h2>
              <p className="p-txt">
                Fetching the latest response from a room is also 
                quite simple. This gives you the ability to fetch 
                the latest response from a distance after you 
                pressed the AI activation button. This could be 
                quite useful for longer responses which you don’t 
                want to read. The required information needed to 
                execute the operation is the room name. The command 
                and the response from the AI are listed down below:
              </p>

              <div className="command-wrapper-container">
                <div className="command-wrapper">
                  <p className="p-txt com">Command:</p>
                  <p className="p-txt">“What’s the latest response in room (room)”</p>
                </div>
                  
                <div className="command-response">
                  <p className="p-txt com">Response from AI:</p>
                  <p className="p-txt">“Latest response in room (room) is from (username), ‘Hello there!’”</p>
                </div>
              </div>
            </div>

            <div className="command-container">
              <h2 className="commands-sub-title">Ban people from a room</h2>
              <p className="p-txt">
                This command only applies to admins of a room. They 
                are the only one who are able to perform this 
                operation successfully. This might sound like a 
                tedious task to do for one person, but remember 
                that this application is not a fully blown chat app. 
                This isn’t a legitimate business. The required 
                information needed to perform the operation is 
                the username and the room. We need to know which 
                room the user is located in and which user that 
                is within the room. The command and the response 
                from the AI are listed down below:
              </p>

              <div className="command-wrapper-container">
                <div className="command-wrapper">
                  <p className="p-txt com">Command:</p>
                  <p className="p-txt">“Ban (username) from room (room)”</p>
                </div>
                  
                <div className="command-response">
                  <p className="p-txt com">Response from AI:</p>
                  <p className="p-txt">“Banned (username) from room (room)”</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
};