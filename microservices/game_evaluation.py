import zmq

port = "13760"

# zeromq
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind(f'tcp://*:{port}')
print(f"Microservice B Connected to port {port}.")

step = 1

last_dive_spot = -1
dive_prio = -1

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
    dives = message_arr[4].split(',') # dives
    dives = dives[0:2]

    # reset
    if selection == -1: 
        step = 1
        last_dive_spot = -1
        dive_prio = -1
    
    if job == "melee":
        print('not yet implemented...')

    elif job == "ranged":

        # chains swap check
        if step == 1:
    
            if chains == 0:
                correct = (selection == 1)
                chains = 1
            else:
                correct = True

        # orb prepos
        if step == 2:

            if position == 1: # north
                correct = (selection == 7)
            else: # south
                correct = (selection == 9)

            step += 1

        # orb popping melee (skip)

        # orb popping ranged
        if step == 4:

            if position == 1: # north
                correct = (selection == 8)
            else:
                correct = (selection == 10)

        # dives prepos
        if step == 5:

            if position == 1:
                correct = (selection == 15)
                last_dive_spot = 4
            else:
                correct = (selection == 17)
                last_dive_spot = 3
                
        # dive 1 - ranged prio save
        if step == 6:

            if last_dive_spot in dives:
                correct = (selection == 2)
                last_dive_spot = 0

                if last_dive_spot == 4: # ccw always
                    dive_prio = 1

                elif (3 in dives and 4 in dives) and last_dive_spot == 3: # cw
                    dive_prio = 0

                else: # ccw
                    dive_prio = 1

            else:
                if position == 1:
                    correct = (selection == 15)
                else:
                    correct = (selection == 17)

        # dive 2
        if step == 7:

            if last_dive_spot == 0:
                correct = (selection == 2)

            elif last_dive_spot in dives:
                


    elif job == "tank":
        print('not yet implmented...')

    elif job == "healer":
        print('not yet implmented...')

    if correct:
        step += 1
    else:
        step = 1
        last_dive_spot = -1
        dive_prio = -1
    
    reply = f'{correct} {chains} {step}'
    reply = reply.encode('utf-8')
    socket.send(reply)