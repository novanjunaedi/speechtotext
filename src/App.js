import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const commands = [
    {
      command: ['analisa', 'ijin', 'karir', 'adzan', 'aktifitas', 'atlit', 'azas', 'belagu', 'blanko', 'cendikiawan'],
      callback: (command, spokenPhrase) => {
        let spokenArray = spokenPhrase.split(/\s+/);

        if (spokenArray.includes(command)) {
          if (command === 'analisa') {
            setMessage(
              <>
                <span className="badge bg-danger rounded-pill me-2">analisa <i className="fa-solid fa-times" /></span>
                <span className="badge bg-success rounded-pill">analisis <i className="fa-solid fa-check" /></span>
              </>
            );
          } else if (command === 'ijin') {
            setMessage(
              <>
                <span className="badge bg-danger rounded-pill me-2">ijin <i className="fa-solid fa-times" /></span>
                <span className="badge bg-success rounded-pill">izin <i className="fa-solid fa-check" /></span>
              </>
            );
          } else if (command === 'karir') {
            setMessage(
              <>
                <span className="badge bg-danger rounded-pill me-2">karir <i className="fa-solid fa-times" /></span>
                <span className="badge bg-success rounded-pill">karier <i className="fa-solid fa-check" /></span>
              </>
            );
          } else if (command === 'adzan') {
            setMessage(
              <>
                <span className="badge bg-danger rounded-pill me-2">adzan <i className="fa-solid fa-times" /></span>
                <span className="badge bg-success rounded-pill">azan <i className="fa-solid fa-check" /></span>
              </>
            );
          } else if (command === 'aktifitas') {
            setMessage(
              <>
                <span className="badge bg-danger rounded-pill me-2">aktifitas <i className="fa-solid fa-times" /></span>
                <span className="badge bg-success rounded-pill">aktivitas <i className="fa-solid fa-check" /></span>
              </>
            );
          } else if (command === 'atlit') {
            setMessage(
              <>
                <span className="badge bg-danger rounded-pill me-2">atlit <i className="fa-solid fa-times" /></span>
                <span className="badge bg-success rounded-pill">atlet <i className="fa-solid fa-check" /></span>
              </>
            );
          } else if (command === 'azas') {
            setMessage(
              <>
                <span className="badge bg-danger rounded-pill me-2">azas <i className="fa-solid fa-times" /></span>
                <span className="badge bg-success rounded-pill">asas <i className="fa-solid fa-check" /></span>
              </>
            );
          } else if (command === 'belagu') {
            setMessage(
              <>
                <span className="badge bg-danger rounded-pill me-2">belagu <i className="fa-solid fa-times" /></span>
                <span className="badge bg-success rounded-pill">berlagu <i className="fa-solid fa-check" /></span>
              </>
            );
          } else if (command === 'blanko') {
            setMessage(
              <>
                <span className="badge bg-danger rounded-pill me-2">blanko <i className="fa-solid fa-times" /></span>
                <span className="badge bg-success rounded-pill">blangko <i className="fa-solid fa-check" /></span>
              </>
            );
          } else if (command === 'cendikiawan') {
            setMessage(
              <>
                <span className="badge bg-danger rounded-pill me-2">cendikiawan <i className="fa-solid fa-times" /></span>
                <span className="badge bg-success rounded-pill">cendekiawan <i className="fa-solid fa-check" /></span>
              </>
            );
          }
        };
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const onStart = () => {
    SpeechRecognition.startListening({ language: 'id', continuous: true });
  };

  const onStop = () => {
    SpeechRecognition.stopListening();
  };

  const copyToClipboard = (text) => {
    const input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices

    const result = document.execCommand('copy');
    document.body.removeChild(input);

    alert('Teks berhasil disalin ke clipboard');
    return result;
  };

  return (
    <main className="bg-dark vh-100">
      <div className="container py-5">
        <h1 className="text-white text-center pt-5">Speech to Text</h1>
        <p className="text-white text-center lead">Bahasa Indonesia</p>

        <div className="row justify-content-center py-5">
          <div className="col-lg-5">
            <div className="card shadow">
              <div className="card-body" style={{ minHeight: '250px' }}>
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <h5>Transkrip:</h5>
                  </div>
                  <div className="col-auto">
                    <button type="button" onClick={() => copyToClipboard(transcript)} className="btn btn-outline-secondary btn-sm" disabled={!transcript}>
                      <i className="fa-solid fa-clipboard me-2" />
                      Salin
                    </button>
                  </div>
                </div>
                <p>{transcript ? transcript : "..."}</p>
                <p>{message}</p>
                {transcript || message ? (
                  <button type="button" onClick={() => {
                    resetTranscript();
                    setMessage('');
                  }} className="btn btn-sm btn-outline-secondary">Hapus</button>
                ) : null}
              </div>
              <div className="card-footer text-center">
                <button type="button" onClick={!listening ? onStart : onStop} className={`btn ${!listening ? 'btn-primary' : 'btn-danger'} btn-lg rounded-pill px-5`}>
                  <i className={!listening ? "fa-solid fa-microphone me-2" : "fa-solid fa-microphone-slash me-2"} />
                  {!listening ? 'Mulai' : 'Berhenti'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-light text-center">&copy; 2022 Novan Junaedi</p>
      </div>
    </main>
  );
}

export default App;
