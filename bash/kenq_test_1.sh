#! /bin/sh
xdotool sleep 0.25
# Click main menu view
xdotool mousemove 97 103 click 1
xdotool sleep 3.0

xdotool key Page_Up
xdotool sleep 0.25

xdotool key Page_Up
xdotool sleep 0.25


xdotool key Page_Up
xdotool sleep 0.25

xdotool key Page_Up
xdotool sleep 0.25


xdotool key Page_Up
xdotool sleep 0.25

xdotool key Page_Up
xdotool sleep 0.25

xdotool key Page_Up
xdotool sleep 0.25

xdotool key Page_Up
xdotool sleep 0.25


xdotool key Page_Up
xdotool sleep 0.25

xdotool key Page_Up
xdotool sleep 0.25


xdotool key Page_Down
xdotool sleep 0.25

xdotool key Page_Down
xdotool sleep 0.25

# Demo
xdotool mousemove 630 760 click 1
xdotool sleep 0.25
# Lipset
xdotool mousemove 670 960 click 1
xdotool sleep 0.25

xdotool key Page_Down
xdotool sleep 0.25

xdotool key Page_Down
xdotool sleep 0.25

# Start Analysis
xdotool mousemove 715 790 click 1
xdotool sleep 0.25

xdotool key Page_Down
xdotool sleep 0.25

xdotool key Page_Down
xdotool sleep 0.25


# dropdown Centroid
# principal comp
xdotool mousemove 625 400 click 1
xdotool sleep 0.25
# centroid dropdown select 8
#xdotool mousemove 180 770 click 1
#xdotool sleep 0.25
# centroid factors button
#xdotool mousemove 314 800 click 1
#xdotool sleep 0.25


xdotool key Page_Down
xdotool sleep 0.25

xdotool key Page_Down
xdotool sleep 0.25

# Fac Keep dropdown
xdotool mousemove 875 705 click 1
xdotool sleep 0.25
# 8 
xdotool mousemove 880 660 click 1
xdotool sleep 0.25
# submit
xdotool mousemove 960 695 click 1
xdotool sleep 0.25

# varimax button
xdotool mousemove 600 875 click 1
xdotool sleep 0.25

xdotool key Page_Down
xdotool sleep 0.25

xdotool key Page_Down
xdotool sleep 0.25

# autoflag
xdotool mousemove 785 400 click 1
xdotool sleep 0.25

# send to output
xdotool mousemove 400 360 click 1
xdotool sleep 0.25

xdotool key Page_Down
xdotool sleep 0.25


:'
hidden code block
'

echo -e "\a"
echo -e "\07"

#( speaker-test -t sine -f 1000 ) & pid=$! ; sleep 0.1s ; kill -9 $pid

#play -q -n synth 0.1 sin 880 || echo -e "\a"

paplay button-15.wav

#aplay button-15.wav

tput bel
