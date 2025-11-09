
import React from 'react';
import Nav from './components/Nav';
import AnimatedBackground from './components/AnimatedBackground';
import InteractionEffects from './components/InteractionEffects';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Certificates from './sections/Certificates';
import Contact from './sections/Contact';
export default function App(){return (<div className="relative min-h-screen selection:bg-cyan-500/40 selection:text-white"><AnimatedBackground/><InteractionEffects/><Nav/><main className="relative z-10"><Hero/><About/><Skills/><Education/><Projects/><Certificates/><Contact/></main><Footer/></div>)};
