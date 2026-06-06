import React, { useState, useRef, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark as cmTheme } from '@codemirror/theme-one-dark'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { FaPlay } from "react-icons/fa";

const languages = ["JavaScript", "Python", "Java", "C++"]

export default function Terminal() {
    const [input, setInput] = useState("")
    const [history, setHistory] = useState([
        { type: "system", text: "CodeNest Terminal v1.0" },
        { type: "system", text: "Write code and press Run." },
    ])
    const [language, setLanguage] = useState("JavaScript")
    const [running, setRunning] = useState(false)
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [history])

    function getExtension(lang) {
        if (lang === "Python") return python()
        if (lang === "Java") return java()
        if (lang === "C++") return cpp()
        return javascript()
    }

    function getLanguageId(lang) {
        const ids = { "JavaScript": 63, "Python": 71, "Java": 62, "C++": 54 }
        return ids[lang] || 63
    }

    async function runCode() {
        if (!input.trim()) return
        setRunning(true)
        setHistory(prev => [...prev, { type: "input", text: input, language }])
        try {
            const res = await fetch("https://ce.judge0.com/submissions?wait=true", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source_code: input,
                    language_id: getLanguageId(language),
                    stdin: ""
                })
            })
            const result = await res.json()
            const output = result.stdout || result.stderr || result.compile_output || "No output"
            setHistory(prev => [...prev,
            { type: result.stderr ? "error" : "output", text: output }
            ])
        } catch {
            setHistory(prev => [...prev,
            { type: "error", text: "Error connecting to server" }
            ])
        }
        setRunning(false)
    }

    function clearTerminal() {
        setHistory([{ type: "system", text: "Terminal cleared." }])
    }

    return (
        <main className="flex-1">
            <PanelGroup direction="horizontal" className="h-[calc(100vh-100px)] overflow-hidden border border-[#333] bg-black">

                <Panel defaultSize={15} minSize={10} maxSize={20}>
                    
                    <div className="w-full shrink-0 flex flex-col border-r border-[#333]" style={{ background: '#0a0a0a' }}>
                        <div className="px-4 py-3 border-b border-[#333]">
                            <p className="text-[10px] text-[#bebebe] uppercase tracking-widest">Languages</p>
                        </div>
                        <nav className="p-2 flex flex-col gap-0.5 flex-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguage(lang)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left transition-colors w-full
                                ${language === lang
                                            ? 'bg-[#1c1400] text-orange-400 border border-orange-500/30'
                                            : 'text-[#bebebe] hover:bg-[#1c1400] hover:text-orange-400'
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                            <div className="border-t border-[#333] my-2" />
                            <button
                                onClick={clearTerminal}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[#bebebe] hover:text-[#999] hover:bg-[#111] transition-colors w-full"
                            >
                                Clear
                            </button>
                        </nav>
                    </div>
                </Panel>

                    
                <PanelResizeHandle className="w-1 bg-[#1c1c1c] hover:bg-orange-400 transition-colors cursor-col-resize" />

                <Panel defaultSize={55} minSize={30}>

                    <div className="flex-1 flex flex-col h-full min-w-0 border-r border-[#1c1c1c]">

                        {/* Title bar */}
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1c1c1c]" style={{ background: '#0a0a0a' }}>

                            <button
                                onClick={runCode}
                                disabled={running || !input.trim()}
                                className="flex items-center justify-center gap-1 rounded-sm p-1  text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{ background: running ? '#1c1400' : '#f97316', color: running ? '#f97316' : '#000' }}
                            >
                                {running ? (
                                    <>
                                        <div className="w-3 h-3 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                                        Running...
                                    </>
                                ) : <> <FaPlay className='text-black' />Run</>}
                            </button>

                            <span className="text-[11px] text-[#bebebe] font-mono">
                                {language === "JavaScript" ? "main.js" : language === "Python" ? "main.py" : language === "Java" ? "Main.java" : "main.cpp"}
                            </span>
                            <span className="text-[11px] text-[#bebebe] font-mono">editor</span>
                        </div>

                        {/* CodeMirror */}
                        <div className="flex-1 overflow-hidden">
                            <CodeMirror
                                value={input}
                                height="100%"
                                theme={cmTheme}
                                extensions={[getExtension(language)]}
                                onChange={(val) => setInput(val)}
                                style={{ fontSize: '14px', height: '100%' }}
                            />
                        </div>

                    </div>

                </Panel>
                <PanelResizeHandle className="w-1 bg-[#1c1c1c] hover:bg-orange-400 transition-colors cursor-col-resize" />

                {/* Output */}
                <Panel defaultSize={30} minSize={15}>
                    <div className="w-full h-full shrink-0 flex flex-col" style={{ background: '#0a0a0a' }}>
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#333]">

                            <span className="text-[11px] text-[#bebebe] font-mono">output</span>
                        </div>

                        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-3">
                            {history.map((item, index) => (
                                <div key={index}>
                                    {item.type === "system" && (
                                        <p className="text-[#333]">{item.text}</p>
                                    )}
                                    {item.type === "input" && (
                                        <div>
                                            <p className="text-orange-500 mb-1.5">▶ {item.language}</p>

                                        </div>
                                    )}
                                    {item.type === "output" && (
                                        <div>
                                            <p className="text-[#bebebe] mb-1">● output</p>
                                            <pre className="text-green-400 leading-relaxed">{item.text}</pre>
                                        </div>
                                    )}
                                    {item.type === "error" && (
                                        <div>
                                            <p className="text-[#bebebe] mb-1">● error</p>
                                            <pre className="text-red-400 leading-relaxed">{item.text}</pre>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </div>
                    </div>
                </Panel>

            </PanelGroup>
        </main >
    )
}