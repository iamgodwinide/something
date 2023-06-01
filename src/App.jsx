import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  const [messages, setMessages] = useState([]);
  const tone = useRef();
  const notCover = useRef()
  const phone = useRef()

  const [accounts, setAccounts] = useState([]);


  const addMessage = () => {
    let _messages = [...messages];
    _messages.unshift(
        Math.floor(Math.random()*3)+1
    );
    setMessages(_messages);
    tone.current.currentTime = .3;
    tone.current.play();
    notCover.current.scrollTop = 0;
  };

  async function connectAccount() {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccounts(accounts);
    }
  }

  useEffect(()=> {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Add class to HTML body
    if (iOS) {
        phone.current.style.height = "87vh";
    } else {
        phone.current.style.height = "92vh";
    }
  }, [])

  return (
    <div className='root'>
        <audio ref={tone} src="/audio/tone.mp3"></audio>
        <div className="phone" ref={phone}>
            <div className="top-not">
                <div>
                    {" "}<i className="fas fa-wifi"></i>
                </div>
                <div className='batterywrap'>
                    <p>100%</p>
                    <div className="battery">
                        <div></div>
                    </div>
                </div>
            </div>
            <div className="time-wrap">
                <h2>9:45</h2>
                <p>Tuesday, September 12</p>
            </div>
            <div className="notifications" ref={notCover}>
              <TransitionGroup className="item-list">
                {
                    messages.map((item, index)=> (
                        <CSSTransition
                        key={index}
                        timeout={300}
                        classNames={{
                            enter: index === 0 ? 'item-enter-last' : 'item-enter',
                            enterActive: index === 0 ? 'item-enter-active-last' : 'item-enter-active',
                            exit: 'item-exit',
                            exitActive: 'item-exit-active'
                          }}
                      >
                        <img src={`/img/Untitled_Artwork-${item}.png`}/>
                      </CSSTransition>
                    ))
                }
              </TransitionGroup>
            </div>
            <div className="apps-wrap">
                <div>
                    <a target='_blank' className='ylink' href="https://www.youtube.com/watch?app=desktop&v=qeMFqkcPYcg">
                        everyboooooodys, lookin for $something
                    </a>
                </div>
                <div className="apps">
                    <div className="item">
                        <img src="/img/telegram.png" alt="" srcset="" />
                    </div>
                    <div className="item">
                        <a target='_blank' href="https://twitter.com/smthngcoin">
                        <img src="/img/twitter.png" alt="" srcset="" />
                        </a>
                    </div>
                    <div className="item">
                        <img src="/img/dextools.png" alt="" srcset="" />
                    </div>
                    <div className="item">
                        <img 
                        onClick={addMessage}
                        src="/img/something.jpg" alt="" srcset="" />
                    </div>
                    <div className="item">
                        <img  
                        onClick={addMessage}
                        src="/img/message.png" alt="" srcset="" />
                        {
                            messages.length !== 0
                            &&
                            <div className="badge">
                                {messages.length}
                            </div>
                        }
                    </div>
                    <div className="item">
                        <img 
                        onClick={connectAccount}
                        src="/img/metamask.png" alt="" srcset="" />
                        {
                            accounts[0]
                            &&
                            <div className="badge">
                                <i className="fas fa-check"></i>
                            </div>
                        }
                    </div>
                </div>
                <div className="dots">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App