
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [int, setInt] = useState("");
  const [inpt, setInpt] = useState("");
  const [loading, setloading] = useState(true);
  const [forint, setforint] = useState([]);

  const generateGreeting = async () => {
    setloading(false);
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDvVXmGqbGffekch3hbXUi7eqXBn--zwwI",
        {
          contents: [{ parts: [{ text: int }] }],
        }
      );
      
      const th = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      const replasmant = th.replace(/\*/g, '');
      setInpt(replasmant);
      setforint(prev => [...prev, int]);
    } catch (error) {
      console.error("Error:", error);
      setInpt("Error generating content.");
    } finally {
      setloading(true);
    }
  };

  const handl = (e) => {
    e.preventDefault();
    generateGreeting();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Content Generator</h1>
          <p className="text-gray-600">Enter your prompt and get AI-generated content</p>
        </div>

        <form onSubmit={handl} className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Your Prompt
            </label>
            <textarea
              id="prompt"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              rows={5}
              placeholder="Type your question or prompt here..."
              value={int}
              onChange={(e) => setInt(e.target.value)}
            />
            
            <div className="mt-4">
              <button
                type="submit"
                disabled={!loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? 'Generate Content' : 'Generating...'}
              </button>
            </div>
          </div>

          {inpt && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">AI Response</h2>
              <div className="prose prose-indigo max-w-none">
                <p className="whitespace-pre-wrap text-gray-700">{inpt}</p>
              </div>
            </div>
          )}

          {forint.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Previous Prompts</h2>
              <ul className="divide-y divide-gray-200">
                {forint.map((input, index) => (
                  <li key={index} className="py-3">
                    <p className="text-gray-700">{input}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}