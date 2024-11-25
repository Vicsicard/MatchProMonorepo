import React, { useState } from 'react'
import '@matchpro/styles/dist/index.css'
import './App.css'
import ResumeEditor from './components/ResumeEditor'
import TestSharedLibs from './components/TestSharedLibs'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">MatchPro Resume Builder</h1>
        <TestSharedLibs />
        <ResumeEditor />
      </div>
    </div>
  )
}

export default App
