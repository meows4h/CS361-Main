import zmq

port = "13758"

# zeromq
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind(f'tcp://*:{port}')
print(f"Microservice D Connected to port {port}.")


while True:
    
    reply = ''

    message = socket.recv()
    message = message.decode('utf-8')
    print(f'Received request: "{message}"')

    reply = reply.encode('utf-8')
    socket.send(reply)