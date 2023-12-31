import { MessageEntity } from '../../domain/messages.entities';
import { useEffect, useRef, useState } from 'react';
import styles from './InputForm.module.css';
import AudioRecorder from '../AudioRecorder/AudioRecorder.jsx';

interface Props {
  send: (mes: string) => void;
  create: (newMessage: MessageEntity) => void;
}

export default function InputForm({ send, create }: Props) {
  const [message, setMessage] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  });

  const addNewMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage: MessageEntity = { text: message, type: true };
    if (newMessage) create(newMessage);
    send(message);
    setMessage('');
  };

  const sendAudio = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
      <form className={styles.area}>
        <input
          className={styles.input}
          placeholder="..."
          type="text"
          maxLength={300}
          ref={inputRef}
          value={message}
          readOnly={false}
          onChange={(e) => setMessage(e.target.value)}
        />
        <AudioRecorder send={send} />
        <input type="submit" onClick={addNewMessage} hidden />
      </form>
  );
}
