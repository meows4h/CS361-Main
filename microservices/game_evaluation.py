import zmq

port = "13760"

# zeromq
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind(f'tcp://*:{port}')
print(f"Microservice B Connected to port {port}.")

step = 1

while True:
    
    reply = ''

    message = socket.recv()
    message = message.decode('utf-8')
    print(f'Received request: "{message}"')

    message_arr = message.split(' ')

    correct = False

    selection = message_arr[0] # circle choice
    job = message_arr[1] # job selection
    position = message_arr[2] # position selection
    chains = message_arr[3] # chain state

    # reset
    if selection == -1: 
        step = 1
    
    if job == "dps":

        if step == 1:
    
            if chains == 0:
                correct = (selection == 1)
                chains = 1
            else:
                correct = True

    elif job == "tank":
        print('not yet implmented...')

    elif job == "healer":
        print('not yet implmented...')
    

    reply = reply.encode('utf-8')
    socket.send(reply)