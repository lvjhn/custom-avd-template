import json 
import re

project = json.load(open("./project.json"))
dockerfile = open("./.avd/Dockerfile.backend").read()
output = dockerfile

output = output.replace("#PROJECT_NAME#", project["name"])

backend = project["backend"]

for variable in backend: 
    value = backend[variable] 
    output = re.sub("#" + variable + "#", value, output)

print(output)