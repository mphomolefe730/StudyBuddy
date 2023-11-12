import React, { useState, useEffect } from 'react';
import { Link } from "wouter";
import SetTimer from "./SetTimer"; // Make sure to import SetTimer from the correct path

function AskName({ setUsername, handleSubmit }) {
  return (
    <div>
      <div className="bg-white flex flex-col items-center h-80 w-full lg:w-1/2 p-3 border-2 rounded-lg border-[#BEADFA] shadow-lg">
        <h1 className="text-3xl font-extrabold max-w-lg p-3">
          Welcome to studybuddy
        </h1>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Please Enter Name..."
          className="mt-14 w-80 border border-[#BEADFA] p-3 rounded-lg"
        />
        <button
          onClick={handleSubmit}
          className="mx-auto mt-3 px-5 py-2 bg-[#D0BFFF] hover:bg-[#BEADFA] rounded font-bold"
        >
          Submit
        </button>
      </div>
    </div>
  );
}



function Welcome({ onStartSession }) {
  const [username, setUsername] = useState('');
  const [sessionMessage, setSessionMessage] = useState('');
  const [sessionStarted, setSessionStarted] = useState(false);

  const handleSubmit = () => {
    localStorage.setItem('name', username);
    setSessionMessage(makeSessionMessage());
  };

  const handleStartSession = () => {
    setSessionStarted(true);
    onStartSession();
  };

  const makeSessionMessage = () => {
    const now = new Date();
    const hours = now.getHours();
    let greeting = 'Good ';

    if (hours >= 5 && hours < 12) {
      greeting += 'morning';
    } else if (hours >= 12 && hours < 18) {
      greeting += 'afternoon';
    } else {
      greeting += 'evening';
    }

    const storedName = localStorage.getItem('name') || '';

    return (
      <>
        <p>{`${greeting}! ${storedName}.`}</p>
        <p>Let's start the session.</p>
        {/* <button
          className="mx-auto mt-3 px-5 py-2 bg-[#D0BFFF] hover:bg-[#BEADFA] rounded font-bold"
          onClick={() => setSessionStarted(true)}
        >
          Make a session
        </button> */}
      </>
    );
  };

  useEffect(() => {
    const storedName = localStorage.getItem('name');

    if (storedName) {
      setSessionMessage(makeSessionMessage());
    }
  }, []);

  return (
    <div>
      {sessionMessage ? (
        <div className="bg-white flex flex-col items-center h-80 w-full lg:w-1/2 p-3 border-2 rounded-lg border-[#BEADFA] shadow-lg">
          <h1 className="text-3xl font-extrabold max-w-lg p-3">{sessionMessage}</h1>
        </div>
      ) : (
        <AskName setUsername={setUsername} handleSubmit={handleSubmit} />
      )}

      {sessionStarted && <SetTimer />}

      {/* {!sessionStarted && (
        <button
          className="mx-auto mt-3 px-5 py-2 bg-[#D0BFFF] hover:bg-[#BEADFA] rounded font-bold"
          onClick={handleStartSession}
        >
          Make a session
        </button>
      )} */}
    </div>
  );
}

export default Welcome;
