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

bumped=false
project=$(pwd | sed -e "s/.*\///g")
branch=$(git rev-parse --abbrev-ref HEAD)

# some remote stuff
remotes=$(git remote)
remoteOpt=""
remoteOptions=[]

# Some regular expressions
reYes='^[yY](es)?$'
reNo='^[nN](o)?$'
reYesNo='^([yY](es)?)|([nN](o)?)$'
reBump='^([0-9]+\.[0-9]+\.[0-9]+|patch|minor|major)$'
reOpts='^('

echo ""

# if a bump was specified, bump the version and push that first
if [ "$#" == 1 ]; then
  if [[ $1 =~ $reBump ]]; then
    grunt bump:$1
    bumped=true
  else
    echo "\n${red}Fatal error: Invalid bump value!${nc}\n"
    exit 1
  fi
fi

# Get list of available remotes
let i=0
for r in $remotes; do
  remoteOptionsString=$remoteOptionsString"\t[${green}$i${nc}] $r\n"
  remoteOptions[$i]=$r
  reOpts=$reOpts'|'$i
  let i=$i+1
done

reOpts=$(echo $reOpts')$' | sed -e s/\|//)''

# Display menu of remotes for selection
while [[ ! $remoteOpt =~ $reOpts ]]; do
  printf "${nc}${remoteOptionsString}\n\tWhich remote should we commit to?${cyan} "
  read remoteOpt
  printf $nc
  if [[ ! $remoteOpt =~ $reOpts ]]; then
    echo "\n\t${yellow}Sorry. You did not pick a valid remote.${nc}"
  else
    remote=${remoteOptions[$remoteOpt]}
    echo "${nc}\n\tOK. We'll push to ${cyan}$remote${nc}.\n"
  fi
done

# get everything ready
echo "Updating bower components and generating build file.\n"
bower update
grunt build

# figure out the version
version=$(cat VERSION)

# if we bumped, push this branch too
if [[ $bumped ]]; then 
  echo "Pushing updated version to ${cyan}${branch}${nc}.\n"
  git commit -am "bump to v${version}"
  git push origin $branch
fi

# checkout a branch for this version
echo "Checking out ${cyan}latest${nc} branch for ${cyan}v${version}${nc}.\n"
git branch -D latest
git checkout -b latest

# add the distribution file & push it
echo "Adding build file to latest branch and pushing to remote.\n"
git add ${project}.min.js
git commit -am "v${version}"
git push origin latest --force

# remove "latest" tag on the remote & create a new local one
echo "Creating new tag for ${cyan}v${version}${nc} and pushing to remote.\n"
git tag -f v${version}

# push up new tags
echo "Pushing tags up to remote.\n"
git push origin --tags

# cleanup
echo "Cleaning up and checking out ${cyan}${branch}${nc}.\n"
rm -rf VERSION

# go back to where you started
git checkout $branch

echo "${green}Done!${nc}\n\n"