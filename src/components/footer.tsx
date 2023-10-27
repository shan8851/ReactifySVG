import React from 'react';
// import { SiBuymeacoffee } from 'react-icons/si';
import { BsGithub } from 'react-icons/bs';

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-black py-4 shadow-top">
      <div className="flex justify-between items-center px-4">
        <span>Built with ♡ by <a className="font-bold text-white" href='https://www.shan8851.com/'>@Shan8851</a></span>
        <div className="flex gap-4 justify-end">
          <a href="YOUR_GITHUB_REPO_LINK" className="flex gap-2 items-center" target="_blank" rel="noopener noreferrer">
            Give us a star!
            <BsGithub />
          </a>
          {/* <a href="https://www.buymeacoffee.com/asamshan" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
            Like what I do? Buy me a coffee!
            <SiBuymeacoffee style={{ color: 'white' }} />
          </a> */}
        </div>
      </div>
    </footer>
  );
}

