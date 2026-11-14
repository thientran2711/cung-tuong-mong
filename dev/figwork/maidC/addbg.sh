# addbg.sh "jid..." "bg..." : append "jid gen bg" (gen from gens.txt, last entry) to bg.txt
cd "$(dirname "$0")"; set -- $1 -- $2; js=(); while [ "$1" != "--" ]; do js+=("$1"); shift; done; shift
for j in "${js[@]}"; do g=$(awk -v j=$j '$1==j{g=$2}END{print g}' gens.txt); echo "$j $g $1" >> bg.txt; shift; done; tail -n ${#js[@]} bg.txt
