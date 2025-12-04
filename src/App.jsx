import { useState } from "react";
import { questions } from "./questions";

export default function App() {
  const [step, setStep] = useState(0);
  const [notes, setNotes] = useState("");
  const [answers, setAnswers] = useState({});
  const [eligibilityResults, setEligibilityResults] = useState({});
  const [failedStep, setFailedStep] = useState(null);
  const [sessionBooked, setSessionBooked] = useState(false);

  const current = questions[step];

  
  function handleAnswer(value) {
    setNotes(
      (prev) =>
        prev + `\nQ: ${current.question}\nA: ${value}\n`
    );

    if (current.validate) {
      const valid = current.validate(value);

      if (!valid) {
        setEligibilityResults({
          [current.id]: { valid: false, reason: current.failReason },
        });

        setFailedStep(step);
        setStep(questions.length);
        return;
      }
    }

    setAnswers((prev) => ({ ...prev, [current.id]: value }));

    const field = document.getElementById("answerInput");
    if (field) field.value = "";

    setStep(step + 1);
  }

  
  function handleBack() {
    if (step === 0) return;

    const previousStep = Math.max(0, step - 1);
    const prevQuestion = questions[previousStep];

    const qText = `Q: ${prevQuestion.question}`;
    const lastIndex = notes.lastIndexOf(qText);
    if (lastIndex !== -1) {
      setNotes(notes.slice(0, lastIndex).trim());
    }

    setEligibilityResults(prev => {
      const copy = { ...prev };
      delete copy[prevQuestion.id];
      return copy;
    });

    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[prevQuestion.id];
      return copy;
    });

    setStep(previousStep);
  }

  
  const failed =
    step >= questions.length
      ? Object.values(eligibilityResults)[0] || null
      : null;

  return (
    <>
      
      <div className="w-full flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <img
          src="/src/assets/skillbee-logo.png"
          alt="Skillbee Logo"
          className="h-10"
        />
        <h1 className="text-xl font-medium text-gray-600">
          Candidate Profile Evaluator
        </h1>
      </div>

      {/* MAIN SCREEN */}
      {step >= questions.length ? (
        <div className="flex h-screen p-6">
          <div className="flex-1 flex flex-col justify-center items-center gap-4">

           
            {!failed ? (
              <div className="max-w-2xl text-center">
                <div className="text-3xl font-poppins text-green-600 mb-6">
                  🎉 Candidate is Eligible!
                </div>

                <div className="text-left bg-green-50 p-6 rounded-xl shadow leading-relaxed text-gray-800 space-y-3">

                  <p className="font-semibold">
                    Thanks for answering. Aap aage ke interview process ke liye eligible hai.  
                    Aapko Germany ki job details bata deta hu:
                  </p>

                  <ol className="list-decimal ml-6 space-y-2">
                    <li>Germany me rahne aur kaam karne ke liye aapko German language seekhni hogi.</li>
                    <li>Germany me aapko ₹2.5 – ₹3 lakh per month salary milegi.</li>
                    <li>Retirement ke baad aapko ek bahut achchi pension milegi.</li>
                    <li>Aapke aur aapki family ke liye healthcare aur education free hoga.</li>
                    <li>Daily 7–8 ghante ki shift, hafte me sirf 5 din kaam + 2 din chutti.</li>
                    <li>Saal me lagbhag 1 mahine ki paid vacation milegi.</li>
                    <li>Overtime, holidays, public holidays pe extra payment milegi.</li>
                    <li>5 saal baad PR mil sakti hai, 10 saal baad citizenship bhi.</li>
                  </ol>

                  <p className="mt-4 font-semibold">Next Step:</p>

                  <p>
                    Aapki eligibility verify karne aur pura process explain karne ke liye  
                    main aapka video call interview arrange kar raha hu hamare Senior Counsellor ke saath.
                  </p>

                  <ul className="list-disc ml-6 space-y-1">
                    <li>Woh aapke background details check karenge</li>
                    <li>Job aur pura process detail me samjhayenge</li>
                    <li>End me ek chota screening round hoga</li>
                  </ul>

                  <p className="font-semibold mt-3">Call ke liye please ensure:</p>

                  <ul className="list-disc ml-6 space-y-1">
                    <li>Achha network ho</li>
                    <li>Light proper ho</li>
                    <li>Parents/guardians paas ho taaki unke sawaal bhi address ho sake</li>
                  </ul>

                  <p className="mt-4 font-semibold">
                    So, are you available for the interview right now?
                  </p>

                  <p className="text-gray-600 text-sm">
                    IF NOT THEN SAY:  
                    "<strong>What time are you available when someone main decision maker from your family can also join the call?</strong>"
                  </p>
                </div>

                
                {!sessionBooked ? (
                  <div className="mt-6 flex flex-col items-center gap-3">
                    <button
                      onClick={() => setSessionBooked(true)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Yes, I am available now
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 flex flex-col items-center gap-3">
                    <div className="text-2xl font-medi text-green-500">
                      ✅ Session has been booked!
                    </div>

                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Submit
                    </button>
                  </div>
                )}

              </div>
            ) : (

              
              <div className="text-2xl font-medium text-red-600 text-center">
                ❌ Not Eligible
                <p className="text-lg mt-4">{failed.reason}</p>

                <button
                  onClick={() => {
                    setStep(failedStep);
                    setEligibilityResults({});
                    const prevQuestion = questions[failedStep];
                    const qText = `Q: ${prevQuestion.question}`;
                    const lastIndex = notes.lastIndexOf(qText);
                    if (lastIndex !== -1) {
                      setNotes(notes.slice(0, lastIndex).trim());
                    }
                    setAnswers(prev => {
                      const copy = { ...prev };
                      delete copy[prevQuestion.id];
                      return copy;
                    });
                  }}
                  className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Go Back & Fix
                </button>

                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 ml-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            )}
          </div>

          
          <div className="w-80 ml-6 p-4 bg-gray-100 rounded-lg shadow h-full">
            <h2 className="text-lg font-semibold mb-2">Notes</h2>
            <textarea
              className="w-full h-[90%] p-2 border rounded resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        </div>
      ) : (
        
        <div className="flex h-screen p-6">
          <div className="flex-1 flex items-center justify-center relative">

            {step > 0 && (
              <button
                onClick={handleBack}
                className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
              >
                ← Back
              </button>
            )}

            <div className="w-full max-w-xl p-8 bg-white rounded-xl shadow-lg">
              <div className="mb-6">

                
                {current.hinglish && (
                  <div className="text-2xl font-medium text-gray-800 mb-2">
                    {current.hinglish}
                  </div>
                )}

                {/* ENGLISH BELOW */}
                <div className="text-lg font-medium text-gray-500 italic">
                  {current.question}
                </div>
              </div>

              
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

              
              {current.type === "text" && (
                <div>
                  <input
                    id="answerInput"
                    type="text"
                    className="w-full p-3 border rounded-lg mb-4"
                  />
                  <button
                    onClick={() => {
                      const input = document
                        .getElementById("answerInput")
                        .value.trim();
                      if (input) handleAnswer(input);
                    }}
                    className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              )}

              
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

         
          <div className="w-80 ml-6 p-4 bg-gray-100 rounded-lg shadow h-full">
            <h2 className="text-lg font-semibold mb-2">Notes</h2>
            <textarea
              className="w-full h-[90%] p-2 border rounded resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        </div>
      )}
    </>
  );
}
