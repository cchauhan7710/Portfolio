import React from 'react';
import styled from 'styled-components';

export default function ContactCard({ onContactClick }) {
  const email = "rahulchauhaninbox@gmail.com";

  const handleMailClick = () => {
    window.open(`mailto:${email}?subject=${encodeURIComponent("Portfolio Inquiry")}`, "_blank");
  };

  return (
    <StyledWrapper>
      <div className="card">
        {/* Top Mail Icon Button */}
        <button className="mail" onClick={handleMailClick} title="Send Email">
          <svg
            className="lucide lucide-mail"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height={24}
            width={24}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect rx={2} y={4} x={2} height={16} width={20} />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </button>

        {/* Profile Picture */}
        <div className="profile-pic">
          <img src="/Rahul.jpeg" alt="Rahul Chauhan" loading="lazy" decoding="async" />
        </div>

        {/* Bottom Hover Drawer */}
        <div className="bottom">
          <div className="content">
            <span className="name">Rahul Chauhan</span>
            <span className="about-me">
              Full Stack & AI Engineer crafting performant web applications, intelligent NLP systems, and interactive digital experiences.
            </span>
          </div>

          <div className="bottom-bottom">
            {/* Social Links */}
            <div className="social-links-container">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/rahul-chauhan-6091a8347/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/cchauhan7710"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <svg viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/vibe_withchauhan/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <svg viewBox="0 0 16 15.999" height="15.999" width={16} xmlns="http://www.w3.org/2000/svg">
                  <path transform="translate(6 598)" d="M6-582H-2a4,4,0,0,1-4-4v-8a4,4,0,0,1,4-4H6a4,4,0,0,1,4,4v8A4,4,0,0,1,6-582ZM2-594a4,4,0,0,0-4,4,4,4,0,0,0,4,4,4,4,0,0,0,4-4A4.005,4.005,0,0,0,2-594Zm4.5-2a1,1,0,0,0-1,1,1,1,0,0,0,1,1,1,1,0,0,0,1-1A1,1,0,0,0,6.5-596ZM2-587.5A2.5,2.5,0,0,1-.5-590,2.5,2.5,0,0,1,2-592.5,2.5,2.5,0,0,1,4.5-590,2.5,2.5,0,0,1,2-587.5Z" data-name="Subtraction 4" id="Subtraction_4" />
                </svg>
              </a>
            </div>

            <button className="button" onClick={onContactClick || handleMailClick}>
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .card {
    width: 100%;
    max-width: 350px;
    height: 340px;
    background: var(--bg-secondary, #1a1a1a);
    border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
    border-radius: 32px;
    padding: 3px;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 25px 40px -10px;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
  }

  .card .mail {
    position: absolute;
    right: 1.4rem;
    top: 1.2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 10;
  }

  .card .mail svg {
    stroke: var(--accent, #facc15);
    stroke-width: 2.5px;
    transition: all 0.3s ease;
  }

  .card .mail svg:hover {
    stroke: var(--text-primary, #ffffff);
    transform: scale(1.15);
  }

  .card .profile-pic {
    position: absolute;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    top: 3px;
    left: 3px;
    border-radius: 29px;
    z-index: 1;
    border: 0px solid var(--accent, #facc15);
    overflow: hidden;
    transition: all 0.5s ease-in-out 0.2s, z-index 0.5s ease-in-out 0.2s;
  }

  .card .profile-pic img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: center top;
    transition: all 0.5s ease-in-out 0s;
  }

  .card .bottom {
    position: absolute;
    bottom: 3px;
    left: 3px;
    right: 3px;
    background: linear-gradient(135deg, var(--accent, #facc15) 0%, #eab308 100%);
    top: 78%;
    border-radius: 29px;
    z-index: 2;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px 0px inset;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  }

  .card .bottom .content {
    position: absolute;
    bottom: 0.6rem;
    left: 1.5rem;
    right: 1.5rem;
    height: 200px;
  }

  .card .bottom .content .name {
    display: block;
    font-size: 1.35rem;
    color: #111111;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .card .bottom .content .about-me {
    display: block;
    font-size: 0.85rem;
    color: #1c1917;
    margin-top: 0.75rem;
    line-height: 1.5;
    font-weight: 500;
  }

  .card .bottom .bottom-bottom {
    position: absolute;
    bottom: 1.2rem;
    left: 1.5rem;
    right: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card .bottom .bottom-bottom .social-links-container {
    display: flex;
    gap: 0.9rem;
  }

  .card .bottom .bottom-bottom .social-links-container a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card .bottom .bottom-bottom .social-links-container svg {
    height: 19px;
    width: 19px;
    fill: #111111;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
    transition: all 0.3s ease;
  }

  .card .bottom .bottom-bottom .social-links-container svg:hover {
    fill: #ffffff;
    transform: scale(1.25);
  }

  .card .bottom .bottom-bottom .button {
    background: #111111;
    color: #ffffff;
    border: none;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 10px 0px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .card .bottom .bottom-bottom .button:hover {
    background: #ffffff;
    color: #111111;
    transform: translateY(-2px);
  }

  .card:hover {
    border-top-left-radius: 50px;
    border-color: var(--accent, #facc15);
    box-shadow: var(--accent-glow, rgba(250, 204, 21, 0.3)) 0px 20px 40px 0px;
  }

  .card:hover .bottom {
    top: 18%;
    border-radius: 65px 29px 29px 29px;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.15s;
  }

  .card:hover .profile-pic {
    width: 100px;
    height: 100px;
    aspect-ratio: 1;
    top: 12px;
    left: 12px;
    border-radius: 50%;
    z-index: 3;
    border: 5px solid var(--accent, #facc15);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 8px 15px 0px;
    transition: all 0.5s ease-in-out, z-index 0.5s ease-in-out 0.1s;
  }

  .card:hover .profile-pic:hover {
    transform: scale(1.15);
    border-radius: 16px;
  }

  .card:hover .profile-pic img {
    transform: scale(1.15);
    object-position: center 10%;
    transition: all 0.5s ease-in-out 0.3s;
  }
`;
