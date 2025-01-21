export const sampleChats = [
  {
    avatar: ["https://api.dicebear.com/7.x/bottts/svg?seed=pranjal"],
    name: "Pranjal",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://i.pravatar.cc/250?u=anamika@example.com",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=anamika",
      "https://robohash.org/anamika",
      "https://loremflickr.com/250/250/cats",
    ],
    name: "Anamika",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://api.dicebear.com/7.x/initials/svg?seed=anshul"],
    name: "Anshul",
    _id: "3",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://robohash.org/aman"],
    name: "Aman",
    _id: "4",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://loremflickr.com/250/250/nature",
      "https://i.pravatar.cc/250?u=study@example.com",
      "https://api.dicebear.com/7.x/adventurer/svg?seed=study",
      "https://robohash.org/study",
    ],
    name: "Studying",
    _id: "5",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://loremflickr.com/250/250/pirates",
      "https://api.dicebear.com/7.x/personas/svg?seed=pirates",
      "https://i.pravatar.cc/250?u=pirates@example.com",
      "https://robohash.org/pirates",
    ],
    name: "Pirates",
    _id: "6",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://api.dicebear.com/7.x/identicon/svg?seed=gaming",
      "https://loremflickr.com/250/250/gaming",
      "https://i.pravatar.cc/250?u=gaming@example.com",
      "https://robohash.org/gaming",
    ],
    name: "Gaming",
    _id: "7",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://api.dicebear.com/7.x/micah/svg?seed=friends",
      "https://loremflickr.com/250/250/friends",
      "https://robohash.org/friends",
      "https://i.pravatar.cc/250?u=friends@example.com",
    ],
    name: "Friends",
    _id: "8",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://api.dicebear.com/7.x/croodles/svg?seed=family",
      "https://i.pravatar.cc/250?u=family@example.com",
      "https://loremflickr.com/250/250/family",
      "https://robohash.org/family",
    ],
    name: "Family",
    _id: "9",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://api.dicebear.com/7.x/pixel-art/svg?seed=kishan"],
    name: "Kishan",
    _id: "10",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    name: "John Boi",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: ["https://api.dicebear.com/7.x/shapes/svg?seed=pranjal"],
      name: "Pranjal",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://robohash.org/golu"],
      name: "Golu",
    },
    _id: "2",
  },
];

export const sampleMessages = [
  {
    sender: {
      avatar: ["https://api.dicebear.com/7.x/personas/svg?seed=aman"],
      name: "Aman",
    },
    _id: "4",
    message: "Good Morning",
  },
  {
    sender: {
      avatar: ["https://loremflickr.com/250/250/people"],
      name: "Pranjal",
    },
    _id: "5",
    message: "Hello",
  },
  {
    sender: {
      avatar: ["https://robohash.org/anamika"],
      name: "Anamika",
    },
    _id: "6",
    message: "Hi Good Morning",
  },
  {
    sender: {
      avatar: ["https://api.dicebear.com/7.x/big-smile/svg?seed=golu"],
      name: "Golu",
    },
    _id: "7",
    message: "How are you?",
  },
];

export const dashboardData = {
  users: [
    {
      name: "Pranjal The Coder",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      _id: "1",
      username: "mr_pranjal._",
      friends: 20,
      groups: 5,
    },
    {
      name: "Shivam",
      avatar: "https://randomuser.me/api/portraits/men/20.jpg",
      _id: "2",
      username: "hey_shivam",
      friends: 15,
      groups: 3,
    },
  ],
    chats: [
      {
        name: "Pranjal The Coder",
        avatar: ["https://randomuser.me/api/portraits/men/10.jpg"],
        _id: "1",
        groupChat: false,
        members: [
          { _id: "1", avatar: "https://randomuser.me/api/portraits/men/20.jpg"}, 
          { _id: "2", avatar: "https://randomuser.me/api/portraits/men/10.jpg"}
          ],
        totalMembers: 2,
        totalMessages: 20,
        creator: {
          name: "Shivam Bh",
          avatar: "https://randomuser.me/api/portraits/men/20.jpg",
        },
      },
      {
        name: "Code Enthusiasts",
        avatar: ["https://randomuser.me/api/portraits/men/30.jpg"],
        _id: "2",
        groupChat: true,
        members: [
          { _id: "1", avatar: "https://randomuser.me/api/portraits/men/40.jpg"}, 
          { _id: "2", avatar: "https://randomuser.me/api/portraits/men/50.jpg"},
          { _id: "3", avatar: "https://loremflickr.com/250/250/person"},
          { _id: "4", avatar: "https://randomuser.me/api/portraits/men/30.jpg"},

          ],
        totalMembers: 4,
        totalMessages: 50,
        creator: {
          name: "Aarav Joshi",
          avatar: "https://randomuser.me/api/portraits/men/40.jpg",
        },
      },
      {
        name: "Secret Study",
        avatar: ["https://randomuser.me/api/portraits/men/50.jpg"],
        _id: "3",
        groupChat: true,
        members: [
          { _id: "1", avatar: "https://randomuser.me/api/portraits/men/20.jpg"}, 
          { _id: "2", avatar: "https://randomuser.me/api/portraits/men/10.jpg"}
          ],
        totalMembers: 5,
        totalMessages: 75,
        creator: {
          name: "Shivam Bh",
          avatar: "https://randomuser.me/api/portraits/men/20.jpg",
        },
      },
    ],
    messages:[
      {
        attachments: [],
        content: " Dekh Kya Rha Hai Bsdk ",
        _id: "jsnvjn",
        sender: {
          avatar: "https://randomuser.me/api/portraits/men/20.jpg",
          name: "Lund",
        },
        chat: "chatId",
        groupChat: false,
        createdAt: "2025-01-16T10:41:30.630Z",
      },
      {
        attachments: [],
        content: "Kuch kaam kar le na bhai.",
        _id: "msg1",
        sender: {
          avatar: "https://randomuser.me/api/portraits/men/30.jpg",
          name: "Rohan",
        },
        chat: "chatId1",
        groupChat: false,
        createdAt: "2025-01-16T12:00:00.000Z",
      },
      {
        attachments: [],
        content: "Aaj ki meeting ka kya scene hai?",
        _id: "msg2",
        sender: {
          avatar: "https://randomuser.me/api/portraits/men/40.jpg",
          name: "Aarav",
        },
        chat: "chatId2",
        groupChat: false,
        createdAt: "2025-01-16T12:30:00.000Z",
      },
      {
        attachments: [],
        content: "Yeh image dekh, mast hai!",
        _id: "msg3",
        sender: {
          avatar: "https://randomuser.me/api/portraits/men/50.jpg",
          name: "Shivam",
        },
        chat: "chatId3",
        groupChat: false,
        createdAt: "2025-01-16T13:00:00.000Z",
      },
      {
        attachments: [],
        content: "Khaane mein kya bana hai?",
        _id: "msg4",
        sender: {
          avatar: "https://randomuser.me/api/portraits/men/80.jpg",
          name: "Ishaan",
        },
        chat: "chatId4",
        groupChat: false,
        createdAt: "2025-01-16T13:30:00.000Z",
      },
      {
        attachments: [
          {
            public_id: "adfavvvvvwv 2",
            url : "https://randomuser.me/api/portraits/men/50.jpg",
          },
        ],
        content: "Yeh report check kar lena.",
        _id: "msg5",
        sender: {
          avatar: "https://randomuser.me/api/portraits/men/50.jpg",
          name: "Mehul",
        },
        chat: "chatId5",
        groupChat: true,
        createdAt: "2025-01-16T14:00:00.000Z",
      }
  ],
};
  

