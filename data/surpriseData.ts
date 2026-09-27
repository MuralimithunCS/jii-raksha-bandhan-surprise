// ==========================================
// JII'S HEARTFELT BIRTHDAY SURPRISE GALA DATA
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
  giftType: "warranty" | "photo" | "jukebox" | "video";
  image?: string;
  video?: string;
  songs?: { title: string; subtitle: string; tag: string }[];
}

export const surpriseData = {
  // Recipient Personal Info
  recipientName: "Disha",
  nickname: "Jii 🤍🧿",
  senderName: "Your Jii", // Both call each other Jii!

  // Screen 1: VIP Birthday Pass
  vipPass: {
    badge: "OFFICIAL VIP BIRTHDAY INVITATION",
    title: "All-Access Birthday Gala Pass 🎟️",
    ticketNumber: "JII-BDAY-2026-INFINITE",
    guestOfHonor: "Disha (Jii 🤍🧿)",
    relationBadge: "My Akka from Another Mother 🤍",
    perks: [
      "🤍 Bound by soul, deeper than any blood connection",
      "🛡️ The Akka who pulled me out of my darkest days",
      "🍫 Infinite snacks & zero sibling complaints (strictly today 😂)",
      "♾️ A lifetime promise: Never walking away from each other"
    ],
    buttonPrompt: "Claim Your VIP Pass, Jii ✨",
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
        label: "🛡️ The Akka Who Saved Me",
        reward: "When everyone walked away, my Akka stayed.",
        compliment: "When that unexpected friend walked out and left me broken, you pulled me out of the dark. You saved me, Jii. 🤍"
      },
      {
        id: 2,
        color: "from-amber-400 via-yellow-500 to-orange-500",
        textColor: "text-amber-100",
        label: "💊 Her Daily Prescriptions",
        reward: "Doctor Jii's life-saving advice!",
        compliment: "'Stop overthinking... don't worry, whatever is written will happen, and please take care of yourself!' 😇"
      },
      {
        id: 3,
        color: "from-purple-500 via-violet-600 to-indigo-600",
        textColor: "text-purple-100",
        label: "🎒 High School to Eternity",
        reward: "Just a 1-year gap, but a lifetime of protection.",
        compliment: "From high school hallways to the deepest bond in my entire universe."
      },
      {
        id: 4,
        color: "from-emerald-400 via-teal-500 to-cyan-600",
        textColor: "text-emerald-100",
        label: "🤍 Mutual Jii Bond",
        reward: "The only two souls on earth who call each other Jii!",
        compliment: "You call me Jii, I call you Jii. A sacred bond that belongs only to us."
      },
      {
        id: 5,
        color: "from-fuchsia-500 via-rose-500 to-amber-400",
        textColor: "text-yellow-100",
        label: "🌟 My Only Person",
        reward: "The anchor of my whole life.",
        compliment: "Out of 8 billion people, you are the only one I consider 'my person.' 🤍🧿"
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
    subheading: "Close your eyes, Akka... make your deepest wish, and blow out the candle...",
    blowButtonText: "Blow Out The Candle 🎂💨",
    wishGrantedText: "🎉 Your wish is locked in the stars! Happy Birthday Jii 🤍🧿! ✨"
  },

  // Screen 4: Starlight Greeting Reveal
  greetingReveal: {
    heading: "Happy Birthday, Jii 🤍🧿 🎂✨",
    introText: "To my Akka from another mother — the only person in this entire world I truly call my own...",
    subText: "(Tap anywhere to step into your Birthday Starlight Carousel ✨)"
  },

  // Gift Box fallback
  giftBox: {
    initialPrompt: "You have a birthday parcel! Tap to unbox it. 🎁",
    openedText: "It's not just a gift...",
    subText: "It's a birthday experience made just for you. ❤️",
    continueText: "Next",
  },

  // Screen 5: 3D Floating Glass Birthday Story Carousel
  memories: [
    {
      id: "mem1",
      image: "/images/1fdbfb0c-5877-4a33-94ff-fdbdc46ad99f.jpg",
      title: "High School Days to My Real Akka 🎒",
      caption: "We met back in high school with just a single year's gap between us. Who knew that a girl from another mother would end up becoming the most important human in my entire life?",
      date: "Our Beginning",
      sticker: "🥹"
    },
    {
      id: "mem2",
      image: "/images/4be8960f-897c-4dfa-b434-9063a60b8f14.jpg",
      title: "The One Who Stood By Me 🛡️",
      caption: "When a close friend unexpectedly walked away and left me completely shattered, you didn't leave my side for a second. You picked up my broken pieces and gave me strength.",
      date: "My Guardian",
      sticker: "🤍"
    },
    {
      id: "mem3",
      image: "/images/57d79c57-0cf7-4702-8f4f-aa080023b2a3.jpg",
      title: "'Stop Overthinking, Jii' 🌸",
      caption: "'Don't worry much, whatever is written will happen. Just please take care of yourself.' Every time my mind goes crazy, your voice is the only peace I find.",
      date: "My Safe Place",
      sticker: "✨"
    },
    {
      id: "mem4",
      image: "/images/87211822-df36-4358-8173-d9b7aa686b13.jpg",
      title: "More Than Any Blood Relation 💫",
      caption: "People say blood is thicker than water. But what you and I share proves that God sometimes sends your truest sister through another mother.",
      date: "Soul Sister",
      sticker: "👑"
    },
    {
      id: "mem5",
      image: "/images/a4655068-9dca-4392-b5a1-6b65e817cb18.jpg",
      title: "My Only Person In This World 🥹💖",
      caption: "I don't have close friends or a circle to turn to. In this big, noisy world, when I look around, there's only one person I truly consider 'mine' — and that's you, Jii.",
      date: "Forever Mine",
      sticker: "🎂"
    }
  ] as BirthdayStoryMemory[],

  // Screen 6: The Birthday Vault Gifts
  vaultGifts: [
    {
      id: 1,
      title: "The Sisterhood Warranty 📜",
      sub: "Exclusive Sibling Contract",
      message: "The unbreakable pact between two souls who call each other Jii: No matter how busy life gets, no matter how much we argue, we are stuck together forever. No cancellations allowed! 😂🏆",
      giftType: "warranty"
    },
    {
      id: 2,
      title: "Hall of Fame Spotlight 📸",
      sub: "A Precious Portrait",
      message: "To my Akka, my guide, and the brightest light in my life. You make every ordinary day feel extraordinary just by existing. Keep shining, Didi! 🌟",
      giftType: "photo",
      image: "/images/a88f1735-0cba-4e63-aa6f-a0ad4f368707.jpg"
    },
    {
      id: 3,
      title: "The Sibling Jukebox 🎵",
      sub: "Soundtrack of Our Sisterhood",
      message: "Dedicated to your favorite melodies: 'Meri Jaan' (Gangubai Kathiawadi), 'Darshana' (Hridayam), and from my heart to yours: 'Nee Nange Alva' by Sanjith Hegde. Because aren't you mine, Jii? 🤍🎶",
      giftType: "jukebox",
      songs: [
        { title: "Meri Jaan", subtitle: "Gangubai Kathiawadi • Her Favorite Vibe", tag: "Jii's Track" },
        { title: "Darshana", subtitle: "Hridayam • Pure Emotion", tag: "Jii's Track" },
        { title: "Nee Nange Alva", subtitle: "Sanjith Hegde • 'Aren't you meant for me, Akka?'", tag: "Brother's Dedication" }
      ]
    },
    {
      id: 4,
      title: "The Sibling Video Premiere 🎬",
      sub: "Captured Just For Tonight",
      message: "A treasure of our memories together. Every frame here reminds me of why I can never, ever afford to lose you. Happy Birthday Jii! ❤️🌌🎂",
      giftType: "video",
      video: "/images/video_260927_201154.mp4",
      image: "/images/d4cb1a1b-2b59-48ba-a86f-ac7c7e235c21.jpg"
    }
  ] as BirthdayVaultGift[],

  // Screen 7: The Golden Birthday Scroll & Letter (THE TEARJERKER)
  letter: {
    title: "Dear Jii 🤍🧿,",
    paragraphs: [
      "I know we are siblings and expressing raw emotions is supposed to feel awkward, but tonight on your birthday, I need to say things I've kept locked in my chest for too long.",
      "We met back in high school with just a single year's gap between us. But somewhere along that journey, you stopped being just a friend and became my Akka — an elder sister sent from another mother.",
      "People often say blood connections are the strongest in the world. But honestly, Jii... what you mean to me is beyond anything biology could ever create. Although you are not my blood sister, you are more than anything for me in this life. You are my real family.",
      "I will never forget that time in my life when a close friend unexpectedly walked away and left me completely broken. My world felt shattered, and I felt so alone in the dark. But you didn't leave my side for a second. You held me together when everything was falling apart. You saved me, Jii. I never thanked you enough for being my lifeline.",
      "Every time my thoughts start spiraling, your voice rings in my ears like a prayer: 'Stop overthinking, Jii... don't worry so much. Whatever is written in destiny will happen. Just please take care of yourself.' Nobody in this entire universe understands my silence the way you do.",
      "And tonight, on your birthday, I want to make you a lifetime promise from the deepest corner of my heart:",
      "No matter what happens in life, no matter what mistakes you make or what mistakes I make, no matter how hard life gets or what disagreements we have... I promise you that I will NEVER leave your side at any time. Ever.",
      "And Jii... I need to ask you for one promise in return:",
      "Please... never leave me either.",
      "Because the honest truth is, Jii... I don't have the strength to lose you. I really don't.",
      "I don't have a crowd of close friends. I don't have people I can run to or open my heart to. In this entire world of eight billion people, you are the ONLY person whom I consider 'my person.' If I lose you, I have nobody.",
      "Thank you for being born. Thank you for being my Akka. Thank you for being the only home my heart knows.",
      "Happy Birthday, Jii 🤍🧿. 🎂🎉❤️",
      "Ni nange alva? You will forever be my person."
    ],
    signature: "From your Jii ❤️"
  },

  // Screen 8: Interactive Midnight Fireworks Finale
  finalFireworks: {
    title: "Happy Birthday, Jii 🤍🧿 🎂✨",
    subtitle: "Tap anywhere on the night sky to launch celebratory fireworks! 🎆",
    closing: "May all your prayers, wishes, and dreams come true this year.",
    author: "— From your Jii, with all my love ❤️"
  }
};
