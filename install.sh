#!/bin/bash
sudo apt update && sudo apt upgrade -y
sudo apt install unzip -y
sudo apt install jq -y
curl -fsSL https://bun.sh/install | bash
source /root/.bashrc
git config --global credential.helper store
git clone https://github.com/Platinum-Scripts/ping-server.git --branch main
chmod +x /root/ping-server/run.sh
chmod +x /root/ping-server/gitpull.sh
crontab -l | { cat; echo "* * * * * bash /root/ping-server/gitpull.sh"; } | crontab -
screen bash /root/ping-server/run.sh