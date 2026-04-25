// Friend personas — blob SVG avatars (will be replaced with real Cloudinary photos)

const makeBlobAvatar = (emoji, bg1, bg2) => ({
  emoji,
  bg: `linear-gradient(135deg, ${bg1}, ${bg2})`,
});

export const FRIENDS = {
  samyam: {
    name: "Samyam",
    title: "The Chaotic Host",
    ...makeBlobAvatar("🤪", "#ff3cac", "#784ba0"),
  },
  suman: {
    name: "Suman",
    title: "The Foodie",
    ...makeBlobAvatar("🍕", "#f7971e", "#ffd200"),
  },
  uttam: {
    name: "Uttam",
    title: "The Party Animal",
    ...makeBlobAvatar("🍹", "#2b86c5", "#00c6ff"),
  },
  cheena: {
    name: "Cheena",
    title: "Name k ho vana na?",
    ...makeBlobAvatar("🤪", "#ff3cac", "#784ba0"),
  },
  sabina: {
    name: "Sabina",
    title: "k khanxau?",
    ...makeBlobAvatar("🍕", "#f7971e", "#ffd200"),
  },
  sudipp: {
    name: "Sudipp",
    title: "beer khana?",
    ...makeBlobAvatar("🍹", "#2b86c5", "#00c6ff"),
  },
  kiran: {
    name: "Kiran",
    title: "Musey/puntey chief/former husband",
    ...makeBlobAvatar("😭", "#c0392b", "#e74c3c"),
  },
  last: {
    name: "Meetup Crew",
    title: "Final Invite",
    ...makeBlobAvatar("🎉", "#6c3483", "#ff3cac"),
  },
  // Aliases used in scene files.
  casey: undefined,
  riley: undefined,
  group: undefined,
  alex: undefined,
  sam: undefined,
};

FRIENDS.casey = FRIENDS.kiran;
FRIENDS.riley = FRIENDS.kiran;
FRIENDS.group = FRIENDS.last;
FRIENDS.alex = FRIENDS.cheena;
FRIENDS.sam = FRIENDS.cheena;

export const QUESTIONS = [
  {
    id: "name",
    field: "name",
    friend: "cheena",
    question: "Name vana ta timro babe?",
    subtext: "Bau aama la rakhako name vana la.",
    type: "text",
    placeholder: "Your name...",
    emoji: "🕵️",
  },
  {
    id: "food",
    field: "favorite_food",
    friend: "sabina",
    question: "k khanxau baby. Favorite food?",
    subtext: "ma kati ko ramro xu hera ta",
    type: "text",
    placeholder: "e.g. Pizza, Momo, Tacos...",
    emoji: "🍽️",
  },
  {
    id: "drink",
    field: "favorite_drink",
    friend: "sudipp",
    question: "Kun drink khanxau babe, na dhati vana la, ummaa?",
    subtext: "Mamata kaha xau timi??",
    type: "text",
    placeholder: "e.g. Water, Beer, Chaang...",
    emoji: "🥤",
  },
  {
    id: "divorce",
    field: "had_divorce",
    friend: "kiran",
    question: "kta kti ho divorce ta vako xaina timiharu ko? 😭",
    subtext: "mero ta bijok vayo yrr, aarko poi liyara gai tyo ta.",
    type: "yesno",
    emoji: "💔",
  },
];

export const AFTER_ANSWERS = {
  name: [
    "Solid name. Very solid.",
    "Okay we know a {v}. Small world 👀",
    "Nice to meet you, {v}. This won't be awkward at all.",
    "{v}? That tracks honestly.",
  ],
  favorite_food: [
    "Okay {v} person. Noted. The table is judging.",
    "Respectable choice. Questionable, but respectable.",
    "{v}?? Okay we didn't expect that but sure.",
    "The {v} lovers have arrived. Let's go.",
  ],
  favorite_drink: [
    "Ah yes. A {v} drinker. We see you.",
    "{v}?? Bold. Very bold.",
    "Classic {v} move. We love it.",
    "{v}. The drink of champions and chaos.",
  ],
  had_divorce: [
    "Respect the journey. 🫡",
    "Say no more. We understand everything now.",
    "That explains the energy. We love it.",
    "Noted. Adding extra snacks for you specifically.",
  ],
};
