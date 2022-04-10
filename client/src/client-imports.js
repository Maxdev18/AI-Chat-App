// NPM packages imports
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import io from "socket.io-client";
import Axios from 'axios';
import emailjs from '@emailjs/browser';
import { gapi } from 'gapi-script';

// Client component imports
import { Navigation } from './client-components/navigation';
import { Footer } from './client-components/footer';

// Client component page imports
import { Landing } from './pages/landing';
import { About } from './pages/about';
import { WhyAIPage } from './pages/whyAI';
import { Guidelines } from './pages/guidelines';
import { HowWasItMade } from './pages/howWasItMade';
import { Contact } from './pages/contact';
import { Commands } from './pages/commands';
import { Login } from './pages/login';
import { Register } from './pages/register';

// Exported NPM packages
export {
  React,
  Routes,
  Route,
  Router,
  Link,
  io,
  Axios,
  emailjs,
  gapi
}

// Exported Client Components
export {
  Navigation,
  Landing,
  Footer,
  About,
  WhyAIPage,
  Guidelines,
  HowWasItMade,
  Contact,
  Commands,
  Login,
  Register
}