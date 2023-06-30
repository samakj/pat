# Ensure we are on the latest

if hostname -I; then
    git fetch origin;
    git reset --hard origin/master;
fi

# Start tmux session with frontend and can running

tmux new-session -d -s "pat" "cd can && . ./run.sh";
tmux split-window -h;
tmux send-keys "cd frontend && . ./run.sh" Enter;
tmux a;