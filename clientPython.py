import http.client
import json
# en vez de localhost poner la ip del servidor: 127.0.0.1
conn = http.client.HTTPConnection("127.0.0.1", 5000)
data = {"username": "test", "password": "test12"}
json_data = json.dumps(data)

headers = {'Content-type': 'application/json'}

conn.request("POST", "/players/add", body=json_data, headers=headers )

response = conn.getresponse()
print("Status", response.status )
print("Response", response.read().decode())

print("\n get")

# GET
conn.request("GET", "/players") #realizando request a la ruta /players
response = conn.getresponse() #guardando la respuesta en la variable response
# es como una concatenacion de strings
print("Status", response.status )
print("Response", response.read().decode())
# decode() para que no salga en bytes


# DELETE
print("\n delete")
conn.request("DELETE", "/players/delete/3") #realizando request a la ruta /players
response = conn.getresponse() #guardando la respuesta en la variable response
print("Status", response.status )
print("Response", response.read().decode())

data = {"id":6,"username": "rd", "password": "ted"}
json_data = json.dumps(data)

headers = {'Content-type': 'application/json'}
# update
print("\n update")
conn.request("PUT", "/players/update", body=json_data, headers=headers ) #realizando request a la ruta /players
response = conn.getresponse()
print("Status", response.status )
print("Response", response.read().decode())
conn.request("GET", "/players") #realizando request a la ruta /players
response = conn.getresponse() #guardando la respuesta en la variable response
# es como una concatenacion de strings
print("Status", response.status )
print("Response", response.read().decode())
conn.close()
