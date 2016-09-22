#!/bin/bash

x=0
load_balancer_url=$1

while [[ true ]]; do
       	curl $load_balancer_url
       	printf "\n"

       	if [[ `expr $x % 2` = 0 ]]; then
       		printf "+\n"
       	else
       		printf "*\n"
       	fi

       	x=`expr $x + 1`
       	sleep 0.5
done