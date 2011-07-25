#!/bin/bash
function run_friends {
	for (( c=0; $c < 30; c=c+1 )); do
		if [[ -s 'friend'$c ]]; then
			echo 'hi' 'friend'$c 'not_friend'$c 'friend'$((c+1)) 'not_friend'$((c+1))
			time ./leven.bash 'friend'$c 'not_friend'$c 'friend'$((c+1)) 'not_friend'$((c+1))
		else
			break;
		fi
	done
#time ./leven.bash friend0 not_friend0 friend1 not_friend1
#time ./leven.bash friend1 not_friend1 friend2 not_friend2
#time ./leven.bash friend2 not_friend2 friend3 not_friend3
#time ./leven.bash friend3 not_friend3 friend4 not_friend4
#time ./leven.bash friend4 not_friend4 friend5 not_friend5
#time ./leven.bash friend5 not_friend5 friend6 not_friend6
#time ./leven.bash friend6 not_friend6 friend7 not_friend7
#time ./leven.bash friend7 not_friend7 friend8 not_friend8
#time ./leven.bash friend8 not_friend8 friend9 not_friend9
#time ./leven.bash friend9 not_friend9 friend10 not_friend10
#time ./leven.bash friend10 not_friend10 friend11 not_friend11
#time ./leven.bash friend11 not_friend11 friend12 not_friend12
}

function friend_count {
	echo wc friend[[:digit:]] friend[[:digit:]][[:digit:]]
	wc friend[[:digit:]] friend[[:digit:]][[:digit:]]

# 052711$ wc friend[[:digit:]] friend[[:digit:]][[:digit:]]
#        1       1       7 friend0
#       18      18     129 friend1
#      110     110     751 friend2
#      792     792    5237 friend3
#     3903    3903   25278 friend4
#    11003   11003   71501 friend5
#    16412   16412  110588 friend6
#    13443   13443  100409 friend7
#     9802    9802   78770 friend8
#     7324    7324   61924 friend9
#     5392    5392   47646 friend10
#     3534    3534   32333 friend11
#     2339    2339   21951 friend12
#     1522    1522   14521 friend13
#     1014    1014    9757 friend14
#      670     670    6570 friend15
#      434     434    4297 friend16
#      224     224    2234 friend17
#      152     152    1514 friend18
#      118     118    1211 friend19
#       83      83     880 friend20
#       59      59     642 friend21
#       36      36     403 friend22
#       31      31     352 friend23
#       17      17     188 friend24
#       12      12     126 friend25
#       14      14     138 friend26
#       13      13     131 friend27
#        7       7      73 friend28
#        3       3      31 friend29
#        0       0       0 friend30
#    78482   78482  599592 total
#
# 052711$ wc friend0 not_friend0
#        1       1       7 friend0
#   264060  264060 2721575 not_friend0
#   264061  264061 2721582 total
#
# 052711$ diff word.list not_friend0
# 33419d33418
# < causes
}

