import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import useSound from 'use-sound';
import {
  Heart,
  Cake,
  Camera,
  Music,
  Stars,
  Gift,
  Calendar,
  Clock,
  PlayCircle,
  PauseCircle,
  ChevronLeft,
  ChevronRight,
  Quote,
  MessageCircle,
  Image as ImageIcon,
} from 'lucide-react';
import 'react-photo-view/dist/react-photo-view.css';

// You can replace this with your actual birthday song URL
const BIRTHDAY_SONG_URL = 'hbd.mp3';

const memories = [
  {
    id: 1,
    image: "/public/FirstDate.jpg",
    title: 'Our First Date',
    date: 'March 24, 2024',
    description: 'Remember that magical evening at the Bong Pizza?',
  },
  {
    id: 2,
    image: "/public/BargaBhima.jpg",
    title: 'A day in Bargavima Temple with you...!',
    date: 'April 13, 2024',
    description: 'May be this Spiritual place give us some Lovely Spirit...!',
  },
  {
    id: 3,
    image: "/public/FistInYourHome.jpg",
    title: 'The Memorible Subho Noboborsho...!',
    date: 'April 14, 2024',
    description: 'Actually Memorible for me Because of Your Mom and Your Didi..!',
  },
  {
    id: 4,
    image: "/public/P.jpg",
    title: 'Our Firstime Pandel Hoping at Panchami',
    date: 'October 8, 2024',
    description: 'By Feeling your Enjoyment and Tiredness it Was the One of the best Caring Day from me. ',
  },
  {
    id: 5,
    image: "/public/S.png",
    title: 'Our Fighting Saptami Night',
    date: 'October 10, 2024',
    description: 'Too Much Fighting and Ignoring from Me for I don\'t know why..?'
  },
  {
    id: 6,
    image: "/public/A.jpg",
    title: 'May be Our Best Ashtami Day',
    date: 'October 11, 2024',
    description: 'Do you Remember the Fear in from of My Mom..!?',
  },
  {
    id: 7,
    image: "/public/D.jpg",
    title: 'Our Delightfull Dewali',
    date: 'November 5, 2024',
    description: 'As per My Memory It was something Painfull from you and Enjoyfull from me!?',
  },
  {
    id: 8,
    image: "/public/C.jpg",
    title: 'Enjoying Our First Concert',
    date: 'November 5, 2024',
    description: 'Another Special moment for Us because of Raj Barman',
  },
  {
    id: 9,
    image: "/public/E.jpg",
    title: 'One Sweet Evening',
    date: 'November 9, 2024',
    description: 'Uff Nothing to Say Just feel this..!',
  },
  {
    id: 10,
    image: "/public/H.jpg",
    title: 'The Warmness of Hug from You',
    date: 'November 9, 2024',
    description: 'I felt this warmth in your face and you smiled back..!',
  },
  {
    id: 11,
    image: "/public/SL.png",
    title: 'My Soft Pillow',
    date: 'October 8, 2024',
    description: 'My Soft Pillow is one of the best things I have ever received.',
  },
  {
    id: 12,
    image: "/public/L.jpg",
    title: 'Last Pic of The Year',
    date: 'November 13, 2024',
    description: 'Left home and you to The Silicon Velly for A Great Future for You and our next Generation.',
  },
];

const messages = [
  {
    id: 1,
    message: "You're not just my girlfriend, you're my best friend and soulmate.",
    author: "Your Frined",
  },
  {
    id: 2,
    message: "Your smile is literally the cutest thing I've ever seen in my life.",

    author: "Your Lover",
  },
  {
    id: 3,
    message: "There are only two times that I want to be with you: Now and Forever.",
    author: "Your Hubby",
  },
];

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center p-4 bg-pink-100 rounded-lg">
          <div className="text-3xl font-bold text-pink-600">{value}</div>
          <div className="text-sm text-pink-500 capitalize">{unit}</div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(BIRTHDAY_SONG_URL);

  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % memories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + memories.length) % memories.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Heart className="w-16 h-16 text-pink-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Music Player */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          {isPlaying ? (
            <PauseCircle className="w-8 h-8 text-pink-500" />
          ) : (
            <PlayCircle className="w-8 h-8 text-pink-500" />
          )}
        </button>
      </div>

      {/* Hero Section */}
      <header
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute inset-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img
            src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1950&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={heroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center px-4"
        >
          <Heart className="w-16 h-16 text-pink-400 mx-auto mb-6 animate-bounce" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Happy Birthday, Sonu ❤️ !
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            To the most amazing person who makes every day special...
          </p>
        </motion.div>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-8"
        >
          <Stars className="w-8 h-8 text-white" />
        </motion.div>
      </header>

      {/* Countdown Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Clock className="w-12 h-12 text-pink-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Counting Down to Your Special Day
          </h2>
          <CountdownTimer targetDate={new Date('2025-01-17')} />
        </div>
      </section>

      {/* Message Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <Cake className="w-12 h-12 text-pink-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            My Dearest Birthday Girl
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Another year around the sun with you by my side has been nothing short of magical. 
              Your smile brightens my darkest days, and your love makes my heart skip a beat.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Today is all about celebrating you - the most wonderful, caring, and beautiful person 
              I know. Thank you for being you, and for sharing your life with me.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Camera className="w-12 h-12 text-pink-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our Beautiful Moments
            </h2>
          </div>
          
          <PhotoProvider>
            <div className="relative">
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-pink-500" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-pink-500" />
              </button>
              
              <div className="overflow-hidden">
                <motion.div
                  animate={{ x: -currentSlide * 100 + '%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex"
                >
                  {memories.map((memory, index) => (
                    <div key={memory.id} className="w-full flex-shrink-0 px-4">
                      <PhotoView src={memory.image}>
                        <div className="relative group cursor-pointer">
                          <img
                            src={memory.image}
                            alt={memory.title}
                            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                            <div className="text-white text-center p-4">
                              <h3 className="text-2xl font-bold mb-2">{memory.title}</h3>
                              <p className="text-sm mb-2">{memory.date}</p>
                              <p>{memory.description}</p>
                            </div>
                          </div>
                        </div>
                      </PhotoView>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </PhotoProvider>

          <div className="flex justify-center mt-4 space-x-2">
            {memories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-pink-500' : 'bg-pink-200'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Love Messages Section */}
      <section className="py-20 px-4 bg-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <MessageCircle className="w-12 h-12 text-pink-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Love Messages
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <Quote className="w-8 h-8 text-pink-400 mx-auto mb-4" />
                <p className="text-gray-700 mb-4">{message.message}</p>
                <p className="text-pink-500 font-medium">- {message.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Memories Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <ImageIcon className="w-12 h-12 text-pink-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Photo Memories
            </h2>
          </div>
          <PhotoProvider>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {memories.map((memory) => (
                <PhotoView key={memory.id} src={memory.image}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative group cursor-pointer"
                  >
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <h3 className="text-lg font-bold">{memory.title}</h3>
                        <p className="text-sm">{memory.date}</p>
                      </div>
                    </div>
                  </motion.div>
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        </div>
      </section>

      {/* Wishes Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <Gift className="w-12 h-12 text-pink-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Birthday Wishes
          </h2>
          <div className="space-y-6">
            {[
              "May your day be filled with joy, laughter, and all the love you deserve.",
              "Here's to another year of creating beautiful memories together.",
              "I love you more with each passing day. Happy Birthday, my love!"
            ].map((wish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <p className="text-lg text-gray-700">{wish}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-pink-500 text-white text-center">
        <Music className="w-8 h-8 mx-auto mb-4" />
        <p className="text-lg">Made with ❤️ for you</p>
        <p className="text-sm mt-2">Forever and Always</p>
      </footer>
    </div>
  );
}

export default App;