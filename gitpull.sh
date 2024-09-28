#!/bin/bash

# Determine the directory where the script resides
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

LOCKFILE=/tmp/lock.txt

if [ -e ${LOCKFILE} ] && kill -0 `cat ${LOCKFILE}`; then
    echo "already running"
    exit
fi

# make sure the lockfile is removed when we exit and then claim it
trap "rm -f ${LOCKFILE}; exit" INT TERM EXIT
echo $$ > ${LOCKFILE}

DIR_PATH="$HOME/ping-server"
# cd to the directory where the script resides
cd $DIR_PATH

# Update the git repository
git_output=$(/usr/bin/git pull origin main 2>&1)

rm -f ${LOCKFILE}