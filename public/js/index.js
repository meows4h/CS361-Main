let jobSelect = "dps";
let positionSelect = 1;
let chains = Math.floor(Math.random() * 2); // 0 - red, 1 blue

const contextText = document.querySelector('.gameContext');
if (chains == 0) {
    contextText.innerHTML = contextText.innerHTML.replace('[]', '[red]');
} else {
    contextText.innerHTML = contextText.innerHTML.replace('[]', '[blue]');
}

// class select
document.querySelectorAll('.classSelect').forEach(img => {
    img.addEventListener('click', (event) => {

        const classID = event.target.getAttribute('data-class');

        const classContainer = document.querySelector('.classContainer');
        

        if (classID == 0) {

            event.target.src = './images/index/tank.png';
            event.target.setAttribute('data-class', 1); 
            event.target.classList.remove('w3-border-red');
            event.target.classList.add('w3-border-blue');

            classContainer.classList.remove('w3-pale-red')
            classContainer.classList.add('w3-pale-blue')

            contextText.innerHTML = contextText.innerHTML.replace('[dps]', '[tank]')

            jobSelect = "tank";

        } else if (classID == 1) {

            event.target.src = './images/index/healer.png';
            event.target.setAttribute('data-class', 2); 
            event.target.classList.remove('w3-border-blue');
            event.target.classList.add('w3-border-green');

            classContainer.classList.remove('w3-pale-blue')
            classContainer.classList.add('w3-pale-green')

            contextText.innerHTML = contextText.innerHTML.replace('[tank]', '[healer]')

            jobSelect = "healer";

        } else {

            event.target.src = './images/index/dps.png';
            event.target.setAttribute('data-class', 0); 
            event.target.classList.remove('w3-border-green');
            event.target.classList.add('w3-border-red');

            classContainer.classList.remove('w3-pale-green')
            classContainer.classList.add('w3-pale-red')

            contextText.innerHTML = contextText.innerHTML.replace('[healer]', '[dps]')

            jobSelect = "dps";

        }
    })
})

// position select
document.querySelectorAll('.positionSelect').forEach(img => {
    img.addEventListener('click', (event) => {

        const classID = event.target.getAttribute('data-class');


        if (classID == 0) {

            event.target.src = './images/index/2.png';
            event.target.setAttribute('data-class', 1); 
            positionSelect = 2;
            contextText.innerHTML = contextText.innerHTML.replace('[1]', '[2]')

        } else {

            event.target.src = './images/index/1.png';
            event.target.setAttribute('data-class', 0); 
            positionSelect = 1;
            contextText.innerHTML = contextText.innerHTML.replace('[2]', '[1]')

        }
    })
})

// move choice
document.querySelectorAll('.playerMove').forEach(img => {
    img.addEventListener('click', (event) => {

        const positionID = event.target.getAttribute('data-id');

        fetch('/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({positionID: positionID, jobSelect: jobSelect, positionSelect: positionSelect, chains: chains})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);
        })
    })
})