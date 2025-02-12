NAME=$(cat project.json | python3 -c "import json,sys ;obj=json.load(sys.stdin);print(obj['name']);")
sudo docker exec -it $NAME.$1 bash