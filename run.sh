tmux new-session -d -s "pat" "cd can && . ./run.sh";
tmux split-window -h;
tmux send-keys "cd frontend && . ./run.sh" Enter;
tmux a;