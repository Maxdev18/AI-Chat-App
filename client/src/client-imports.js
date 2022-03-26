// NPM packages imports
import * as React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import io from "socket.io-client";
import emailjs from '@emailjs/browser';

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

// Exported NPM packages
export {
  React,
  BrowserRouter,
  Routes,
  Route,
  Link,
  io,
  emailjs
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
  Commands
}