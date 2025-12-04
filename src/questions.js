export const questions = [
  {
    id: 1,
    type: "single",
    hinglish: "Kya main candidate se baat kar raha/rahi hoon?",
    question: "Am I speaking with the candidate?",
    options: ["Yes", "No"],
  },

  {
    id: 2,
    type: "single",
    hinglish: "Germany ke nursing job ke liye aapka application recieve hua tha. Kya yeh baat karne ka sahi time hai?",
    question: "We received your nursing job application for Germany. Is this a good time to talk?",
    options: ["Yes", "No", "Not Interested"],
  },

  {
    id: 3,
    type: "info",
    hinglish:
      "Skillbee ek global recruitment company hai jo nurses ko Germany mein place karti hai. Aapki eligibility check karne ke liye mujhe kuch sawal poochne honge.",
    question:
      "Skillbee is a global recruitment company that places nurses in Germany. To check eligibility, I need to ask some questions.",
  },

  {
    id: 4,
    type: "single",
    hinglish: "Aapki sabse badi nursing qualification kya hai?",
    question: "What is your highest nursing education?",
    options: ["BSc Nursing", "MSc Nursing", "GNM Nursing", "Other"],
    validate: (value) =>
      ["BSc Nursing", "MSc Nursing", "GNM Nursing"].includes(value),
    failReason: "ANM and Other qualifications are not eligible.",
  },

  {
    id: 5,
    type: "single",
    hinglish: "Kya aap registered nurse ho?",
    question: "Are you a registered nurse?",
    options: ["Yes / Will be in 6 months", "No"],
    validate: (value) => value === "Yes / Will be in 6 months",
    failReason:
      "Candidate must be registered or will be registered within 6 months.",
  },

  {
    id: 6,
    type: "text",
    hinglish: "Aapki Age kya hai?",
    question: "What is your Age?",
    validate: (value) => {
      const age = parseInt(value);
      return age >= 18 && age < 39;
    },
    failReason: "Age must be between 18 and 39.",
  },

  {
    id: 7,
    type: "text",
    hinglish: "Aap Germany mein kaam kyun karna chahte ho? Kya wajah hai?",
    question: "Why do you want to work in Germany?",
  },

  {
    id: 8,
    type: "single",
    hinglish:
      "Kya aapke upar koi family zimmedari hai? Agar haan, toh Delhi mein 8 mahine ki training kaise manage karoge?",
    question:
      "Do you have any family responsibilities? If yes, how will you manage 8 months training in Delhi?",
    options: [
      "No family responsibility",
      "Explained how they will manage",
      "Will discuss with family",
      "Cannot manage",
      "Did not explain properly",
    ],
    validate: (value) =>
      [
        "No family responsibility",
        "Explained how they will manage",
        "Will discuss with family",
        "Did not explain properly",
      ].includes(value),
    failReason: "Family responsibilities make the candidate not eligible.",
  },

  {
    id: 9,
    type: "single",
    hinglish:
      "Kya aap 8 mahine ke German language training ke liye Delhi shift ho sakte ho?",
    question:
      "Are you willing to relocate to Delhi for 8 months of German language training?",
    options: ["Yes, willing", "No, not willing"],
    validate: (value) =>
      value.toLowerCase().trim().startsWith("yes"),
    failReason: "Candidate must be willing to relocate for training.",
  },
];
