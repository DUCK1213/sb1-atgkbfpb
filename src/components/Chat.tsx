import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export const Chat = ({ recipientId }: { recipientId: string }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${recipientId},receiver_id.eq.${recipientId}`)
      .order('created_at', { ascending: true });
    if (error) console.error(error);
    setMessages(data || []);
  };

  const sendMessage = async () => {
    const { error } = await supabase
      .from('messages')
      .insert({
        content: newMessage,
        sender_id: supabase.auth.user()?.id,
        receiver_id: recipientId,
      });
    if (error) console.error(error);
    setNewMessage('');
  };

  useEffect(() => {
    fetchMessages();
    const subscription = supabase
      .from('messages')
      .on('INSERT', (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return (
    <div>
      <div className="messages">
        {messages.map((msg: any) => (
          <div key={msg.id} className={`p-2 ${msg.sender_id === supabase.auth.user()?.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} className="mt-2 bg-green-500 text-white p-2 rounded">
        Send
      </button>
    </div>
  );
};
