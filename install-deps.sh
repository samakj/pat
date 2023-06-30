printf "\n ---- System Dependencies ---- \n"

sudo apt update
sudo apt upgrade

curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -

sudo apt-get install \
    build-essential \
    tmux \
    git \
    python3 \
    nodejs;

printf "\n ---- Python Dependencies ---- \n"

cd can;
pip install -r requirements.txt;
cd ..;

printf "\n ---- Javascript Dependencies ---- \n"

cd frontend;
npm install;
cd ..;