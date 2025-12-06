import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Facebook, Heart, Stars, ArrowRight, Gift, Lock, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser'; 

// Replace these with your actual EmailJS credentials
const SERVICE_ID = 'service_o0tuuvo'; 
const TEMPLATE_ID = 'template_tbhfyjo';
const PUBLIC_KEY = 'cuqmTbOHHD6T6JtlG';
// The steps of our romantic journey (omitted for brevity, remains the same)
const STEPS = [
  {
    id: 'intro',
    icon: <Lock className="w-6 h-6 md:w-7 md:h-7 text-rose-400" />,
    title: "A Secret Awaits",
    text: "I have something special to show you, but first... I need you to unlock a few memories.",
    buttonText: "Begin Discovery"
  },
  {
    id: 'clue1',
    icon: <Stars className="w-6 h-6 md:w-7 md:h-7 text-amber-400" />,
    title: "Clue #1",
    text: "Think of the person who makes you laugh even when you don't want to smile. That's where this link leads.",
    buttonText: "Ooh, tell me more"
  },
  {
    id: 'clue2',
    icon: <Heart className="w-6 h-6 md:w-7 md:h-7 text-rose-500" />,
    title: "Clue #2",
    text: "This profile belongs to someone who genuinely appreciates you more than you know.",
    buttonText: "I think I know..."
  },
  {
    id: 'clue3',
    icon: <Gift className="w-6 h-6 md:w-7 md:h-7 text-purple-400" />,
    title: "Clue #3",
    text: "Final hint: This person sees a future with you and is excited for what’s ahead.",
    buttonText: "Reveal the Profile"
  }
];

// --- Unlocking Form Component (UPDATED) ---
// This component handles the name check before the main loop starts
const UnlockingForm = ({ onUnlock }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Define the multiple correct name/password pairs
  const CORRECT_PAIRS = [
    { first: 'asma', last: 'seloum' },
    { first: 'asma', last: 'selloum' },
    { first: 'asmaa', last: 'seloum' },
    { first: 'asmaa', last: 'selloum' },
    { first: 'assma', last: 'selom' },
    { first: 'assma', last: 'sellom' },
    { first: 'assmaa', last: 'selom' },
    { first: 'اسماء', last: 'سلوم' },
    { first: 'أسماء', last: 'سلوم' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normalize input to lowercase for case-insensitive check
    const inputFirstName = firstName.trim().toLowerCase();
    const inputLastName = lastName.trim().toLowerCase();
    
    // Check if the input matches any of the correct pairs
    const isMatch = CORRECT_PAIRS.some(pair => 
      pair.first === inputFirstName && pair.last === inputLastName
    );

    if (isMatch) {
      setErrorMessage('');
      onUnlock(); // Call the function to start the loop
    } else {
      setErrorMessage(
"Oops! That key didn't fit the lock. Try checking the spelling or remembering the name of the person who share this connection. Give it another shot!" 
  );
      setFirstName('');
      setLastName('');
    }
  };

  useEffect(() => {
    // Data to pass to your email template
    const templateParams = {
        // This is an example of a field you defined in your EmailJS template
        message: 'Someone has just opened the romantic puzzle page!', 
        to_email: 'alasqlto62@gmail.com', // The actual recipient email
    };

    // Send the email using the SDK
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then((response) => {
           // You can log success here, but the user won't see it
           console.log('EMAIL SENT SUCCESSFULLY!', response.status, response.text);
        })
        .catch((err) => {
           // You can log error here
           console.error('EMAIL SEND FAILED:', err);
        });

}, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-sm md:max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 text-center border border-rose-100"
    >
      <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
        <Lock className="w-7 h-7" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-800 mb-3 tracking-tight">
        Secret Code Required
      </h2>
      <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">
      To start our journey, please enter the name of the person who share this special bond.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="First Name (Key)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-3 border border-rose-300 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition-all outline-none"
          required
        />
        <input
          type="text"
          placeholder="Last Name (Password)"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-3 border border-rose-300 rounded-xl focus:ring-rose-400 focus:border-rose-400 transition-all outline-none"
          required
        />

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-xs flex items-start gap-2"
          >
            <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="text-left font-medium">{errorMessage}</p>
          </motion.div>
        )}

        <button
          type="submit"
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-5 rounded-2xl transition-all duration-300 shadow-lg shadow-rose-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 mt-4"
        >
          Unlock the Journey
        </button>
      </form>
    </motion.div>
  );
};

// --- Main Celebration Component (REST OF THE CODE) ---
export const Celebration: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Trigger confetti when we hit the final state (useEffect remains the same)
  useEffect(() => {
    if (isFinished) {
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ['#e11d48', '#ec4899', '#f43f5e', '#fb7185'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
          shapes: ['circle']
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
          shapes: ['circle']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [isFinished]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setIsFinished(false);
    setCurrentStep(0);
    setIsUnlocked(false);
  };
  
  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  // Common wrapper to ensure centering and responsiveness
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full flex justify-center px-4 py-8 min-h-screen items-center">
      {children}
    </div>
  );
  
  // --- Check if unlocked first ---
  if (!isUnlocked) {
    return (
      <Wrapper>
        <UnlockingForm onUnlock={handleUnlock} />
      </Wrapper>
    );
  }

  // Render the final card (remains the same)
  if (isFinished) {
    return (
      <Wrapper>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-sm md:max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 text-center border border-rose-100 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300" />
          
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Heart className="w-8 h-8 fill-current animate-pulse" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-800 mb-3 tracking-tight">
            It's Me!
          </h2>
          <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">
            Surprise! You found the secret path to my profile.
            Congratulations — and yes, I’m smiling because it’s you.
            If you want to get a little closer... click below.
          </p>
          
          <a 
            href="https://www.facebook.com/laabwbdallh.284039" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 w-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-medium py-3 px-5 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1"
          >
            <Facebook className="w-5 h-5" />
            <span className="text-sm md:text-base">Connect on Facebook</span>
            <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </a>

          <button 
            onClick={handleReset}
            className="mt-6 text-xs md:text-sm text-rose-400 hover:text-rose-600 transition-colors flex items-center justify-center gap-1 mx-auto"
          >
            <span>Play again?</span>
          </button>
        </motion.div>
      </Wrapper>
    );
  }

  // Render the progress cards (remains the same)
  const stepData = STEPS[currentStep];

  return (
    <Wrapper>
      <div className="relative w-full max-w-sm md:max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepData.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 text-center border border-white/60 min-h-[340px] flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-tr from-rose-100 to-pink-50 text-rose-400 rounded-2xl rotate-3 flex items-center justify-center mb-5 shadow-sm"
            >
              {stepData.icon}
            </motion.div>

            <h2 className="text-xl md:text-2xl font-serif font-medium text-slate-800 mb-3">
              {stepData.title}
            </h2>
            
            <p className="text-slate-600 text-sm md:text-base mb-8 leading-relaxed mx-auto">
              {stepData.text}
            </p>

            <button
              onClick={handleNext}
              className="relative group w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2 text-sm md:text-base">
                {stepData.buttonText}
              </span>
            </button>
            
            {/* Progress dots */}
            <div className="flex gap-2 mt-6">
              {STEPS.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentStep ? "w-6 bg-rose-400" : "w-1.5 bg-rose-100"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Wrapper>
  );
};