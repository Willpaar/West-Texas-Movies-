This is the template 
but the frontend holds the code for the website layout
backend holds the database and the functions to access it

to run this locally all you have to do is run the start.bat if your on windows
(you made need to download the dependencies)

if you're on mac you need to 
1. start the backend server
cd to backend
python server.py

2. start the frontend server
cd frontend
npm run dev
(you'll need npm and vite installed)

pretty much to sum up whats going on the index.html is the first file react will call to run the website

in that file it calls /src/main.jsx which creates a root (idk what that means) at src/app.jsx 

this app.jsx file is pretty much the main file of the whole project and it holds the routes that the website can go to
then inside the ./pages folder we will change that code to add whatever webpages we will need

then inside the ./components folder we will put simple templates for items on the webpage like headers, footers, ect.

the ./frontend/public folder will hold images that the website will use

just lmk if you have any questions about anything else in here ill try to answer it
