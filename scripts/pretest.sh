#!/bin/bash
if [ -a fakes3.pid ]
then
  kill -n 2 `cat fakes3.pid`
  rm fakes3.pid
fi
rm -rf tmp
fakes3 -r tmp -p 2345 & echo $! > fakes3.pid
