// NPM packages imports
import * as React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import io from "socket.io-client";

// Client component imports
import { Navigation } from './client-components/navigation';
import { Footer } from './client-components/footer';

// Client component page imports
import { Landing } from './pages/landing';
import { About } from './pages/about';
import { WhyAIPage } from './pages/whyAI';

// Exported NPM packages
export {
  React,
  BrowserRouter,
  Routes,
  Route,
  Link,
  io
}

// Exported Client Components
export {
  Navigation,
  Landing,
  Footer,
  About,
  WhyAIPage
}