import React from 'react';

export const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/resume">Resume Builder</a></li>
        <li><a href="/jobs">Job Matching</a></li>
        <li><a href="/tailor">Resume Tailoring</a></li>
        <li><a href="/interview">Interview Coach</a></li>
      </ul>
    </nav>
  );
};
