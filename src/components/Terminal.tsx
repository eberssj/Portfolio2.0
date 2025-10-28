import React, { useState, useRef, useEffect } from 'react';
import TypingText from './TypingText';
import '../styles/Terminal.css';

const Terminal: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  type HistoryItem = { kind: 'input' | 'response' | 'static'; text: string };

  const [history, setHistory] = useState<HistoryItem[]>([
    { kind: 'static', text: 'Programando desde 2022...' },
    { kind: 'static', text: 'Com carinho e dedicação :)' },
  ]);

  const [hasResponded, setHasResponded] = useState(false);
  const [focused, setFocused] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
  }, []);

  const commandResponses: { [key: string]: string } = {
    'oi': 'Oie! Tudo bem sim e você??',
    'oii': 'Oie! Tudo bem sim e você??',
    'ola': 'Oie! Tudo bem sim e você??',
    'olá': 'Oie! Tudo bem sim e você??',
    'tudo bem': 'Oie! Tudo ótimo e contigo??',
    'que legal': 'Obrigadooo :))',
    'muito bom': 'Obrigadooo :)) q bom que achou!',
    'gostei': 'Que bom!',
    'show': 'Opa, vlw ae man!',
    'legal': 'Obrigado pelo carinho :))',
    'massa': 'Muito, né?',
    'top': 'hihi :3',
    'amei': 'Awww, obrigadooo <3',
    'amo': 'Eh noiss',
    'amoo': 'Amamos horrores!',
    'ameii': 'Thx babe :)',
    'bonito': 'Origadoo :))',
    'arrasou': 'Obrigadooo :))))',
    'divou': 'Nois ama!!',
    'diva': 'Você mds!!',
    'divo': 'Você mds!!',
    'veyr': '// AMO MO !',
    'vey': 'Oy vey',
    'hey hey hey': 'Hey hey hey veyr',
    'feio': '>:',
    'bosta': '>:',
    'lixo': '>:',
    'horror': '>:',
    'péssimo': '>:',
    'pessimo': '>:',
    'ruim': '>:',
    'odeio': '>:',
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (hasResponded) return;
    if (e.key === 'Enter') {
      const command = inputValue.trim();
      if (!command) return;

      setHistory(prev => [...prev, { kind: 'input', text: command }]);

      const lc = command.toLowerCase();
      let response: string | undefined;

      for (const key in commandResponses) {
        if (lc.includes(key)) {
          response = commandResponses[key];
          break;
        }
      }

      const badWords = [
        'bosta', 'lixo', 'horror', 'péssimo', 'pessimo',
        'ruim', 'merda', 'idiota', 'feio', 'odeio', 'lixão', 'lixao'
      ];
      if (!response && badWords.some(w => lc.includes(w))) {
        response = '>:';
      }

      if (!response) response = 'Não entendi :(';

      setHistory(prev => [...prev, { kind: 'response', text: response! }]);
      setHasResponded(true);
      setInputValue('');
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      setInputValue(prev => prev + e.key);
    } else if (e.key === 'Backspace') {
      setInputValue(prev => prev.slice(0, -1));
    }
  };

  return (
    <div
      className="terminal-wrapper"
      ref={terminalRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="terminal-shadow"></div>
      <div className="terminal-body tech">
        <div className="terminal-tabs tech">
          <span>PROBLEMS</span>
          <span>OUTPUT</span>
          <span className="active-tab">TERMINAL</span>
          <span>DEBUG CONSOLE</span>
          <span>PORTS</span>
        </div>

        <div className="terminal-content tech">
          {history.map((item, index) => {
            if (item.kind === 'static' || item.kind === 'input') {
              return (
                <p key={index} className="terminal-line tech">
                  C:\Users\Eber&gt; {item.text}
                </p>
              );
            }

            if (item.kind === 'response') {
              return (
                <div key={index} className="terminal-line tech response-line">
                  <span>C:\Users\Eber&gt;&nbsp;</span>
                  <TypingText text={item.text} speed={40} />
                </div>
              );
            }

            return null;
          })}

          {!hasResponded && (
            <div className="terminal-input-line tech">
              <span>C:\Users\Eber&gt; </span>
              <span>{inputValue}</span>
              {focused && <span className="blinking-cursor"></span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
