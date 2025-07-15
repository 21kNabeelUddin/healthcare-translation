"use client";

import React, { useRef, useState, useEffect } from "react";

// Replace the languages array with a comprehensive list of UN-recognized countries' national/official languages and their BCP-47 codes
const languages = [
  { code: "en-US", label: "English (United States)" },
  { code: "en-GB", label: "English (United Kingdom)" },
  { code: "fr-FR", label: "French (France)" },
  { code: "es-ES", label: "Spanish (Spain)" },
  { code: "es-MX", label: "Spanish (Mexico)" },
  { code: "ar-SA", label: "Arabic (Saudi Arabia)" },
  { code: "zh-CN", label: "Chinese (Mandarin, China)" },
  { code: "zh-TW", label: "Chinese (Mandarin, Taiwan)" },
  { code: "ru-RU", label: "Russian (Russia)" },
  { code: "pt-PT", label: "Portuguese (Portugal)" },
  { code: "pt-BR", label: "Portuguese (Brazil)" },
  { code: "de-DE", label: "German (Germany)" },
  { code: "hi-IN", label: "Hindi (India)" },
  { code: "bn-BD", label: "Bengali (Bangladesh)" },
  { code: "ja-JP", label: "Japanese (Japan)" },
  { code: "tr-TR", label: "Turkish (Turkey)" },
  { code: "it-IT", label: "Italian (Italy)" },
  { code: "ko-KR", label: "Korean (Korea)" },
  { code: "fa-IR", label: "Persian (Iran)" },
  { code: "id-ID", label: "Indonesian (Indonesia)" },
  { code: "th-TH", label: "Thai (Thailand)" },
  { code: "vi-VN", label: "Vietnamese (Vietnam)" },
  { code: "sw-KE", label: "Swahili (Kenya)" },
  { code: "uk-UA", label: "Ukrainian (Ukraine)" },
  { code: "pl-PL", label: "Polish (Poland)" },
  { code: "ro-RO", label: "Romanian (Romania)" },
  { code: "nl-NL", label: "Dutch (Netherlands)" },
  { code: "el-GR", label: "Greek (Greece)" },
  { code: "he-IL", label: "Hebrew (Israel)" },
  { code: "hu-HU", label: "Hungarian (Hungary)" },
  { code: "cs-CZ", label: "Czech (Czech Republic)" },
  { code: "sv-SE", label: "Swedish (Sweden)" },
  { code: "fi-FI", label: "Finnish (Finland)" },
  { code: "no-NO", label: "Norwegian (Norway)" },
  { code: "da-DK", label: "Danish (Denmark)" },
  { code: "sk-SK", label: "Slovak (Slovakia)" },
  { code: "hr-HR", label: "Croatian (Croatia)" },
  { code: "sr-RS", label: "Serbian (Serbia)" },
  { code: "bg-BG", label: "Bulgarian (Bulgaria)" },
  { code: "et-EE", label: "Estonian (Estonia)" },
  { code: "lt-LT", label: "Lithuanian (Lithuania)" },
  { code: "lv-LV", label: "Latvian (Latvia)" },
  { code: "sl-SI", label: "Slovenian (Slovenia)" },
  { code: "ms-MY", label: "Malay (Malaysia)" },
  { code: "ta-IN", label: "Tamil (India)" },
  { code: "te-IN", label: "Telugu (India)" },
  { code: "ml-IN", label: "Malayalam (India)" },
  { code: "ur-PK", label: "Urdu (Pakistan)" },
  { code: "pa-IN", label: "Punjabi (India)" },
  { code: "gu-IN", label: "Gujarati (India)" },
  { code: "mr-IN", label: "Marathi (India)" },
  { code: "kn-IN", label: "Kannada (India)" },
  { code: "or-IN", label: "Odia (India)" },
  { code: "si-LK", label: "Sinhala (Sri Lanka)" },
  { code: "my-MM", label: "Burmese (Myanmar)" },
  { code: "km-KH", label: "Khmer (Cambodia)" },
  { code: "lo-LA", label: "Lao (Laos)" },
  { code: "am-ET", label: "Amharic (Ethiopia)" },
  { code: "yo-NG", label: "Yoruba (Nigeria)" },
  { code: "ig-NG", label: "Igbo (Nigeria)" },
  { code: "zu-ZA", label: "Zulu (South Africa)" },
  { code: "af-ZA", label: "Afrikaans (South Africa)" },
  { code: "xh-ZA", label: "Xhosa (South Africa)" },
  { code: "st-ZA", label: "Southern Sotho (South Africa)" },
  { code: "ne-NP", label: "Nepali (Nepal)" },
  { code: "ps-AF", label: "Pashto (Afghanistan)" },
  { code: "uz-UZ", label: "Uzbek (Uzbekistan)" },
  { code: "kk-KZ", label: "Kazakh (Kazakhstan)" },
  { code: "mn-MN", label: "Mongolian (Mongolia)" },
  { code: "az-AZ", label: "Azerbaijani (Azerbaijan)" },
  { code: "ka-GE", label: "Georgian (Georgia)" },
  { code: "hy-AM", label: "Armenian (Armenia)" },
  { code: "sq-AL", label: "Albanian (Albania)" },
  { code: "bs-BA", label: "Bosnian (Bosnia and Herzegovina)" },
  { code: "mk-MK", label: "Macedonian (North Macedonia)" },
  { code: "is-IS", label: "Icelandic (Iceland)" },
  { code: "ga-IE", label: "Irish (Ireland)" },
  { code: "mt-MT", label: "Maltese (Malta)" },
  { code: "cy-GB", label: "Welsh (United Kingdom)" },
  { code: "lb-LU", label: "Luxembourgish (Luxembourg)" },
  { code: "fo-FO", label: "Faroese (Faroe Islands)" },
  { code: "sm-WS", label: "Samoan (Samoa)" },
  { code: "to-TO", label: "Tongan (Tonga)" },
  { code: "fj-FJ", label: "Fijian (Fiji)" },
  { code: "ht-HT", label: "Haitian Creole (Haiti)" },
  { code: "rw-RW", label: "Kinyarwanda (Rwanda)" },
  { code: "so-SO", label: "Somali (Somalia)" },
  { code: "tg-TJ", label: "Tajik (Tajikistan)" },
  { code: "ky-KG", label: "Kyrgyz (Kyrgyzstan)" },
  { code: "tk-TM", label: "Turkmen (Turkmenistan)" },
  { code: "mo-MD", label: "Moldovan (Moldova)" },
  { code: "be-BY", label: "Belarusian (Belarus)" },
  { code: "lv-LV", label: "Latvian (Latvia)" },
  { code: "lt-LT", label: "Lithuanian (Lithuania)" },
  { code: "et-EE", label: "Estonian (Estonia)" },
  { code: "gl-ES", label: "Galician (Spain)" },
  { code: "eu-ES", label: "Basque (Spain)" },
  { code: "ca-ES", label: "Catalan (Spain)" },
  { code: "sr-ME", label: "Serbian (Montenegro)" },
  { code: "kk-KZ", label: "Kazakh (Kazakhstan)" },
  { code: "ky-KG", label: "Kyrgyz (Kyrgyzstan)" },
  { code: "uz-UZ", label: "Uzbek (Uzbekistan)" },
  { code: "tk-TM", label: "Turkmen (Turkmenistan)" },
  { code: "mo-MD", label: "Moldovan (Moldova)" },
  { code: "be-BY", label: "Belarusian (Belarus)" },
  // ... add more as needed ...
];

function LanguageDropdown({
  label,
  value,
  onChange,
  search,
  setSearch,
  options,
  color,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
  options: { code: string; label: string }[];
  color: "blue" | "green";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const selected = options.find((l) => l.code === value);
  return (
    <div className="mb-6 relative" ref={ref}>
      <label className="block mb-2 font-semibold text-gray-700">{label}</label>
      <div
        className={`w-full border border-gray-300 rounded-lg px-3 py-2 bg-white cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-${color}-400`}
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen((o) => !o);
        }}
      >
        <span>{selected ? selected.label : "Select language..."}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {open && (
        <div className="absolute left-0 w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-64 overflow-y-auto overflow-x-hidden z-20">
          <input
            type="text"
            className={`w-full border-0 border-b border-gray-200 rounded-t-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-${color}-400`}
            placeholder="Search language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <ul className="max-h-48 overflow-y-auto">
            {options.length === 0 && (
              <li className="px-3 py-2 text-gray-400">No languages found</li>
            )}
            {options.map((lang) => (
              <li
                key={lang.code}
                className={`px-3 py-2 cursor-pointer hover:bg-${color}-100 ${lang.code === value ? `bg-${color}-50 font-bold` : ""}`}
                onClick={() => {
                  onChange(lang.code);
                  setOpen(false);
                }}
              >
                {lang.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [inputLang, setInputLang] = useState("en-US");
  const [outputLang, setOutputLang] = useState("es-ES");
  const [originalTranscript, setOriginalTranscript] = useState("");
  const [translatedTranscript, setTranslatedTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [enhancedTranscript, setEnhancedTranscript] = useState("");
  const [enhancing, setEnhancing] = useState(false);

  // Add search state for both selectors
  const [inputSearch, setInputSearch] = useState("");
  const [outputSearch, setOutputSearch] = useState("");

  // Use 'any' for compatibility with browsers and TypeScript
  const recognitionRef = useRef<any>(null);

  // @ts-ignore: Allow for browser compatibility
  const SpeechRecognition =
    typeof window !== "undefined" &&
    ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  const filteredInputLanguages = languages.filter(lang =>
    lang.label.toLowerCase().includes(inputSearch.toLowerCase())
  );
  const filteredOutputLanguages = languages.filter(lang =>
    lang.label.toLowerCase().includes(outputSearch.toLowerCase())
  );

  const handleStartRecording = () => {
    setError(null);
    if (!SpeechRecognition) {
      setError("Sorry, your browser does not support Speech Recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = inputLang;
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        interimTranscript += event.results[i][0].transcript;
      }
      setOriginalTranscript(interimTranscript);
    };

    recognition.onerror = (event: any) => {
      setError("Speech recognition error: " + event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
    if (originalTranscript.trim()) {
      const enhanced = await enhanceMedicalTerms(originalTranscript);
      translateWithGemini(enhanced, outputLang);
    }
  };

  const handleSpeak = () => {
    if (!translatedTranscript) return;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new window.SpeechSynthesisUtterance(translatedTranscript);
      utterance.lang = outputLang;
      // Try to select a matching voice for the output language
      const voices = window.speechSynthesis.getVoices();
      const match = voices.find(v => v.lang === outputLang);
      if (match) utterance.voice = match;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const enhanceMedicalTerms = async (text: string) => {
    setEnhancing(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=AIzaSyBTpWAYVbYYqUO2J-kPkQfkFW-Tk_vF0Ms`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Correct any medical terms in this transcript to their proper medical terminology. Return only the corrected transcript: "${text}"`
                  }
                ]
              }
            ]
          }),
        }
      );
      const data = await response.json();
      const enhanced = data?.candidates?.[0]?.content?.parts?.[0]?.text || text;
      setEnhancedTranscript(enhanced);
      setEnhancing(false);
      return enhanced;
    } catch {
      setEnhancedTranscript(text);
      setEnhancing(false);
      return text;
    }
  };

  const translateWithGemini = async (text: string, targetLang: string) => {
    setTranslatedTranscript("Translating...");
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=AIzaSyBTpWAYVbYYqUO2J-kPkQfkFW-Tk_vF0Ms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Translate the following text to ${languages.find(l => l.code === targetLang)?.label || targetLang}: "${text}". Respond with only the translated sentence, no explanation, no formatting.`
                  }
                ]
              }
            ]
          }),
        }
      );
      const data = await response.json();
      const translated = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Translation failed.";
      setTranslatedTranscript(translated);
    } catch (err) {
      setTranslatedTranscript("Translation error.");
    }
  };

  const debouncedTranslate = useRef(
    debounce((text: string, targetLang: string) => {
      translateWithGemini(text, targetLang);
    }, 800) // 800ms pause before translating
  ).current;

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          interimTranscript += event.results[i][0].transcript;
        }
        setOriginalTranscript(interimTranscript);
        if (interimTranscript.trim()) {
          enhanceMedicalTerms(interimTranscript).then(enhanced => {
            debouncedTranslate(enhanced, outputLang);
          });
        }
      };
    }
  }, [outputLang, debouncedTranslate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 bg-blue-700 shadow-md flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold text-yellow-400 tracking-tight">AI Translator Prototype</h1>
        <a
          href="https://github.com/21kNabeelUddin/healtcare-translation"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 md:mt-0 text-sm text-yellow-300 font-semibold underline hover:text-yellow-100 transition-colors"
        >
          [GITHUB REPO]
        </a>
      </header>

      {/* Info bullets below header */}
      <div className="w-full flex justify-start bg-black">
        <ul className="text-white text-base list-disc pl-8 py-2 max-w-2xl text-left">
          <li>Please select languages before speaking</li>
          <li>It takes approximately 10 seconds to translate due to GEMINI API's latency, so your patience would be greatly appreciated</li>
        </ul>
      </div>

      {/* Black background wrapper for main content */}
      <div className="flex-1 w-full bg-black py-10 px-0 md:px-0 flex justify-center items-center">
        <main className="flex flex-col md:flex-row gap-6 p-4 md:p-8 max-w-5xl mx-auto w-full">
          {/* Left: Recording & Original Transcript */}
          <section className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6 flex flex-col border border-gray-100">
            {/* Input Language Selector */}
            <LanguageDropdown
              label="Input Language"
              value={inputLang}
              onChange={setInputLang}
              search={inputSearch}
              setSearch={setInputSearch}
              options={filteredInputLanguages}
              color="blue"
            />
            <button
              className={`mb-6 px-6 py-3 rounded-lg font-semibold shadow transition-colors duration-200 text-white ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            {enhancing && (
              <div className="mb-2 text-blue-600 font-semibold">
                Enhancing your transcript for medical accuracy...
              </div>
            )}
            <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-200 text-gray-800 shadow-inner">
              <div className="font-bold mb-2 text-blue-700">Original Transcript</div>
              <div className="whitespace-pre-wrap min-h-[80px] text-lg">{originalTranscript || <span className="text-gray-400">Speak to see transcript...</span>}</div>
              {error && <div className="mt-2 text-red-600 font-semibold">{error}</div>}
            </div>
          </section>

          {/* Right: Translation & Output */}
          <section className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6 flex flex-col border border-gray-100">
            {/* Output Language Selector */}
            <LanguageDropdown
              label="Output Language"
              value={outputLang}
              onChange={setOutputLang}
              search={outputSearch}
              setSearch={setOutputSearch}
              options={filteredOutputLanguages}
              color="green"
            />
            <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-200 text-gray-800 shadow-inner mb-6">
              <div className="font-bold mb-2 text-green-700">Translated Transcript</div>
              <div className="whitespace-pre-wrap min-h-[80px] text-lg">{translatedTranscript || <span className="text-gray-400">Translation will appear here...</span>}</div>
            </div>
            <div className="flex gap-4">
              <button
                className="px-6 py-3 rounded-lg font-semibold shadow transition-colors duration-200 bg-green-600 hover:bg-green-700 text-white"
                onClick={handleSpeak}
                disabled={isSpeaking}
              >
                Speak
              </button>
              {isSpeaking && (
                <button
                  className="px-6 py-3 rounded-lg font-semibold shadow transition-colors duration-200 bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleStopSpeaking}
                >
                  Stop Speaking
                </button>
              )}
          </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function debounce<F extends (...args: any[]) => void>(func: F, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}