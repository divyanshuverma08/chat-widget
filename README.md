# Chat Widget using Socket.io and Node.js

This is a live customer support chat application. It can be integrated to any website using script. User can have conversation with multiple host on the admin panel.

## Features

- Live chat application
- Server is built on node.js with express and socket.io
- Host panel is built on Next.js

## Run Deployed project

Note: Please run this url (https://chat-widget-g9pw.onrender.com/api/v1) before opening the deployed sites because server sleeps on inactivity. Render.com free tier limitation.
HTML with chat widget: https://divyanshuverma08.github.io/chat-widget/
Chat widget Admin Panel: https://chat-widget-three.vercel.app/login
Login details:
Email: divyanshu@admin.com
Password: Test@123

## Run project locally
1.	Clone project from https://github.com/divyanshuverma08/chat-widget
2.	Open index.html in root of project. Add these tags in the head.
```sh
 <!-- socket io  -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.2/socket.io.j  s"></script>
<!-- script file for chat widget -->
<script src="http://localhost:5000/livechat.js"></script>
<!-- styles for chat widget -->
<link rel="stylesheet" href="http://localhost:5000/styles.css">
```
Port in local host url should be of the server running on. livechat.js and styles.css are hosted in public folder of server.
3.	Open HTML in your browser.
4.	Go to chat-widget-server folder and run command npm i.
5.	Add .env file in chat-widget-server folder with following content.
```sh
NODE_ENV=development
DB_DEV=mongodb://127.0.0.1/chat-widget
JWT_SECRET_DEV=dhgfha
```
6.	Now in chat-widget-server-folder go inside public folder and edit livechat.js.
```sh
const socket = io(“http://localhost:5000”);
```
7.	Run server using command npm run start.
8.	Open chat-widget-panel folder and run command npm i.
9.	Add .env file in chat-widget-server folder with following content.
```sh
NODE_ENV = development
NEXT_PUBLIC_SERVER_URL_DEV = http://localhost:5000
NEXT_PUBLIC_SERVER_URL_PROD = http://localhost:5000
```
Note: Port on witch server is running.
10.	Run command npm run build and then npm run start.
11.	Open panel using http://localhost:3000/login.
Then launch the server using :

## Requirements

| Language | Version |
| ------ | ------ |
| Node | v18.18.0 |

## Dependencies Server

|Plugins | Version |
| ------ | ------ |
| bcrypt | ^5.1.1 |
| cors | ^2.8.5 |
| dotenv | ^16.3.1 |
| express | ^4.18.2 |
| jsonwebtoken | ^9.0.2 |
| mongoose | ^8.0.2 |
| socket.io | ^4.7.2 |

## Dependencies Client

|Plugins | Version |
| ------ | ------ |
| @reduxjs/toolkit | ^2.0.1 |
| axios | ^1.6.2 |
| next | 14.0.3 |
| react | ^18 |
| react-dom | ^18 |
| react-hot-toast | ^2.4.1 |
| react-redux | ^9.0.1 |
| socket.io-client | ^4.7.2 |


