# Ensure we are on the latest

printf "\n ---- Checking internet connection ---- \n"
if hostname -I; then
    printf "\n ---- Pulling master ---- \n"
    git fetch origin;
    git reset --hard origin/master;
fi

# Start tmux session with frontend and can running

printf "\n ---- Starting tmux ---- \n"
tmux new-session -d -s "pat" "cd can && . ./run.sh";
tmux split-window -h;
tmux send-keys "cd frontend && . ./run.sh" Enter;
tmux a;