import React, {useCallback} from 'react';

function useAudioRecorder(sendMessage: (message: string) => void) {
  const [stream, setStream] = React.useState<MediaStream | null>(null);

  const record = useCallback(async () => {
    if (sendMessage) {
      let stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
      const recorder = new MediaRecorder(stream);
      setStream(stream);

      let data: any = [];
      recorder.addEventListener("dataavailable", (e) => {
        data.push(e.data);
      });

      recorder.start();

      recorder.onstop = async (e) => {
        let blob = new Blob(data, {type: 'audio/webm'});
        blob.arrayBuffer().then((buffer) => {
          let array = new Uint8Array(buffer);
          // @ts-ignore
          let encoded = btoa(String.fromCharCode(...array));
          let message: ISocketMessage = {
            type: "audio",
            data: encoded,
          }
          sendMessage(JSON.stringify(message));
        });
      }
    }
  }, [sendMessage]);

  const stop = () => {
    stream?.getTracks().forEach(track => track.stop());
  }

  return [record, stop];
}

export default useAudioRecorder;
