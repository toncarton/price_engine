set -e

echo '[#] Run all tests'
npm test

echo '[#] Format JS files'
npm run format

echo '[#] Prepare price engines for toncarton'
FILES=`find "$(pwd)/temp" -type f -name "*.js"`

for file in $FILES
do
    file_name_src=`basename $file`
    file_path_dst="$(dirname $file)/../dist/tct_$file_name_src"

    node ./bin/format.js $file $file_path_dst
done
