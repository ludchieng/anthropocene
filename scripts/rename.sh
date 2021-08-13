#!/bin/bash
# Retrieve njk files sort them in alphabetical order
# and rename them: "##-##.njk"

# Checks arg validity
if ! [[ $1 =~ ^[0-9][0-9]$ ]]; then
  echo "Exited: Arg must be a 2-digit number"
  exit 1
fi


# Retrieves only first candidate and renames its child files

pattern="./src/$1*"
files=( $pattern )

bakDir=${files[0]}/slides/$(printf "bak-%s" "$(date +"%Y-%m-%d-%H%M%S-%N")")
mkdir $bakDir

count=2

for old in `ls "${files[0]}/slides" | grep ".njk"`
do
  mv "${files[0]}/slides/$old" "$bakDir/$old"
done

for old in `ls $bakDir | grep '.njk'`
do
  new=$(printf "$1-%02d.njk" "${count}" )
  echo -e "$old   \t->   $new" >> "$bakDir/rename.log"
  cp -n "$bakDir/$old" "${files[0]}/slides/$new"
  count=$((count+1))
done
