import React, {useCallback} from 'react';

function useAudioRecorder(sendMessage: (message: string) => void) {
  const [stream, setStream] = React.useState<MediaStream | null>(null);
  const [encodedAudio, setEncodedAudio] = React.useState<string | null>(null);
  const [sendAudio, setSendAudio] = React.useState<boolean>(false);

  const record = useCallback(async () => {
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
        setEncodedAudio(encoded);
      });
    }
  }, []);

  React.useEffect(() => {
    if (encodedAudio && sendAudio) {
      let message: ISocketMessage = {
        type: "audio",
        data: encodedAudio,
      }
      sendMessage(JSON.stringify(message));
      setSendAudio(false);
    }
  }, [encodedAudio, sendAudio, sendMessage]);

  const send = () => {
    stream?.getTracks().forEach(track => track.stop());
    setSendAudio(true);
  }

  const cancel = () => {
    stream?.getTracks().forEach(track => track.stop());
    setEncodedAudio(null);
  }

  return [record, send, cancel];
}

export default useAudioRecorder;
