#!/bin/bash
if [ $# -ne 4 ]; then
	echo "Usage: $0 friend0 not_friend0 friend1 not_friend1"
	exit 1
fi

function find_friend {
	friend0=$1; echo "friend0 (${friend0})"
	not_friend0=$2;	echo "not_friend0 (${not_friend0})"
	friend1=$3; echo "friend1 (${friend1})"
	not_friend1=$4;	echo "not_friend1 (${not_friend1})"
	joiner='\|'
	cp ${not_friend0} not_friends
	: > friends
	while read line; do
		echo '('${line}')'
		n=${#line}
		regex=""
		c=0
		while [[ $c -lt $n ]]; do
			start='\<'${line:0:$c}
			q='[^'${line:$c:1}']\{0,1\}'
			end=${line:($c+1)}'\>'
			regex=${regex}${joiner}${start}${q}${end}
			let c=c+1 
		done
 		q='[a-z]\{1,1\}'
		c=0
		while [[ $c -le $n ]]; do
			start='\<'${line:0:$c}
			end=${line:$c}'\>'
			regex=${regex}${joiner}${start}${q}${end}
			let c=c+1 
		done
		if [[ "${regex:0:${#joiner}}" == "${joiner}" ]]; then
			regex=${regex:${#joiner}}
		fi
		echo "grep ${regex} not_friends"
		grep ${regex} not_friends | tee friends_tmp
		if [[ -s friends_tmp ]]; then
			echo "grep --invert-match --word-regexp -ffriends_tmp not_friends"
			grep --invert-match --word-regexp -ffriends_tmp not_friends > not_friends_tmp
			echo "mv -f not_friends_tmp not_friends"
			mv -f not_friends_tmp not_friends
			cat friends_tmp >> friends
		fi
	done < ${friend0}
	mv -f friends ${friend1}
	mv -f not_friends ${not_friend1}
}

find_friend $@

