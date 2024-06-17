import json 
import re

project = json.load(open("./project.json"))
dockerfile = open("./.avd/docker-compose.yml").read()

compose = project["docker-compose"]

output = dockerfile.replace("#PROJECT_NAME#", project["name"])

for variable in compose: 
    value = compose[variable] 
    output = re.sub("#" + variable + "#", value, output)

print(output)