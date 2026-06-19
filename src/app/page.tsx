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

  const eventDate = "2026-08-03T08:00:00";
  const googleMapsUrl = "https://maps.google.com/?q=Doola+River+Edge+Udawalawa";

  const schedule: ScheduleItem[] = [
    { time: "08:00 AM", title: "Welcome Speech", desc: "Welcoming our lovely guests" },
    { time: "08:30 AM", title: "Oil Lamp Lighting", desc: "Traditional auspicious commencement" },
    { time: "09:00 AM", title: "Tea Table", desc: "Morning refreshments and socializing" },
    { time: "11:06 AM", title: "Signing The Marriage Certificate", desc: "The official registration" },
    { time: "11:21 AM", title: "Ring Exchange", desc: "The magical moment of commitment" },
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
      setTextStage(1);
      const timer2 = setTimeout(() => setTextStage(2), 10000);
      const timer3 = setTimeout(() => setTextStage(3), 22000);
      const timer4 = setTimeout(() => setTextStage(4), 35000);
      const timer5 = setTimeout(() => setTextStage(5), 48000);
      
      return () => {
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
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
    <div className="min-h-screen bg-[#fdfaf4] text-[#4a3b32] antialiased relative overflow-x-hidden selection:bg-[#6b1d2f]/10 px-4 sm:px-6 md:px-8" style={{ fontFamily: 'Georgia, serif' }}>
      
      {/* FALLING PETALS */}
      {isMounted && introState === 'ended' && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {[...Array(16)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rose-petal animate-petal"
              style={{
                left: `${(i * 7.5) % 100}%`,
                top: `-${10 + (i * 3)}px`,
                width: `${12 + (i % 3) * 4}px`,
                height: `${16 + (i % 3) * 4}px`,
                animationDuration: `${8 + (i % 4) * 2}s`,
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

        {/* STAGE 2: STORYTELLING 55S INTRO SCREEN */}
        {introState === 'playing' && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
            <video ref={videoRef} src="/intro-video.mp4" className="absolute inset-0 w-full h-full object-cover opacity-50" muted playsInline loop />
            <div className="absolute inset-0 bg-black/40"></div>
            
            <div className="relative z-10 text-center px-6 max-w-2xl text-[#f4efe6] w-full">
              <AnimatePresence mode="wait">
                {textStage === 1 && (
                  <motion.h2 key="stage1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 1 }} className="text-4xl sm:text-6xl font-bold tracking-widest text-[#d4af37] drop-shadow-md">
                    ශ්‍රී සුභ මංගලම්
                  </motion.h2>
                )}
                {textStage === 2 && (
                  <motion.div key="stage2" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="space-y-4">
                    <Heart className="text-[#d4af37] mx-auto fill-[#d4af37]/10" size={24} />
                    <p className="text-xl sm:text-2xl font-light italic leading-relaxed text-gray-200">
                      "A celebration of two souls destined to walk together in love, laughter, and harmony."
                    </p>
                    <p className="text-sm font-light text-[#d4af37]/80">දිවි ගමනේ නව ඇරඹුමකට ආශිර්වාදයක් වන්න...</p>
                  </motion.div>
                )}
                {textStage === 3 && (
                  <motion.div key="stage3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 1 }} className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.4em] text-gray-400 font-sans">Where nature bears witness</p>
                    <p className="text-xl sm:text-2xl font-light leading-relaxed text-gray-200">
                      "By the gentle flowing currents of the Doola river edge, a beautiful forever begins today."
                    </p>
                  </motion.div>
                )}
                {textStage === 4 && (
                  <motion.div key="stage4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="space-y-3">
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#d4af37] font-sans">The Engagement Celebration Of</p>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-wider px-2 font-serif">Tharushi & Isuru</h1>
                    <div className="w-12 h-[1px] bg-[#d4af37]/60 mx-auto my-4" />
                    <p className="text-lg text-gray-300 font-normal">තරුෂි සහ ඉසුරු</p>
                  </motion.div>
                )}
                {textStage === 5 && (
                  <motion.div key="stage5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-sans">Save the Date</p>
                    <h2 className="text-3xl sm:text-5xl font-light text-[#d4af37] tracking-widest font-sans">03 . 08 . 2026</h2>
                    <p className="text-xs italic text-gray-400 mt-4 animate-pulse">Loading Invitation Details...</p>
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

          {/* Luxury Decorative Background Mandala Corners */}
          <div className="luxury-pattern-bg -top-32 -left-32 scale-75 sm:scale-100" />
          <div className="luxury-pattern-bg top-[45vh] -right-40 scale-75 sm:scale-100" />
          <div className="luxury-pattern-bg bottom-10 -left-32 scale-75 sm:scale-100" />

          {/* 1. HERO SECTION WITH DECORATIVE FRAMES */}
          <section className="min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center text-center py-20 px-4 relative">
            {/* Elegant Inner Top Border Ornament */}
            <div className="absolute top-10 left-10 right-10 hidden md:flex items-center justify-between opacity-40">
              <div className="w-4 h-4 border border-[#d4af37] rotate-45"></div>
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent flex-1 mx-4"></div>
              <div className="w-4 h-4 border border-[#d4af37] rotate-45"></div>
            </div>

            <Heart className="text-[#6b1d2f]/50 mb-4 animate-pulse" size={24} />
            <p className="text-[10px] sm:text-[12px] uppercase tracking-[0.6em] text-[#a1887f] font-sans mb-4">Engagement Invitation</p>
            
            {/* Elegant Serif Font Layout */}
            <h2 className="text-5xl sm:text-7xl md:text-9xl tracking-wide text-[#3b2f27] font-light leading-tight sm:leading-none px-2 font-serif my-4">
              Tharushi <span className="text-xl sm:text-2xl font-sans text-[#c49a88] block my-2 sm:my-0 sm:mx-6">&</span> Isuru
            </h2>
            
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="w-8 h-[1px] bg-[#d4af37]/60" />
              <div className="w-2 h-2 bg-[#d4af37] rotate-45" />
              <div className="w-8 h-[1px] bg-[#d4af37]/60" />
            </div>

            <p className="text-sm sm:text-base font-light italic text-[#6e5d53] max-w-xs sm:max-w-md mx-auto leading-relaxed px-4 tracking-wide">
              "Two paths crossing by the river edge, merging into one beautiful journey forever."
            </p>

            {/* Custom Poruwa/Arch Hanging String Scroll Down Ornament */}
            <div className="absolute bottom-6 sm:bottom-10 flex flex-col items-center">
              <div className="w-[1px] h-12 bg-gradient-to-b from-[#d4af37] to-transparent mb-1" />
              <div className="text-[9px] uppercase tracking-[0.4em] text-[#8a7365] font-sans flex flex-col items-center gap-1 animate-bounce">
                <span>Scroll</span>
                <ChevronDown size={12} className="text-[#d4af37]" />
              </div>
            </div>
          </section>

          {/* 2. THE HAPPY COUPLE DETAILS SECTION */}
          <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-transparent via-[#fdfaf4] to-transparent text-center border-t border-[#f4eae1]">
            <div className="max-w-5xl mx-auto">
              
              {/* Ornate Header Accent */}
              <div className="flex flex-col items-center mb-8">
                <span className="text-[10px] uppercase tracking-[0.5em] text-[#8a7365] block mb-2 font-sans">The Happy Couple</span>
                <div className="w-6 h-[1px] bg-[#d4af37] mb-2" />
                <h3 className="text-3xl sm:text-5xl font-light text-[#3b2f27] font-serif">Tharushi & Isuru</h3>
                <p className="text-xl sm:text-2xl font-normal text-[#6b1d2f]/80 tracking-widest mt-1">තරුෂි & ඉසුරු</p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 mt-12">
                
                {/* Groom Column */}
                <div className="flex-1 text-center md:text-right space-y-1 sm:space-y-2 order-2 md:order-1 border-b md:border-b-0 pb-8 md:pb-0 w-full max-w-sm">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6b1d2f] font-semibold font-sans border-b border-[#6b1d2f]/20 pb-0.5">The Groom | මනාලයා</span>
                  <h4 className="text-2xl font-light text-[#3b2f27] font-serif pt-2">Isuru Rajapaksha</h4>
                  <p className="text-lg text-gray-500 font-sans">ඉසුරු රාජපක්ෂ</p>
                  <div className="text-[11px] sm:text-xs text-gray-400 font-sans italic pt-2 leading-relaxed">
                    <p className="text-gray-500 font-medium">Son of Mr. & Mrs. Rajapaksha</p>
                    <p className="not-italic mt-0.5 text-gray-400">රාජපක්ෂ මහතාගේ සහ මහත්මියගේ පුත්‍රණුවන්</p>
                  </div>
                </div>

                {/* Central Masked Circular Avatar Frame */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-[#d4af37]/40 shadow-[0_10px_30px_rgba(107,29,47,0.08)] bg-[#faf4ee] relative order-1 md:order-2 overflow-hidden flex items-center justify-center p-1.5 bg-gradient-to-tr from-[#d4af37]/40 to-transparent">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img 
                      src="/image.jpg" 
                      alt="Couple Avatar" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                </div>

                {/* Bride Column */}
                <div className="flex-1 text-center md:text-left space-y-1 sm:space-y-2 order-3 w-full max-w-sm pt-4 md:pt-0">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#6b1d2f] font-semibold font-sans border-b border-[#6b1d2f]/20 pb-0.5">The Bride | මනාලිය</span>
                  <h4 className="text-2xl font-light text-[#3b2f27] font-serif pt-2">Tharushi Pathirana</h4>
                  <p className="text-lg text-gray-500 font-sans">තරුෂි පතිරණ</p>
                  <div className="text-[11px] sm:text-xs text-gray-400 font-sans italic pt-2 leading-relaxed">
                    <p className="text-gray-500 font-medium">Daughter of Mr. & Mrs. Pathirana</p>
                    <p className="not-italic mt-0.5 text-gray-400">පතිරණ මහතාගේ සහ මහත්මියගේ දියණිය</p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 3. INVITEMINT GEOMETRIC ARCH CARDS COUNTDOWN WITH GOLD GLOW */}
          <section className="bg-gradient-to-b from-[#1c1815] to-[#0f0c0a] text-[#f4efe6] py-20 sm:py-28 px-4 text-center shadow-2xl relative border-y border-[#d4af37]/20">
            {/* Elegant background glow ornament */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(107,29,47,0.15)_0%,transparent_60%)] pointer-events-none" />
            
            <div className="max-w-4xl mx-auto relative z-10">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-[#d4af37] block mb-3 font-sans">The Final Countdown</span>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-wide mb-3 font-serif">Until We Say <span className="text-[#d4af37] italic font-semibold">"I Do"</span></h3>
              <div className="w-12 h-[1px] bg-white/20 mx-auto mb-6" />
              <p className="text-xs sm:text-sm font-light text-gray-400 italic mb-12 max-w-xs sm:max-w-md mx-auto">"Time is standing still as we eagerly await the moment our forever begins."</p>
              
              <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 max-w-md sm:max-w-2xl mx-auto font-sans">
                
                {/* Days */}
                <div className="bg-[#fffdf9] text-[#4a3b32] pt-6 pb-4 sm:pt-8 sm:pb-6 px-1 rounded-t-[55px] sm:rounded-t-[100px] rounded-b-2xl shadow-[0_15px_35px_rgba(0,0,0,0.3),0_0_15px_rgba(212,175,55,0.1)] border border-[#d4af37]/30 flex flex-col justify-between items-center min-h-[110px] sm:min-h-[160px] md:min-h-[180px]">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-light text-[#6b1d2f] tracking-tight">{timeLeft.days}</span>
                  <span className="text-[8px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mt-2">Days</span>
                </div>

                {/* Hours */}
                <div className="bg-[#fffdf9] text-[#4a3b32] pt-6 pb-4 sm:pt-8 sm:pb-6 px-1 rounded-t-[55px] sm:rounded-t-[100px] rounded-b-2xl shadow-[0_15px_35px_rgba(0,0,0,0.3),0_0_15px_rgba(212,175,55,0.1)] border border-[#d4af37]/30 flex flex-col justify-between items-center min-h-[110px] sm:min-h-[160px] md:min-h-[180px]">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-light text-[#6b1d2f] tracking-tight">{timeLeft.hours}</span>
                  <span className="text-[8px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mt-2">Hours</span>
                </div>

                {/* Minutes */}
                <div className="bg-[#fffdf9] text-[#4a3b32] pt-6 pb-4 sm:pt-8 sm:pb-6 px-1 rounded-t-[55px] sm:rounded-t-[100px] rounded-b-2xl shadow-[0_15px_35px_rgba(0,0,0,0.3),0_0_15px_rgba(212,175,55,0.1)] border border-[#d4af37]/30 flex flex-col justify-between items-center min-h-[110px] sm:min-h-[160px] md:min-h-[180px]">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-light text-[#6b1d2f] tracking-tight">{timeLeft.minutes}</span>
                  <span className="text-[8px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mt-2">Mins</span>
                </div>

                {/* Seconds */}
                <div className="bg-[#fffdf9] text-[#4a3b32] pt-6 pb-4 sm:pt-8 sm:pb-6 px-1 rounded-t-[55px] sm:rounded-t-[100px] rounded-b-2xl shadow-[0_15px_35px_rgba(0,0,0,0.3),0_0_15px_rgba(212,175,55,0.1)] border border-[#d4af37]/30 flex flex-col justify-between items-center min-h-[110px] sm:min-h-[160px] md:min-h-[180px]">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-light text-[#6b1d2f] tracking-tight">{timeLeft.seconds}</span>
                  <span className="text-[8px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mt-2">Secs</span>
                </div>

              </div>
            </div>
          </section>

          {/* 4. KEY DETAILS CARDS WITH ELEGANT SHADOWS */}
          <section className="max-w-5xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
            <div className="flex flex-col items-center p-8 bg-[#fffdfa] border border-[#f4eae1] rounded-3xl shadow-[0_10px_25px_rgba(74,59,50,0.03)] hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#faf4ee] flex items-center justify-center text-[#6b1d2f] mb-6 shadow-inner"><Calendar size={20} className="stroke-[1.5]" /></div>
              <h4 className="text-lg sm:text-xl font-normal mb-2 text-[#3b2f27] font-serif">When</h4>
              <p className="text-xs sm:text-sm font-sans text-gray-500 tracking-wide font-medium">Monday, 03 August 2026</p>
            </div>

            <div className="flex flex-col items-center p-8 bg-[#fffdfa] border border-[#f4eae1] rounded-3xl shadow-[0_10px_25px_rgba(74,59,50,0.03)] hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#faf4ee] flex items-center justify-center text-[#6b1d2f] mb-6 shadow-inner"><Clock size={20} className="stroke-[1.5]" /></div>
              <h4 className="text-lg sm:text-xl font-normal mb-2 text-[#3b2f27] font-serif">Time</h4>
              <p className="text-xs sm:text-sm font-sans text-gray-500 tracking-wide font-medium">08:00 AM – 01:00 PM</p>
            </div>

            <div className="flex flex-col items-center p-8 bg-[#fffdfa] border border-[#f4eae1] rounded-3xl shadow-[0_10px_25px_rgba(74,59,50,0.03)] hover:shadow-md transition-all duration-300 w-full">
              <div className="w-12 h-12 rounded-full bg-[#faf4ee] flex items-center justify-center text-[#6b1d2f] mb-6 shadow-inner"><MapPin size={20} className="stroke-[1.5]" /></div>
              <h4 className="text-lg sm:text-xl font-normal mb-1 text-[#3b2f27] font-serif">Where</h4>
              <p className="text-base text-[#3b2f27] font-semibold tracking-wide">Doola River Edge</p>
              <p className="text-xs font-sans text-gray-400 mt-1 max-w-[200px] leading-relaxed">Walawegama Road, Udawalawa</p>
              
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 bg-[#3b2f27] text-white font-sans text-[11px] uppercase tracking-widest hover:bg-[#6b1d2f] transition-all rounded-full shadow-md w-full sm:w-auto justify-center"
              >
                <Navigation size={12} />
                Navigate Venue
              </a>
            </div>
          </section>

          {/* 5. SCHEDULE ITINERARY TIMELINE WITH ORNATE LINE DESIGN */}
          <section className="bg-[#faf5ef] py-24 sm:py-28 border-t border-[#f4eae1] relative">
            <div className="max-w-3xl mx-auto px-4">
              <h3 className="text-3xl text-center font-light mb-20 sm:mb-24 tracking-wider text-[#3b2f27] font-serif">Event Itinerary</h3>
              
              {/* Central Line adjustments for premium look */}
              <div className="relative border-l-2 border-[#e6dcd0] ml-3 md:ml-40 space-y-14 sm:space-y-16">
                {schedule.map((item, index) => (
                  <div key={index} className="relative pl-8 sm:pl-10 group">
                    {/* Ring indicator bullet */}
                    <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#faf5ef] border-2 border-[#c49a88] group-hover:bg-[#6b1d2f] group-hover:border-[#6b1d2f] group-hover:scale-110 transition-all duration-300" />
                    
                    {/* Floating Left Time Text */}
                    <div className="md:absolute md:-left-44 md:top-0.5 md:w-32 md:text-right font-sans text-[10px] sm:text-xs text-[#a88974] font-semibold uppercase tracking-widest mb-1.5 md:mb-0">
                      {item.time}
                    </div>

                    <h5 className="text-xl sm:text-2xl text-[#3b2f27] font-light font-serif group-hover:text-[#6b1d2f] transition-colors">{item.title}</h5>
                    <p className="text-xs sm:text-sm font-light text-gray-500 mt-1 max-w-xl font-sans leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. RSVP CELEBRATION FOOTER WITH TRADITIONAL FRAME */}
          <footer className="bg-[#14110f] text-[#f4efe6] py-24 text-center px-4 border-t border-black/30 relative">
            <div className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
            <Heart className="text-[#d4af37]/30 fill-transparent mx-auto mb-6 stroke-[1]" size={26} />
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#d4af37] mb-4 font-sans">We Await Your Presence</p>
            <p className="text-xs sm:text-sm font-light italic text-gray-400 max-w-xs sm:max-w-sm mx-auto mb-12 leading-relaxed">
              "Your blessings and presence on our special day would mean the world to us as we step into this beautiful journey together."
            </p>
            <div className="text-[8px] sm:text-[9px] tracking-[0.4em] text-gray-600 uppercase font-sans border-t border-white/5 pt-6 max-w-xs mx-auto">
              Tharushi & Isuru — 2026
            </div>
          </footer>

        </motion.div>
      )}
    </div>
  );
}