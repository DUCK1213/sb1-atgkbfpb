import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Building2, BriefcaseIcon, HomeIcon, UserIcon } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Companies from './pages/Companies';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';

function App() {
  const navItems = [
    { icon: HomeIcon, label: 'Home', path: '/' },
    { icon: Building2, label: 'Companies', path: '/companies' },
    { icon: BriefcaseIcon, label: 'Jobs', path: '/jobs' },
    { icon: UserIcon, label: 'Profile', path: '/profile' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar items={navItems} />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;