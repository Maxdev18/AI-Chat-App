import { React, Link, Navigation, Footer } from '../client-imports';
import '../styles/pages/guidelines.css';

export const Guidelines = () => {
  return (
    <div className='guidelines-main-container'>
      <Navigation />
      <div className="guidelines-container">
        <h1 className="guidelines-title">Chatting AI Community Guidelines</h1>

        <p className="guidelines-desc">
          <br/><br/>
          <p className="guidelines-update">Last Updated: March 9, 2022</p>
          <br/><br/>
          We created Chatting AI to be a place where it’s easy 
          to communicate genuinely, build relationships, and 
          have fun hanging out. Our Community Guidelines 
          ensure everyone finds belonging, but not at 
          the expense of anyone else.<br/><br/>

          These guidelines explain what is and isn’t 
          allowed on Chatting AI. Everyone on Chatting 
          AI must follow these rules, and they apply 
          to all parts of our platform, including your 
          content, and behaviors. We may consider 
          relevant off-platform behavior when assessing 
          for violations of specific Community Guidelines.<br/><br/>

          Our Chatting AI team reviews reports by users 
          or trusted reports. When someone violates these 
          guidelines we may take a number of enforcement 
          steps against them including: issuing warnings; 
          removing content; suspending or removing the 
          accounts responsible; and potentially reporting 
          them to law enforcement. If you come across a 
          user, message, or room that appears to 
          break these guidelines, please report it to us.<br /><br/>

          <div className="guidelines-text-container">
            <h2 className="subtitle guidelines-subtitle">Respect Each Other</h2>
            <li className="guidelines-desc">
              <b>Do not harass others or organize, promote, or participate in harassment.</b> Disagreements happen and are normal, but making 
               continuous, repetitive, or severe negative 
               comments or circumventing a block or ban can 
               cross the line into harassment and is not okay.
            </li>

            <li className="guidelines-desc">
              <b>Do not organize, promote, or participate in hate speech or hateful conduct.</b> It’s unacceptable to attack a person or a community
               based on attributes such as their race, ethnicity,
                caste, national origin, sex, gender identity, 
                gender presentation, sexual orientation, 
                religious affiliation, age, serious illness, 
                disabilities, or other protected classifications.
            </li>

            <li className="guidelines-desc">
              <b>Do not make threats of violence or threaten to harm others.</b> This includes indirect or suggestive threats, as well 
              as sharing or threatening to share someone’s personally 
              identifiable information (also known as doxxing).
            </li>

            <li className="guidelines-desc">
              <b>Do not use Chatting AI for the organization, promotion, or support of violent extremism.</b> This also includes glorifying violent events, the 
              perpetrators of violent acts, or similar behaviors.
            </li>

            <li className="guidelines-desc">
              <b>Do not sexualize children in any way.</b> You cannot share content or links which depict children 
              in a pornographic, sexually suggestive, or violent manner, 
              including illustrated or digitally altered pornography 
              that depicts children (such as lolicon, shotacon, or cub) 
              and conduct grooming behaviors. We report illegal content 
              and grooming to the National Center for Missing and 
              Exploited Children.
              <div className="sub-desc">
                <li className="guidelines-sub-desc">
                  We strongly discourage and may take action against 
                  vigilante behavior, as it can interfere with our 
                  investigation and ability to report to law enforcement.
                </li>
              </div>
            </li>

            <li className="guidelines-desc">
              <b>Do not make adult content available to anyone.</b> Chatting AI does not tolerate any sexual, pornographic, 
              or violent content or images. If you choose to do so, 
              actions on your account will be taken.
              <div className="sub-desc">
                <li className="guidelines-sub-desc">
                  Do not use adult content in avatars, profile photo, 
                  emoji, or any other space that cannot be 
                  age-restricted.
                </li>
              </div>
            </li>

            <li className="guidelines-desc">
              <b>Do not share sexually explicit content of other people without their consent,</b> or promote the sharing of non-consensual intimate 
              materials (images, video, or audio), sometimes known as 
              revenge porn.
            </li>

            <li className="guidelines-desc">
              <b>Do not share content that glorifies or promotes suicide or self-harm,</b> including any encouragement to others to cut themselves 
              or embrace eating disorders such as anorexia or bulimia.
              <div className="sub-desc">
                <li className="guidelines-sub-desc">
                  Self-harm threats used as a form of emotional 
                  manipulation or coercion are also prohibited.
                </li>
              </div>
            </li>

            <li className="guidelines-desc">
              <b>Do not share real media depicting gore, 
                excessive violence, or animal harm, especially 
                with the intention to harass or shock others.</b>
            </li>

            <li className="guidelines-desc">
              <b>Do not share content that violates anyone's 
                intellectual property or other rights.</b>
            </li>
          </div>

          <div className="guidelines-text-container">
            <h2 className="subtitle guidelines-subtitle">Be Honest</h2>
            <li className="guidelines-desc">
              <b>Do not share false or misleading information (otherwise known as misinformation).</b> Content that is false, misleading, and can lead to 
              significant risk of physical or societal harm may not 
              be shared on Chatting AI. We may remove content if we 
              reasonably believe its spread could result in damage to 
              physical infrastructure, injury of others, obstruction 
              of participation in civic processes, or the endangerment 
              of public health.
            </li>

            <li className="guidelines-desc">
              <b>Do not coordinate or participate in malicious impersonation of an individual or an organization.</b> Satire and parody are okay.
            </li>

            <li className="guidelines-desc">
              <b>Do not engage in activities intended to cause damage or gain unauthorized access to another user's account, network, or system.</b> This includes impersonating Chatting AI staff, distributing 
              malware, authentication token theft, phishing, DDOS, 
              and other hacking or social engineering techniques.
            </li>

            <li className="guidelines-desc">
              <b>Do not distribute or provide access to content involving the hacking, cracking, or distribution of stolen goods, pirated content, or accounts.</b> This includes sharing or selling game cheats or hacks.
            </li>
          </div>

          <div className="guidelines-text-container">
            <h2 className="subtitle guidelines-subtitle">Respect Chatting AI</h2>
            <li className="guidelines-desc">
              <b>Do not use Chatting AI to spam, manipulate engagement, or disrupt other people’s experience,</b> including trying to to influence or disrupt conversations 
              using bots, fake accounts, multiple accounts, or other 
              automation. This includes things such as via advertisements or botting.
            </li>

            <li className="guidelines-desc">
              <b>Do not organize, promote, or engage in any illegal or dangerous behavior,</b> such as sexual solicitation, human trafficking, and 
              selling or facilitating the sale of prohibited or 
              potentially dangerous goods (firearms, ammunition, drugs, 
              and controlled substances). These activities are likely 
              to get you kicked off Chatting AI, and may get you 
              reported to law enforcement.
            </li>

            <li className="guidelines-desc">
              <b>Do not mislead Chatting AI support teams.</b> Do not make false or malicious reports to Chatting 
              AI; send multiple reports about the same issue; or 
              ask a group of users to report the same content or 
              issue. These behaviors may result in action being 
              taken on your account.<br/><br/>
            </li>
          </div>

          If you see any activity that violates these guidelines, please 
          report it to us in the Chatting AI web app or by 
          filling out this <Link to="/contact" className="guidelines-link">form</Link>. These guidelines will continue 
          to evolve over time. <br/><br/>
          This means we may take action 
          against a user, server, or content that violates 
          the spirit of these guidelines when we encounter a 
          new threat or harm that is not explicitly covered 
          in the current version. <br/><br/>
          We will always make our best 
          effort to notify you when we update these guidelines, 
          but it is up to you to follow the spirit of them: 
          keep Chatting AI safe and a place for everyone to 
          belong. Thanks for doing your part.
        </p>
      </div>
      <Footer />
    </div>
  )
};