# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



Realtime chat app

you can send any type of file (attachments) : image , video, audio, any randome file
Socket.io for Realtime Data Messaging
Infinite loading : Infinite Scrolling (Hme chat open krte he ek sath saare messages nhi milege bliki chunks me data milega).
Database : mongodb
File Store : Cloudinary
Framer-motion : to add animation for messages
Authentication : Firstly user will be log Infinite

For Frontend (React)
Vite@latest : Javascript + SWC
we can use MUI library : for creating a UI Frontend
Scroll Bar : Using Use-Infinite-Scroll
Admin Panel : you can enter a Admin panel through Secret Key


Features
Realtime Notification
when you are typing other user can see i am typing
Users can chat seperate to other users 
or create a group or in group there is min. 3 persons require
Dashboard : Analytical Dashboard in this we can see all messages
Responsive Website
Agar aapko koi file bhejni to vo bhi bhej skte ho aur mene yha limit set kr rkhi h 5mb ki

Gitbook -> gives us the idea 


Main Features to add in the Chat app
1. Users can register/log in with a username
2. Users can search for a user
3. Users can send a friend request to other users
4. The user will be notified about the request
5. Users can accept the friend request
6. Users can see the Chat list
7. Users can send messages or attachments in Chat
8. Users can create a Group Chat with a minimum of 3 members and a maximum of 100 members
9. Group admin can rename the Group, add members, or remove members
10. The group admin can delete the group
11. Group members can leave the group
12. If the Group admin leaves the group then a new Admin will be assigned
13. Users can delete a chat / unfriend a user
14. Admin Dashboard to see users, messages, and chats (Only Accessible with a Secret key).



first create two client and server
and use vite@latest for React
and use Javascript + SWC
then install dependencies

then go to MUI (Material UI) library
install material UI
install some dependencies
1. React-router-dom: for routing dom
2. momentjs : it is library for managing Date
3. 6pp : it is also library it has many hooks which help us for bnuilding Frontend
4. axios :
5. react chartjs : go to react chartjs 2
6. react-hot-toast 
7. react-helmet-async
8. Material Icons :package for MUI Icons
( npm i @mui/icons-material @mui/material @motion/styled @emotion/react)





Schema
User Schema Required (Name, UserName, Bio, Password(hashed), Avatar(public id, url))

Chat Schema Requiridation (Name , Chat, groupChat(boolean), Creator, Members(array of user_id))

Messages ( Content, Sender(user_id), Chat(Chat_id), Attachments )

Request (Status(String), Reciever, Sender (Both points to user))

Hum Users Me Friends ki array bhi bna kste hai jisase quires likhne me aasani hogi but data redudancy bad jayegi
hum quires aise bnayegi complex quires jisase firends array ki need nhi h usi se find kr lege
pros: data redundant km ho gyi
cons: quires are more complicated

API
    User Related API
        Login, SignUp Api
        Search API
        Register API
        searchUser ApI
        sendrequest API
        Notifications , Accept Notifications API

    Friends API
        getmyFriend API

    Chat API
        SendAttachmenst API
        getmyChat API
        Create Group API
        getChatDetails API
        RenameGroup API
        delete Chat / delete Group API
        Add Members API
        Remove Members API
        Leavegroup API
        GetMessages API
    Admin API
        Admin me statistics ka chahiye dashboard ka data
        logIN, logOUT API
        user data show ho 
        chat data show ho
        messages data show ho






hme socket ka use krna hoga notifications ko recieve krne ko taki hm notifications push kr paye

For real time messaging we use a Socket
to send or recieve Messages


GetMessage API isliye chahiye kyuki agr me chat open kru to ye jo messages hai ye to already loaded hai ye sockewt to nhi aayege to uske liye chahiye getMessages API Jo ki thodi complex hogi kyuki isme hme Pagination ka use krna hai but pagination to h nhi isliye humm infnite scrolling ka use krege ye dono concept h frontend ke backend dono ka same he hota hai.



maan lo mujhe meessages bhejne h mene limit lga di 10 ki 10 ye to ho gya page 1 ab page 1 me 10 messages aa gye 
ab man lo koi page 2 ki request kr rha hai ye vale 10 ko jhod kr next vale 10 lege 
aur agr page 3 ki request krega to hm page 1, page 2 ke 10 messages ko jhod kr next 1 messages lege.

Infinite Scrolling me kya hota hai
Jo page increase huye hai vo rather than page par click krne se page scroll krega tb khud b khud page increase kr dege
Infinite Scroll Concept 
jese me page 1 me hu jese he me page ke bottom m e pahuchuga me turant page number increase kr duga.
just like ki me scroll vale event vale eventListner pr jese he vo bottom touch krne vala ho page number increase kr do



