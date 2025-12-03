import { useState } from "react";
import { questions } from "./questions";

export default function App() {
  const [step, setStep] = useState(0);
  const current = questions[step];
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState("");

  // function handleAnswer(value) {
  //   setAnswers(prev => ({ ...prev, [current.id]: value }));
  //   if (current.type === "text") {
  //     setNotes(prev => prev + `\nQ: ${current.question}\nA: ${value}\n`);
  //   }
  //   setStep(step + 1);
  // }

  function handleAnswer(value) {
  // Store answer normally
  setAnswers(prev => ({ ...prev, [current.id]: value }));

  // Add formatted entry to notes (italic question, bold answer)
  setNotes(prev => 
    prev +
    `\n Q: ${current.question}\n A: ${value}\n`
  );

  // Move to next question
  setStep(step + 1);
}



  return (
    <>
      {/* Header ALWAYS visible */}
      <div className="w-full flex items-center justify-between p-4 border-b bg-white shadow-sm">
  
  {/* Left: Logo */}
  <div className="flex items-center gap-3">
    <img 
      src="/src/assets/skillbee-logo.png" 
      alt="Skillbee Logo" 
      className="h-10"
    />
  </div>

  {/* Right: Title */}
  <h1 className="text-xl font-medium text-gray-600">
    Candidate Profile Evaluator
  </h1>

</div>

      {/* MAIN SECTION */}
      {!current ? (
        /* FINISHED VIEW */
        <div className="flex h-screen p-6">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-3xl font-bold text-green-600">
              Lead Evaluation Completed 🎉
            </div>
          </div>

          <div className="w-80 ml-6 p-4 bg-gray-100 rounded-lg shadow h-full">
            <h2 className="text-lg font-semibold mb-2">Notes</h2>
            <textarea
              className="w-full h-[90%] p-2 border rounded resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write notes here…"
            ></textarea>
          </div>
        </div>
      ) : (
        /* QUESTION FLOW VIEW */
        <div className="flex h-screen p-6">
          {/* LEFT PANEL */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-xl p-8 bg-white rounded-xl shadow-lg">
              <div className="mb-6">
                <div className="text-2xl font-semibold">{current.question}</div>
                {current.hinglish && (
                  <div className="text-gray-500 text-sm mt-1 italic">
                    {current.hinglish}
                  </div>
                )}
              </div>

              {/* SINGLE */}
              {current.type === "single" && (
                <div className="space-y-3">
                  {current.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* TEXT */}
              {current.type === "text" && (
                <div>
                  <input
                    type="text"
                    id="answerInput"
                    className="w-full p-3 border rounded-lg mb-4"
                    placeholder="Type answer…"
                  />

                  <button
                    onClick={() => {
                      const input = document.getElementById("answerInput").value.trim();
                      if (input) handleAnswer(input);
                    }}
                    className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* INFO */}
              {current.type === "info" && (
                <button
                  onClick={() => handleAnswer("info_read")}
                  className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Continue
                </button>
              )}
            </div>
          </div>

          {/* NOTES PANEL */}
          <div className="w-80 ml-6 p-4 bg-gray-100 rounded-lg shadow h-5/6">
            <h2 className="text-m font-semibold mb-2">Notes</h2>
            <textarea
              className="w-full h-[90%] p-2 border rounded resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write notes here…"
            ></textarea>
          </div>
        </div>
      )}
    </>
  );
}
