import React from 'react';
import styles from "../../styles/Chat.module.css";
import {useRecoilState} from "recoil";
import {userState} from "../../recoil/atoms/userState";
import Audio from "../Audio/Audio";
import { motion } from 'framer-motion';

interface Props {
  message: ISocketMessage
}

function Message(props: Props) {
  const { message } = props;
  const {
    type,
    data,
    metadata = {
      user: {
        name: "Anonymous",
      },
    },
  } = message;
  const [user] = useRecoilState<IUser>(userState);

  const renderMessage = () => {
    switch (type) {
      case "audio": {
        let decoded = atob(data);
        let array = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) {
          array[i] = decoded.charCodeAt(i);
        }
        const blob = new Blob([array], { type: "audio/webm" });
        return (
          <Audio
            src={URL.createObjectURL(blob)}
          />
        );
      }
      case 'text':
      default:
        return (
          <>
            <p>{metadata?.user?.name}</p>
            {data}
          </>
        )
    }
  }

  return (
    <motion.li
      className={`${styles.listItem} ${user.name === metadata?.user?.name ? styles.listItemME : ""}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        x: user.name === metadata?.user?.name ? -100 : 100,
        opacity: 1,
        scale: 1
      }}
      transition={{
        x: { duration: 0.3 },
        default: {
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01]
        },
        scale: {
          type: "spring",
          damping: 10,
          stiffness: 200,
          restDelta: 0.001
        }
      }}
    >
      {renderMessage()}
    </motion.li>
  )
}

export default Message;
