# Healthcare Translation Web App

A mobile-first, real-time multilingual translation platform for healthcare providers and patients, powered by Generative AI (Gemini API) and the Web Speech API. This app enables seamless, secure, and accurate communication across language barriers in clinical settings.

---

## Features

- **Real-time Speech-to-Text:** Converts spoken input into live transcripts using the Web Speech API.
- **Generative AI Translation:** Enhances and translates medical speech with Google Gemini API, ensuring context-aware, medically accurate output.
- **Dual Transcript Display:** Shows both the original and translated transcripts side-by-side for clarity.
- **Audio Playback:** Provides translated speech via audio playback for both parties.
- **Language Selection:** Users can select source and target languages from a comprehensive, searchable list.
- **Mobile-First, Responsive Design:** Optimized for smartphones and tablets, with a modern, accessible UI.
- **User Guidance:** Clear instructions and status messages guide users through the process.
- **Data Privacy & Security:** No transcripts or audio are stored; all processing is transient and secure.

---

## Requirements & Solutions

| Requirement | Solution |
|-------------|----------|
| **Real-time transcription** | Utilized the Web Speech API in-browser for instant, accurate speech-to-text conversion. |
| **Generative AI translation & enhancement** | Integrated Gemini API via a secure backend route, using environment variables to protect API keys. Medical terms are enhanced before translation for accuracy. |
| **Dual transcript display** | Two-panel layout: left for original, right for translated, both with live updates. |
| **Audio playback of translation** | Translated text is converted to speech using Gemini's TTS, with a "Speak" button for playback. |
| **Language selection** | Searchable dropdowns for both input and output languages, supporting a wide range of languages. |
| **Mobile-first, responsive UI** | Built with Next.js and Tailwind CSS, ensuring a modern, accessible, and responsive interface. |
| **User guidance** | Header, color-coded panels, and bullet-point instructions help users understand and use the app effectively. |
| **Privacy & security** | All processing is done in-memory; no data is stored. API keys are never exposed to the client. |

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Speech Recognition:** Web Speech API (browser-based)
- **Translation & TTS:** Google Gemini API (via secure backend)
- **Deployment:** Vercel or any Node.js-compatible platform

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd healthcare-translation
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_gemini_api_key_here
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. Select the input (patient/provider) and output (provider/patient) languages.
2. Press the microphone button and speak clearly.
3. View the live transcript and its translation side-by-side.
4. Press the "Speak" button to play the translated audio.
5. Use the "Stop Speaking" button to end transcription at any time.

---

## Privacy & Security

- **No data storage:** All speech and text data are processed in-memory and never stored.
- **API key security:** Gemini API key is stored server-side and never exposed to the client.
- **Compliance:** Designed with healthcare privacy best practices in mind (HIPAA-friendly, but not certified).

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Acknowledgments

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Gemini API](https://ai.google.dev/gemini-api/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
