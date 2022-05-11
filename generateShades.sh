#! /bin/bash

function generateShades() {
  echo 'Enter RGB values:';
  read -p 'R:' r;
  read -p 'G:' g;
  read -p 'B:' b;
  STATUS=$(node shadesGenerator.js ${r} ${g} ${b})
  if [[ $STATUS -ne 0 ]]
  then
    echo 'Invalid RGB values!'
  else
    open index.html;
  fi
}

generateShades
