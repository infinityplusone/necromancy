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

# echo "\n${cyan}Fetching latest info on daqstaq${nc}\n"

# gitVersion=$(git ls-remote -t git@github.com:infinityplusone/necromancy.git | sed -e 's/^.*refs\/tags\/v//g' | sed -e ':a' -e '$!ba' -e 'N' -e 's/\n//g')
# if [[ $gitVersion == "" ]]; then
#   echo "nope"
#   gitVersion=$(git ls-remote -t git@github.com:infinityplusone/necromancy.git | sed -e 's/.*refs\/tags\/v//g' | sed -e ':a' -e '$!ba' -e 's/\n//g')
# fi
# localVersion=$(node -pe 'JSON.parse(process.argv[1]).daqstaq.version' "$(cat bower.json)")

# echo "  Git: $gitVersion"
# echo "Local: $localVersion"

# if [[ $gitVersion == $localVersion ]]; then
#   echo "\n\t${green}You're up to date!${nc}\n"
# else
#   echo "\n\t${cyan}Uh-oh!${nc}\n"
# fi

rm -rf node_modules/starter-kit*
rm -rf node_modules/daqstaq*
echo "\n${cyan}Updating npm components...${nc}\n"
npm install

echo "\n${cyan}Updating bower components...${nc}\n"
bower update

echo "\n${cyan}Updating generated assets...${nc}\n"
grunt collect

echo "\n${green}Done!\n${nc}"

# gitVersion=$(git ls-remote -t git@github.com:infinityplusone/necromancy.git | sed -e 's/^.*refs\/tags\/v//g' | sed -e 's/.* //g')
