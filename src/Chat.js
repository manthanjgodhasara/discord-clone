import React, { useEffect, useState } from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import Message from './Message';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { selectChannelId, selectChannelName } from './features/appSlice';
import db from './firebase';
import firebase from 'firebase'

function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);


    useEffect(()=>{
        if(channelId){
            db.collection('channels')
            .doc(channelId)
            .collection('messages')
            .orderBy('timestamp')
            .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc)=> doc.data())))
        }
    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user,
        })

        setInput('');
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>
            <div className="chat__messages">
                {messages.map((message)=>(
                    <Message 
                    timestamp= {message.timestamp}
                    message= {message.message}
                    user= {message.user}
                    />
                ))}
            </div>
            <div className="chat__input">
                <AddCircleIcon font-size="large"/>
                <form>
                    <input type="text" disabled={!channelId} placeholder={`Message #${channelName}`} value={input} onChange={(e)=> setInput(e.target.value)}/>
                    <button type="submit" disabled={!channelId} onClick={sendMessage} className="chat__inputButton">Send Message</button>
                </form>
                <div className="chat__inputIcons">
                    <GifIcon />
                    <EmojiEmotionsIcon />
                </div>
            </div>
        </div>
    )
}

export default Chat
