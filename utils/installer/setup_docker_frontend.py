import json 
import re

project = json.load(open("./project.json"))
dockerfile = open("./.avd/Dockerfile.frontend").read()
output = dockerfile

output = output.replace("#PROJECT_NAME#", project["name"])

frontend = project["frontend"]

for variable in frontend: 
    value = frontend[variable] 
    output = re.sub("#" + variable + "#", value, output)

print(output)