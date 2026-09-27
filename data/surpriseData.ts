// ==========================================
// JII'S BIRTHDAY SURPRISE GALA DATA
// ==========================================

export interface BirthdayStoryMemory {
  id: string;
  image: string;       // Path under public/images
  title: string;       // Story headline
  caption: string;     // Story heartfelt description
  date: string;        // Badge tag
  sticker: string;     // Emoji badge
}

export interface BirthdayBalloon {
  id: number;
  color: string;       // Tailwind gradient
  textColor: string;
  label: string;
  reward: string;
  compliment: string;
}

export interface BirthdayVaultGift {
  id: number;
  title: string;
  sub: string;
  message: string;
  giftType: "warranty" | "photo" | "tribute" | "video";
  image?: string;
  video?: string;
}

export const surpriseData = {
  // Recipient Personal Info
  recipientName: "Disha",
  nickname: "Jii 🤍🧿",
  senderName: "Your Brother",

  // Screen 1: VIP Birthday Pass
  vipPass: {
    badge: "OFFICIAL VIP BIRTHDAY INVITATION",
    title: "All-Access Birthday Gala Pass 🎟️",
    ticketNumber: "JII-BDAY-2026-INFINITE",
    guestOfHonor: "Disha (Jii 🤍🧿)",
    perks: [
      "✨ Queen of the Day Status",
      "🍫 Unconditional Lifetime Snack Supply",
      "🛡️ 24/7 Brotherly Protection Pass",
      "🤫 Zero Sibling Complaints (Strictly Today 😂)"
    ],
    buttonPrompt: "Tap to Validate VIP Ticket ✨",
  },

  // Screen 2: Interactive Balloon Pop Arcade
  balloonPopGame: {
    title: "Pop The Birthday Balloons! 🎈",
    subtitle: "Tap every floating balloon to claim your sisterhood awards!",
    balloons: [
      {
        id: 1,
        color: "from-pink-500 via-rose-500 to-pink-600",
        textColor: "text-pink-100",
        label: "👑 Queen of the Day",
        reward: "Crown Unlocked: Most Fabulous Sister in the Universe!",
        compliment: "Style, grace, and aura: 1000/10! 💅"
      },
      {
        id: 2,
        color: "from-amber-400 via-yellow-500 to-orange-500",
        textColor: "text-amber-100",
        label: "🍫 Infinite Snacks",
        reward: "Free snack pass: Brother buys whatever you crave!",
        compliment: "Even though I steal your food, you're the best! 😂"
      },
      {
        id: 3,
        color: "from-purple-500 via-violet-600 to-indigo-600",
        textColor: "text-purple-100",
        label: "💡 Chief Life Advisor",
        reward: "Guaranteed to listen to your advice (at least 75% of the time 😉)",
        compliment: "Thank you for always guiding me when I am lost."
      },
      {
        id: 4,
        color: "from-emerald-400 via-teal-500 to-cyan-600",
        textColor: "text-emerald-100",
        label: "💖 Forever 18",
        reward: "Permanent youth pass: Ageless, radiant, and unstoppable!",
        compliment: "May your heart always remain this joyful and vibrant."
      },
      {
        id: 5,
        color: "from-fuchsia-500 via-rose-500 to-amber-400",
        textColor: "text-yellow-100",
        label: "🌟 Ultimate Sister",
        reward: "Grand Sibling Superpower: Infinite love & bond!",
        compliment: "More than family — my truest anchor in life. 🤍🧿"
      }
    ] as BirthdayBalloon[],
    grandBalloon: {
      label: "🎂 GRAND BIRTHDAY BALLOON",
      prompt: "Pop for the Grand Midnight Ceremony! 🎈✨"
    }
  },

  // Screen 3: Midnight Birthday Cake & Wish Ceremony
  birthdayCake: {
    heading: "The Midnight Birthday Wish 🎂",
    subheading: "Close your eyes, make your deepest wish, and blow out the candle...",
    blowButtonText: "Blow Out The Candle 🎂💨",
    wishGrantedText: "🎉 Your wish is locked in the stars! Happy Birthday Jii 🤍🧿! ✨"
  },

  // Screen 4: Starlight Greeting Reveal
  greetingReveal: {
    heading: "Happy Birthday, Jii 🤍🧿 🎂✨",
    introText: "To the most special, loving, and extraordinary sister in the entire world...",
    subText: "(Tap anywhere to step into your Birthday Starlight Carousel ✨)"
  },

  // Gift Box fallback
  giftBox: {
    initialPrompt: "You have a birthday parcel! Tap to unbox it. 🎁",
    openedText: "It's not just a gift...",
    subText: "It's a birthday experience made just for you. ❤️",
    continueText: "Next",
  },

  // Screen 4: 3D Floating Glass Birthday Story Carousel
  memories: [
    {
      id: "mem1",
      image: "/images/1fdbfb0c-5877-4a33-94ff-fdbdc46ad99f.jpg",
      title: "Partner in Crime & Laughter 😂",
      caption: "From remote battles to inside jokes that nobody else understands. Growing up with you is my life's favorite adventure!",
      date: "Sibling Vibe",
      sticker: "🥳"
    },
    {
      id: "mem2",
      image: "/images/4be8960f-897c-4dfa-b434-9063a60b8f14.jpg",
      title: "The Ultimate Guardian Shield 🛡️",
      caption: "Always saving me from Mom's anger, guiding my steps, and defending me no matter what. You are my true protector.",
      date: "My Shield",
      sticker: "👑"
    },
    {
      id: "mem3",
      image: "/images/57d79c57-0cf7-4702-8f4f-aa080023b2a3.jpg",
      title: "Guide, Second Mother & Safe Space 🌸",
      caption: "Your patience, strength, and huge heart inspire me every day. Having you in my life is a blessing I cherish constantly.",
      date: "Pure Heart",
      sticker: "💖"
    },
    {
      id: "mem4",
      image: "/images/87211822-df36-4358-8173-d9b7aa686b13.jpg",
      title: "Growing Up & Chasing Dreams ✈️",
      caption: "No matter how busy life gets or where our journeys lead us, the bond between us only grows stronger with time.",
      date: "Forever Bond",
      sticker: "✨"
    },
    {
      id: "mem5",
      image: "/images/a4655068-9dca-4392-b5a1-6b65e817cb18.jpg",
      title: "Golden Moments in Time 🥹💖",
      caption: "Some memories remain permanently etched into the soul. Thank you for making every ordinary day feel extraordinary.",
      date: "Timeless",
      sticker: "🎂"
    }
  ] as BirthdayStoryMemory[],

  // Screen 5: The Birthday Vault Gifts
  vaultGifts: [
    {
      id: 1,
      title: "The Sisterhood Warranty 📜",
      sub: "Exclusive Brotherly Contract",
      message: "Congratulations Jii 🤍🧿! You have unlocked the Lifetime Sisterhood Warranty. Covers unlimited venting, 24/7 brotherly protection, and infinite snack deliveries. Absolutely no cancellations permitted! 😂🏆",
      giftType: "warranty"
    },
    {
      id: 2,
      title: "Hall of Fame Spotlight 📸",
      sub: "A Precious Portrait",
      message: "Here is to the person who illuminates every room she walks into. Keep shining bright, Didi! 🌟",
      giftType: "photo",
      image: "/images/a88f1735-0cba-4e63-aa6f-a0ad4f368707.jpg"
    },
    {
      id: 3,
      title: "Heartfelt Birthday Tribute 💖",
      sub: "What You Truly Mean To Me",
      message: "Thank you for listening to my rants, holding me together through storms, and always believing in me even when I doubted myself. I am so lucky to have you. 🥹✨",
      giftType: "tribute"
    },
    {
      id: 4,
      title: "The Sibling Video Premiere 🎬",
      sub: "Saved Just For Tonight",
      message: "A little video reel that captures our happiest sibling memories! Happy Birthday Jii! ❤️🌌🎂",
      giftType: "video",
      video: "/images/WhatsApp Video 2026-08-27 at 11.21.36 PM.mp4",
      image: "/images/d4cb1a1b-2b59-48ba-a86f-ac7c7e235c21.jpg"
    }
  ] as BirthdayVaultGift[],

  // Screen 6: The Golden Birthday Scroll & Letter
  letter: {
    title: "For Jii 🤍🧿 🎂❤️",
    paragraphs: [
      "I know I don't say it often enough…",
      "Actually, I don't think I say it at all, because we're siblings and apparently expressing emotions is legally awkward. 😂",
      "But honestly, Jii 🤍🧿… you mean the absolute world to me.",
      "Even though we do not share a connection by birth, you are my non-blooded sister, and you mean more to me than any relation by blood ever could. You are my true Didi, my real family, and my safe space. 🤍🧿",
      "As we're growing older and life is getting busier, I sometimes find myself looking back at all those childhood memories and just smiling. From sharing snacks and fighting over stupid things to sharing life problems and everything in between, you've always been there.",
      "You're one of the first people I want to tell when something good happens, and honestly, one of the first people I think of when everything feels like it's falling apart.",
      "Thank you for always being there for me.",
      "For being my guide, my support system, my biggest source of advice… even though sometimes I pretend not to listen to it. 😂",
      "Thank you for being the wise, generous, strong, and patient person you are. Your strength inspires me, and your kindness is something I genuinely admire.",
      "And even though I might annoy you, irritate you, fight with you, and act like I don't care sometimes…",
      "I hope you know that I always will.",
      "On your special birthday, I just want to promise you one thing:",
      "No matter how much life changes, how busy we get, or where life takes us, I'll always be there for you.",
      "I'll stand by you.",
      "I'll listen to your advice… sometimes. 😂",
      "I'll support you.",
      "I'll protect you.",
      "And most importantly…",
      "I'll continue annoying you until the end of time. ❤️😂",
      "Because that's what brothers are for, right?",
      "Thank you for being my Jii 🤍🧿.",
      "I may not say it often.",
      "But I love you more than you know. ❤️",
      "Happy Birthday, Jii 🤍🧿. 🎂🎉❤️",
      "With all the love in the universe,"
    ],
    signature: "Your annoying brother ❤️😂"
  },

  // Screen 7: Interactive Midnight Fireworks Finale
  finalFireworks: {
    title: "Happy Birthday, Jii 🤍🧿 🎂✨",
    subtitle: "Tap anywhere on the night sky to launch celebratory fireworks! 🎆",
    closing: "May all your dreams, wishes, and prayers come true this year.",
    author: "— Crafted with love by your brother ❤️"
  }
};
