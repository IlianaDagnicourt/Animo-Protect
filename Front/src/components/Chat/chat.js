import React from 'react';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import { useState, useEffect } from 'react';
import instance from '../../services/axios';
import './chat.scss';

const DirectChatPage = () => {


  //On récupère l'objet user du localStorageem('user'));
  const user = JSON.parse(window.localStorage.getItem('user'));


  const [username, setUsername] = useState('')

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername('')
    )
  }

  function renderChatForm(creds) {
    return (
      <div>
        <input
          className="placeholder-chat"
          placeholder='Pseudo de la personne à contacter'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="contact-button-chat" onClick={() => createDirectChat(creds)}>
          Contacter
        </button>
      </div>
    )
  }

  return (
    <ChatEngine
      height='88vh'
      userName={user.username}
      userSecret={user.secret}
      projectID='49462727-3d9f-44b2-99a2-1ecff2b47dcb'
      renderNewChatForm={(creds) => renderChatForm(creds)}
    />
  )
}

export default DirectChatPage;

