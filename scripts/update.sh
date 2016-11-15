#!/bin/sh

# Formatting variables
blackBG='\033[1;40m'
cyan='\033[1;36m'$blackBG
gray='\033[1;37m'$blackBG
green='\033[1;32m'$blackBG
purple='\033[1;35m'$blackBG
red='\033[0;31m'$blackBG
yellow='\033[1;33m'$blackBG
nc='\033[0m'$blackBG

rm -rf node_modules/hippo*
rm -rf node_modules/necromancy*
rm -rf node_modules/bones*

echo "\n${cyan}Updating npm components...${nc}\n"
npm install

echo "\n${cyan}Updating bower components...${nc}\n"
bower update

echo "\n${cyan}Updating generated assets...${nc}\n"
grunt collect

echo "\n${cyan}Copying latest scripts from necromancy...${nc}\n"
cp node_modules/necromancy/scripts/run ./scripts

echo "\n${green}Done!\n${nc}"

# gitVersion=$(git ls-remote -t git@github.com:infinityplusone/necromancy.git | sed -e 's/^.*refs\/tags\/v//g' | sed -e 's/.* //g')
