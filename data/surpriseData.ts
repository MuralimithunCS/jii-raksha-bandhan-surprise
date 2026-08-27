// ==========================================
// EDIT JII'S PERSONAL CONTENT HERE
// ==========================================

export interface PolaroidMemory {
  id: string;
  image: string;      // Actual path under public/images
  caption: string;    // Soft handwritten text description
  date: string;       // Date of memory or descriptive year
  rotation: number;   // Visual rotation for scrapbook feel (degrees)
}

export interface SecretGift {
  id: number;
  title: string;
  sub: string;
  message: string;
  giftType: "joke" | "photo" | "hearts" | "spotlight" | "video";
  image?: string;     // Image path
  video?: string;     // Sibling video path
}

export const surpriseData = {
  // Recipient Personal Info
  recipientName: "Disha",
  nickname: "Jii 🤍🧿",
  senderName: "Your Brother", // Change to brother's name

  // Screen 1: The Mysterious Opening
  opening: {
    title: "Jii 🤍🧿...",
    subtitle: "I made something special for you.",
    warning: "But... you have to promise me you'll see it till the end.",
    buttonText: "Okay... show me 👀",
  },

  // Screen 2: Digital Gift Box
  giftBox: {
    initialPrompt: "You have a parcel! Tap to unbox it. 📦",
    openedText: "It's not the gift...",
    subText: "It's the experience. ❤️",
    continueText: "Next",
  },

  // Screen 3: Playful confirmation
  playfulQuestion: {
    question: "Jii 🤍🧿, are you ready for this?",
    yesOptions: ["YES ❤️", "YESSS 😭", "Didi is ready! 💃"],
    noOptions: ["No", "Wait, what?", "Not ready 😂"],
    playfulAlerts: [
      "Jii 🤍🧿, don't be shy! 😂",
      "I know you are curious! Tapping No is not an option here.",
      "Nice try, but you can't run away. Click YES! 😉",
      "Didi, please, I spent a lot of time on this. Click YES! 🥺",
      "You promised to see it till the end! ❤️",
    ]
  },

  // Screen 4: Raksha Bandhan Reveal
  greetingReveal: {
    heading: "Happy Raksha Bandhan, Jii 🤍🧿 ❤️",
    introText: "To the person who has been there through literally everything...",
    subText: "A small thread... and a lifetime of memories. (Tap anywhere to enter our Memory Scrapbook ✨)"
  },

  // Screen 5: Memory World / Scrapbook (Using actual uploaded images)
  memories: [
    {
      id: "mem1",
      image: "/images/1fdbfb0c-5877-4a33-94ff-fdbdc46ad99f.jpg",
      caption: "Fights, remote battles, and sibling laughter! 😂",
      date: "Sibling Vibe",
      rotation: -6,
    },
    {
      id: "mem2",
      image: "/images/4be8960f-897c-4dfa-b434-9063a60b8f14.jpg",
      caption: "Always saving me from Mom's anger. My ultimate shield! 🛡️",
      date: "Always & Forever",
      rotation: 4,
    },
    {
      id: "mem3",
      image: "/images/57d79c57-0cf7-4702-8f4f-aa080023b2a3.jpg",
      caption: "Guide, second mother, and the best sister ever. 🌸",
      date: "Life Companion",
      rotation: -3,
    },
    {
      id: "mem4",
      image: "/images/87211822-df36-4358-8173-d9b7aa686b13.jpg",
      caption: "Growing up together was the biggest adventure. ✈️",
      date: "Our Journey",
      rotation: 5,
    },
    {
      id: "mem5",
      image: "/images/a4655068-9dca-4392-b5a1-6b65e817cb18.jpg",
      caption: "Some memories simply stay in the heart forever. 🥹💖",
      date: "Happy Times",
      rotation: -5,
    }
  ] as PolaroidMemory[],

  // Screen 6: The Secret Gifts (Using actual uploaded image and video)
  secretGifts: [
    {
      id: 1,
      title: "Open me first 👀",
      sub: "Playful Sibling Truths",
      message: "Congratulations Jii 🤍🧿! You have won the award for the 'Most Annoyingly Caring Sister' in the universe. No refunds or exchanges allowed! 😂🏆",
      giftType: "joke"
    },
    {
      id: 2,
      title: "Okay... this one is special",
      sub: "A Precious Vibe",
      message: "Here is a gentle reminder that no matter how far we are or how busy life gets, you are my favorite person to annoy. 🌟",
      giftType: "photo",
      image: "/images/a88f1735-0cba-4e63-aa6f-a0ad4f368707.jpg"
    },
    {
      id: 3,
      title: "You probably didn't expect this",
      sub: "Heartfelt Gratitude",
      message: "Thank you for listening to my infinite rants, holding me together when things got tough, and always having my back. I am incredibly lucky to have you as my Didi. 🥹💖",
      giftType: "hearts"
    },
    {
      id: 4,
      title: "Last one... promise",
      sub: "A Spotlight Moment",
      message: "A little video I saved just for this moment. Thank you for being the highlight of my childhood! ❤️🌌",
      giftType: "video",
      video: "/images/WhatsApp Video 2026-08-27 at 11.21.36 PM.mp4",
      image: "/images/d4cb1a1b-2b59-48ba-a86f-ac7c7e235c21.jpg" // Thumbnail / fallback
    }
  ] as SecretGift[],

  letter: {
    title: "For Jii 🤍🧿 ❤️",
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
      "On this Raksha Bandhan, I just want to promise you one thing:",
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
      "Happy Raksha Bandhan, Jii 🤍🧿. 🪢❤️",
      "With all the love in the universe,"
    ],
    signature: "Your annoying brother ❤️😂"
  },

  // Screen 8: Final Emotional Reveal
  finalMessage: {
    title: "Thank you for being my sister.",
    subtitle: "I may not say it every day...",
    highlight: "But I love you more than you know. ❤️",
    closing: "Happy Raksha Bandhan, Jii 🤍🧿.",
    author: "— Made with love by your brother"
  }
};
