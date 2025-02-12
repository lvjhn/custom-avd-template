####################
# INSTALLER SCRIPT #
####################

#
# This script installs the current version of AdonisJS and and VueJS
# on the project directory.
#

set -e 
source  ./utils/helpers/shell.sh 

function main {
    # print program header 
    print_program_header "| CUSTOM-AOVD-TEMPLATE (PREPARER)" "1.0.0"
    echo "|"

    # main program flow 
    elevate_privileges 
    prepare

    echo 
}

function prepare {
    prepare_backend 
    prepare_frontend 

    echo "Done."
}

function prepare_backend {
    display_header "| @ Preparing back-end."
    echo

    cd ./backend
    npm install 
    cd ../
}

function prepare_frontend {
    display_header "| @ Preparing front-end."
    echo

    cd ./frontend 
    npm install 
    npm install vue-router pinia axios 
    cd ../
}

main