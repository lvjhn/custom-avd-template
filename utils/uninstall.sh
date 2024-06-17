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
    print_program_header "| CUSTOM-AOVD-TEMPLATE (UNINSTALLER)" "1.0.0"
    echo "|"

    # main program flow 
    elevate_privileges 
    uninstall

    echo "Done."
}

function uninstall {
    uninstall_adonisjs 
    uninstall_vuejs
}

function uninstall_adonisjs {
    display_header "| @ Uninstalling AdonisJS"
    echo

    sudo rm -rf ./backend
}


function uninstall_vuejs {
    display_header "| @ Uninstalling VueJS"
    echo

    sudo rm -rf ./frontend
}

function uninstall_vuejs {
    display_header "| @ Uninstalling Docker files."
    echo

    rm -rf ./docker-compose.yml
}

main