// NPM packages imports
import * as React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import io from "socket.io-client";

// Client component imports
import { Navigation } from '../src/client-components/navigation';
import { Landing } from './pages/landing';
import { Footer } from '../src/client-components/footer';

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
  Footer
}