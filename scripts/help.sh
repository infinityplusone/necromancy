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

divider="\n================================================================\n"
underline="\n-----------------------\n"

projectPath=$(pwd)
tmp=./node_modules/necromancy/tmp
timestamp=$(date '+%Y-%m-%d_%H-%M-%S_%Z')
nodeInfo=$tmp/node-info.txt
gitInfo=$tmp/gitinfo.txt
obiWan=$tmp/help-me-obi-wan.txt
tarFile=~/Desktop/$USER-$timestamp.tar.gz

if [ -e $tmp ]; then
  rm -rf $tmp
fi
mkdir $tmp

touch $obiWan

echo "Getting Node Version"
echo "Node Version: $(node -v)" > $nodeInfo

echo "Getting NPM Version"
echo "NPM Version: $(npm -v)" >> $nodeInfo

echo "$divider" >> $nodeInfo

echo "Getting Local NPM Modules"
echo "Local NPM Modules${underline}$(npm list --depth=1)\n${divider}" >> $nodeInfo

echo "Getting Global NPM Modules"
echo "Global NPM Modules${underline}$(npm list -g --depth=0)\n${divider}" >> $nodeInfo

echo "Getting Outdated NPM Modules"
echo "Outdated NPM Modules${underline}$(npm outdated -g)\n${divider}" >> $nodeInfo

printf "Getting .gitconfig... "
if [ -e ~/.gitconfig ]; then
  echo "Copied!"
  echo ".gitconfig: Copied!" >> $obiWan
  cp ~/.gitconfig $tmp/gitconfig-global.txt
else
  echo "Missing!"
  echo ".gitconfig: Missing!" >> $obiWan
fi

printf "Getting .bowerrc..."
if [ -e ~/.bowerrc ]; then
  echo "Copied!"
  echo ".bowerrc: Copied!" >> $obiWan
  cp ~/.bowerrc $tmp/bowerrc-global.txt
else
  echo "Missing!"
  echo ".bowerrc: Missing!" >> $obiWan
fi

printf "Getting package.json... "
if [ -e package.json ]; then
  echo ""
  echo "package.json: Copied!" >> $obiWan
  cp package.json $tmp
else
  echo "${red}Missing!${nc}"
  echo "package.json: Missing!" >> $obiWan
fi

printf "Getting bower.json... "
if [ -e bower.json ]; then
  echo ""
  echo "bower.json: Copied!" >> $obiWan
  cp bower.json $tmp
else
  echo "${red}Missing!${nc}"
  echo "bower.json: Missing!" >> $obiWan
fi

printf "Getting Gruntfile.js... "
if [ -e Gruntfile.js ]; then
  echo ""
  echo "Gruntfile.js: Copied!" >> $obiWan
  cp Gruntfile.js $tmp
else
  echo "${red}Missing!${nc}"
  echo "Gruntfile.js: Missing!" >> $obiWan
fi


# save a tar of the files on the desktop
echo "Saving troubleshooting details to your Desktop"
cd $tmp
tar -zcvf $tarFile ./
cd $projectPath

echo "\n${green}Done!\n\n\n${nc}"

echo "Please send the file ${cyan}${tarFile}${nc} to ${cyan}@yoni${nc}!\n\n"

