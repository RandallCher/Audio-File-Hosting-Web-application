source .venv/Scripts/activate

cd audio-file-hosting
npm run dev &&

cd ..
cd backend 
node server.js