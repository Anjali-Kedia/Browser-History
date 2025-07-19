import React,{useState} from 'react';

interface HistoryEntry {
    url: string;
    timestamp: Date;
}

const App: React.FC = () => {
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [urlInput, setUrlInput] = useState<string>("");
    const [historyLength, setHistoryLength] = useState<number>(5);
    const visitPage = (url: string) => {
            if(!url.trim()) {
                return;
            }
            const newEntry: HistoryEntry = {
                url,
                timestamp: new Date()
            };
            setHistory(prevHistory => {
                const filtered = prevHistory.filter(entry => entry.url !== url);
                return [newEntry, ...filtered].slice(0, 100);
        });
        setUrlInput("");
    };
    const clearHistory = () => {
        setHistory([]);
    };
    const getMostRecentEntries = (): HistoryEntry[] => {
      return history.slice(0, historyLength);
    };
    return (
        <div>
            <h1>Browser History</h1>
            <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter URL"
            />
            <button onClick={() => visitPage(urlInput)}>Visit Page</button>
            <button onClick={clearHistory}>Clear History</button>
            <div>
                <label>
                    Max History Length:
                    <input
                        type="number"
                        value={historyLength}
                        onChange={(e) => setHistoryLength(Number(e.target.value))}
                        min="1"
                        max="100"
                    />
                </label>
            </div>
            <ul>
                {getMostRecentEntries().map((entry, index) => (
                    <li key={index}>
                        {entry.url} - {entry.timestamp.toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;