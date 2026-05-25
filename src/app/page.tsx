"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Calendar, Music, VolumeX, Heart, Navigation, ChevronDown } from 'lucide-react';

interface ScheduleItem {
  time: string;
  title: string;
  desc: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const [introState, setIntroState] = useState<'not-started' | 'playing' | 'ended'>('not-started');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [textStage, setTextStage] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const eventDate = "2026-08-06T08:00:00";
  const googleMapsUrl = "http://googleusercontent.com/maps.google.com/4";

  const schedule: ScheduleItem[] = [
    { time: "08:00 AM", title: "Welcome Speech", desc: "Welcoming our lovely guests" },
    { time: "08:30 AM", title: "Oil Lamp Lighting", desc: "Traditional auspicious commencement" },
    { time: "09:00 AM", title: "Tea Table", desc: "Morning refreshments and socializing" },
    { time: "10:00 AM", title: "Signing The Marriage Certificate", desc: "The official registration" },
    { time: "11:00 AM", title: "Ring Exchange", desc: "The magical moment of commitment" },
    { time: "12:00 PM", title: "Lunch", desc: "Grand celebratory buffet" },
    { time: "01:00 PM", title: "Thank You Speech", desc: "Expressing our gratitude" }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(eventDate) - +new Date();
      let timeLeftObj: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      if (difference > 0) {
        timeLeftObj = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(timeLeftObj);
    };
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (introState === 'playing') {
      const timer1 = setTimeout(() => setTextStage(1), 1500);
      const timer2 = setTimeout(() => setTextStage(2), 5000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [introState]);

  const startIntro = (): void => {
    setIntroState('playing');
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play().catch(err => console.log(err));
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(err => console.log(err));
      }
    }, 50);
  };

  const skipIntro = (): void => {
    setIntroState('ended');
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(err => console.log(err));
    }
  };

  const toggleMute = (): void => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f5] text-[#4a3b32] antialiased relative overflow-x-hidden selection:bg-[#6b1d2f]/10 px-4 sm:px-6 md:px-8" style={{ fontFamily: 'Georgia, serif' }}>
      
      {/* FALLING PETALS */}
      {isMounted && introState === 'ended' && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {[...Array(14)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rose-petal animate-petal"
              style={{
                left: `${(i * 8) % 100}%`,
                top: `-${10 + (i * 3)}px`,
                width: `${12 + (i % 3) * 4}px`,
                height: `${16 + (i % 3) * 4}px`,
                animationDuration: `${7 + (i % 4) * 2}s`,
                animationDelay: `${i * 0.4}s`,
                transform: `rotate(${i * 25}deg)`
              }}
            />
          ))}
        </div>
      )}

      <audio ref={audioRef} src="/bg-music.mp3" onEnded={skipIntro} />

      <AnimatePresence>
        {/* STAGE 1: INTRO CLICK CARD */}
        {introState === 'not-started' && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#140f0d] flex flex-col items-center justify-center p-4 text-center">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              onClick={startIntro}
              className="relative w-full max-w-sm sm:max-w-md aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl cursor-pointer"
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800')", filter: 'brightness(0.3)' }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-[#f4efe6]">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#d4af37] mb-2 font-sans">The Engagement Invitation</p>
                <h3 className="text-2xl sm:text-3xl font-light tracking-wide font-serif">Tharushi & Isuru</h3>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-sans mt-5 px-4 sm:px-5 py-2 border border-[#d4af37]/30 rounded-full bg-[#140f0d]/40 backdrop-blur-sm animate-pulse">Open Invitation</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 2: CINEMATIC INTRO VIDEO */}
        {introState === 'playing' && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
            <video ref={videoRef} src="/intro-video.mp4" className="absolute inset-0 w-full h-full object-cover opacity-50" muted playsInline loop />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
            <div className="relative z-10 text-center px-4 max-w-full text-[#f4efe6]">
              <AnimatePresence mode="wait">
                {textStage === 1 && (
                  <motion.h2 key="sinhala" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-widest text-[#d4af37]">ශ්‍රී සුභ මංගලම්</motion.h2>
                )}
                {textStage === 2 && (
                  <motion.div key="names" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 sm:space-y-3">
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-gray-300 font-sans">The Celebration of Love</p>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-wider px-2">Tharushi & Isuru</h1>
                    <div className="w-10 h-[1px] bg-[#d4af37]/50 mx-auto my-3" />
                    <p className="text-xs tracking-widest text-gray-400 font-sans">06 . 08 . 2026</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={skipIntro} className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/50 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">Skip Intro</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 3: MAIN WEBSITE INVITATION INTERFACE */}
      {introState === 'ended' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative w-full">
          
          {/* Floating Audio Control */}
          <button onClick={toggleMute} className="fixed bottom-5 right-5 z-50 p-2.5 sm:p-3 bg-white/90 backdrop-blur-md rounded-full shadow-md text-[#4a3b32] border border-gray-100 hover:scale-110 transition-transform">
            {isMuted ? <VolumeX size={16} /> : <Music size={16} className="animate-pulse" />}
          </button>

          {/* Luxury Mandala Corners (Hidden on extra small mobiles to reduce clutter) */}
          <div className="luxury-pattern-bg -top-32 -left-32 scale-75 sm:scale-100" />
          <div className="luxury-pattern-bg top-[45vh] -right-40 scale-75 sm:scale-100" />
          <div className="luxury-pattern-bg bottom-10 -left-32 scale-75 sm:scale-100" />

          {/* 1. HERO SECTION */}
          <section className="min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center text-center py-12 px-2 relative">
            <Heart className="text-[#6b1d2f]/40 mb-3 sm:mb-4 animate-pulse" size={20} />
            <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.4em] text-[#8a7365] font-sans mb-3 sm:mb-4">Engagement Invitation</p>
            <h2 className="text-4xl sm:text-7xl md:text-9xl tracking-wide text-[#3b2f27] font-light leading-tight sm:leading-none px-1">
              Tharushi <span className="text-xl sm:text-2xl font-sans text-[#a88974] block my-2 sm:my-0 sm:mx-6">&</span> Isuru
            </h2>
            <div className="w-12 sm:w-16 h-[1px] bg-[#d4af37] mx-auto my-6 sm:my-8" />
            <p className="text-sm sm:text-base font-light italic text-[#6e5d53] max-w-xs sm:max-w-md mx-auto leading-relaxed px-4">
              "Two paths crossing by the river edge, merging into one beautiful journey forever."
            </p>
            <div className="absolute bottom-6 sm:bottom-10 flex flex-col items-center text-[9px] uppercase tracking-[0.3em] text-[#8a7365] font-sans animate-bounce">
              <ChevronDown size={14} />
            </div>
          </section>

          {/* 2. THE HAPPY COUPLE DETAILS SECTION (MOBILE RE-ORDER OPTIMIZED) */}
          <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-[#fdfbf7]/60 to-transparent text-center border-t border-[#f4eae1]">
            <div className="max-w-5xl mx-auto">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#8a7365] block mb-2 font-sans">The Happy Couple</span>
              <h3 className="text-3xl sm:text-5xl font-light mb-1 text-[#3b2f27]">Tharushi & Isuru</h3>
              <p className="text-xl sm:text-2xl font-normal text-[#6b1d2f]/80 tracking-wide mb-10 sm:mb-14">තරුෂි & ඉසුරු</p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6">
                
                {/* Central Avatar (Pushed to TOP on Mobile for context flow) */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-white shadow-xl bg-[#faf4ee] flex items-center justify-center overflow-hidden relative p-4 order-1 md:order-2">
                  <img 
                    src="https://img.freepik.com/free-vector/cute-wedding-couple-avatar-character_23-2148646736.jpg" 
                    alt="Couple Avatar" 
                    className="w-full h-full object-contain opacity-80 filter brightness-[1.02]" 
                  />
                  <div className="absolute inset-0 border border-[#d4af37]/20 rounded-full" />
                </div>

                {/* Groom Column (Order 2 on Mobile) */}
                <div className="flex-1 text-center md:text-right space-y-1 sm:space-y-2 order-2 md:order-1 border-b md:border-b-0 pb-6 md:pb-0 w-full max-w-sm">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6b1d2f] font-semibold font-sans">The Groom | මනාලයා</span>
                  <h4 className="text-xl sm:text-2xl font-light text-[#3b2f27]">Isuru Rajapaksha</h4>
                  <p className="text-lg text-gray-600">ඉසුරු රාජපක්ෂ</p>
                  <div className="text-[11px] sm:text-xs text-gray-400 font-sans italic pt-1">
                    <p>Son of Mr. & Mrs. Rajapaksha</p>
                    <p className="not-italic mt-0.5 text-gray-500">රාජපක්ෂ මහතාගේ සහ මහත්මියගේ පුත්‍රණුවන්</p>
                  </div>
                </div>

                {/* Bride Column (Order 3 on Mobile) */}
                <div className="flex-1 text-center md:text-left space-y-1 sm:space-y-2 order-3 w-full max-w-sm pt-2 md:pt-0">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6b1d2f] font-semibold font-sans">The Bride | මනාලිය</span>
                  <h4 className="text-xl sm:text-2xl font-light text-[#3b2f27]">Tharushi Pathirana</h4>
                  <p className="text-lg text-gray-600">තරුෂි පතිරණ</p>
                  <div className="text-[11px] sm:text-xs text-gray-400 font-sans italic pt-1">
                    <p>Daughter of Mr. & Mrs. Pathirana</p>
                    <p className="not-italic mt-0.5 text-gray-500">පතිරණ මහතාගේ සහ මහත්මියගේ දියණිය</p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 3. INVITEMINT GEOMETRIC ARCH CARDS COUNTDOWN (SQUARE GRID RESPONSIVE) */}
          <section className="bg-gradient-to-b from-[#1e1916] to-[#120f0e] text-[#f4efe6] py-16 sm:py-24 px-4 text-center shadow-2xl relative border-y border-black/30">
            <div className="max-w-4xl mx-auto">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#d4af37] block mb-3 font-sans">The Final Countdown</span>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-wide mb-3">Until We Say <span className="text-[#6b1d2f] italic font-semibold">"I Do"</span></h3>
              <p className="text-xs sm:text-sm font-light text-gray-400 italic mb-10 sm:mb-14 max-w-xs sm:max-w-md mx-auto">"Time is standing still as we eagerly await the moment our forever begins."</p>
              
              {/* MOBILE SCALING: grid-cols-4 for extra tiny display support */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 max-w-md sm:max-w-2xl mx-auto font-sans">
                
                {/* Days */}
                <div className="bg-[#fcf8f2] text-[#4a3b32] pt-5 pb-4 sm:pt-8 sm:pb-6 px-1 rounded-t-[50px] sm:rounded-t-[100px] rounded-b-xl shadow-xl border border-[#d4af37]/20 flex flex-col justify-between items-center min-h-[100px] sm:min-h-[150px] md:min-h-[170px]">
                  <span className="text-xl sm:text-4xl md:text-5xl font-normal text-[#6b1d2f] tracking-tight">{timeLeft.days}</span>
                  <span className="text-[8px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 font-medium mt-2 sm:mt-4">Days</span>
                </div>

                {/* Hours */}
                <div className="bg-[#fcf8f2] text-[#4a3b32] pt-5 pb-4 sm:pt-8 sm:pb-6 px-1 rounded-t-[50px] sm:rounded-t-[100px] rounded-b-xl shadow-xl border border-[#d4af37]/20 flex flex-col justify-between items-center min-h-[100px] sm:min-h-[150px] md:min-h-[170px]">
                  <span className="text-xl sm:text-4xl md:text-5xl font-normal text-[#6b1d2f] tracking-tight">{timeLeft.hours}</span>
                  <span className="text-[8px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 font-medium mt-2 sm:mt-4">Hours</span>
                </div>

                {/* Minutes */}
                <div className="bg-[#fcf8f2] text-[#4a3b32] pt-5 pb-4 sm:pt-8 sm:pb-6 px-1 rounded-t-[50px] sm:rounded-t-[100px] rounded-b-xl shadow-xl border border-[#d4af37]/20 flex flex-col justify-between items-center min-h-[100px] sm:min-h-[150px] md:min-h-[170px]">
                  <span className="text-xl sm:text-4xl md:text-5xl font-normal text-[#6b1d2f] tracking-tight">{timeLeft.minutes}</span>
                  <span className="text-[8px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 font-medium mt-2 sm:mt-4">Mins</span>
                </div>

                {/* Seconds */}
                <div className="bg-[#fcf8f2] text-[#4a3b32] pt-5 pb-4 sm:pt-8 sm:pb-6 px-1 rounded-t-[50px] sm:rounded-t-[100px] rounded-b-xl shadow-xl border border-[#d4af37]/20 flex flex-col justify-between items-center min-h-[100px] sm:min-h-[150px] md:min-h-[170px]">
                  <span className="text-xl sm:text-4xl md:text-5xl font-normal text-[#6b1d2f] tracking-tight">{timeLeft.seconds}</span>
                  <span className="text-[8px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 font-medium mt-2 sm:mt-4">Secs</span>
                </div>

              </div>
            </div>
          </section>

          {/* 4. KEY DETAILS GRID (1 COLUMN ON MOBILE, 3 COLS ON DESKTOP) */}
          <section className="max-w-5xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 text-center relative z-10">
            <div className="flex flex-col items-center p-6 sm:p-8 bg-white border border-[#f4eae1] rounded-2xl sm:rounded-3xl shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#faf4ee] flex items-center justify-center text-[#6b1d2f] mb-4 sm:mb-6"><Calendar size={18} /></div>
              <h4 className="text-lg sm:text-xl font-normal mb-1 sm:mb-2 text-[#3b2f27]">When</h4>
              <p className="text-xs sm:text-sm font-sans text-gray-500">Thursday, 06 August 2026</p>
            </div>

            <div className="flex flex-col items-center p-6 sm:p-8 bg-white border border-[#f4eae1] rounded-2xl sm:rounded-3xl shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#faf4ee] flex items-center justify-center text-[#6b1d2f] mb-4 sm:mb-6"><Clock size={18} /></div>
              <h4 className="text-lg sm:text-xl font-normal mb-1 sm:mb-2 text-[#3b2f27]">Time</h4>
              <p className="text-xs sm:text-sm font-sans text-gray-500">08:00 AM – 01:00 PM</p>
            </div>

            <div className="flex flex-col items-center p-6 sm:p-8 bg-white border border-[#f4eae1] rounded-2xl sm:rounded-3xl shadow-sm w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#faf4ee] flex items-center justify-center text-[#6b1d2f] mb-4 sm:mb-6"><MapPin size={18} /></div>
              <h4 className="text-lg sm:text-xl font-normal mb-1 sm:mb-2 text-[#3b2f27]">Where</h4>
              <p className="text-base text-[#3b2f27] font-semibold">Doola River Edge</p>
              <p className="text-xs font-sans text-gray-400 mt-1 max-w-[200px]">Walawegama Road, Udawalawa</p>
              
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#6b1d2f] text-white font-sans text-[11px] uppercase tracking-widest hover:bg-[#80243a] transition-all rounded-full shadow-md w-full sm:w-auto justify-center"
              >
                <Navigation size={12} />
                Navigate Venue
              </a>
            </div>
          </section>

          {/* 5. SCHEDULE ITINERARY TIMELINE (MOBILE MARGIN BALANCED) */}
          <section className="bg-[#faf5ef] py-20 sm:py-28 border-t border-[#f4eae1]">
            <div className="max-w-3xl mx-auto px-4">
              <h3 className="text-2xl sm:text-3xl text-center font-light mb-16 sm:mb-24 tracking-wider text-[#3b2f27]">Event Itinerary</h3>
              
              {/* Mobile Layout shift: ml-2 to save horizontal container spacing */}
              <div className="relative border-l border-[#dcd1c4] ml-2 md:ml-40 space-y-12 sm:space-y-16">
                {schedule.map((item, index) => (
                  <div key={index} className="relative pl-6 sm:pl-10 group">
                    <div className="absolute -left-[6px] sm:??? top-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#faf5ef] border border-[#a88974] group-hover:bg-[#6b1d2f] group-hover:border-[#6b1d2f] transition-all duration-300" />
                    
                    {/* MD responsive left absolute floating setup */}
                    <div className="md:absolute md:-left-44 md:top-0.5 md:w-32 md:text-right font-sans text-[10px] sm:text-xs text-[#a88974] font-semibold uppercase tracking-widest mb-1 md:mb-0">
                      {item.time}
                    </div>

                    <h5 className="text-xl sm:text-2xl text-[#3b2f27] font-light group-hover:text-[#6b1d2f] transition-colors">{item.title}</h5>
                    <p className="text-xs sm:text-sm font-light text-gray-500 mt-1 max-w-xl font-sans leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. FOOTER */}
          <footer className="bg-[#120f0e] text-[#f4efe6] py-16 sm:py-24 text-center px-4 border-t border-black/20">
            <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.5em] text-[#d4af37] mb-3 font-sans">We Await Your Presence</p>
            <p className="text-xs sm:text-sm font-light italic text-gray-400 max-w-xs sm:max-w-sm mx-auto mb-10 leading-relaxed">
              "Your blessings and presence on our special day would mean the world to us."
            </p>
            <div className="text-[8px] sm:text-[9px] tracking-[0.3em] text-gray-600 uppercase font-sans border-t border-white/5 pt-6 max-w-xs mx-auto">
              Tharushi & Isuru — 2026
            </div>
          </footer>

        </motion.div>
      )}
    </div>
  );
}