#!/usr/bin/env bash

set -e

rm -rf .sync

main() {
  git log -1 --pretty=%B | cat |
  if read -r MESSAGE
  then
    echo "last commit message:"
    echo "$MESSAGE"

    local CREATED=1

    ORIGIN=https://user:"$GH_TOKEN"@github.com/"$TRAVIS_REPO_SLUG".git

    {
      git clone "$ORIGIN" .sync -b gh-pages
    } || {
      echo "branch \`gh-pages\` has not been created"
      CREATED=0
      mkdir .sync
      cd .sync
      git init
      git checkout -b gh-pages
      git remote add origin "$ORIGIN"
      cd ..
    }

    rm -rf .sync/*

    cd .sync
    cp -rf ../dist/* .
    cp ../*.md .

    git add -A
    git status -s |
    if read -r
    then
      git commit -m "$MESSAGE"

      if [ "$CREATED" == "1" ]
      then
        git push --quiet
      else
        echo "first push, create \`gh-pages\` branch"
        git push --quiet --set-upstream origin gh-pages
      fi
    else
      echo "there is nothing changed to commit"
    fi

    rm -rf .sync
  fi
}

main
