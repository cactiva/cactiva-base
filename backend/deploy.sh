#!/bin/bash
rm -rf .git
mv libs/.git libs/.git-old
git init
cp ../settings.json .
git add .
git commit -am "fix"
caprover deploy —default
rm -rf .git
rm settings.json
mv libs/.git-old libs/.git