// Sound effects using Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration, type = 'sine') {
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
}

function playPiggyBankSound() {
    // Coin dropping into piggy bank - metallic clink sound
    const now = audioContext.currentTime;
    
    // High metallic clink
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    osc1.frequency.setValueAtTime(800, now);
    osc1.frequency.exponentialRampToValueAtTime(400, now + 0.15);
    osc1.type = 'triangle';
    gain1.gain.setValueAtTime(0.4, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc1.start(now);
    osc1.stop(now + 0.15);

    // Secondary resonance for more metallic feel
    setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.frequency.value = 1200;
        osc2.type = 'sine';
        gain2.gain.setValueAtTime(0.2, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
        osc2.start(audioContext.currentTime);
        osc2.stop(audioContext.currentTime + 0.08);
    }, 30);
}

function playATMWithdrawalSound() {
    // ATM withdrawal sound - beep sequence
    const now = audioContext.currentTime;
    
    // Three ascending beeps characteristic of ATM
    const beeps = [
        { freq: 800, time: 0 },
        { freq: 1000, time: 0.12 },
        { freq: 1200, time: 0.24 }
    ];

    beeps.forEach((beep) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.value = beep.freq;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.25, now + beep.time);
        gain.gain.linearRampToValueAtTime(0.25, now + beep.time + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + beep.time + 0.12);
        
        osc.start(now + beep.time);
        osc.stop(now + beep.time + 0.12);
    });
}

function playApplauseSound() {
    // Applause sound - random frequency bursts with white noise effect
    const now = audioContext.currentTime;
    
    // Create multiple quick "claps" with varying tones
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            const filter = audioContext.createBiquadFilter();
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(audioContext.destination);
            
            // Random frequency for each clap between 400-800Hz
            osc.frequency.value = 400 + Math.random() * 400;
            osc.type = 'triangle';
            filter.type = 'highpass';
            filter.frequency.value = 200;
            
            gain.gain.setValueAtTime(0.3, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.1);
        }, i * 120);
    }

    // Add a celebratory tone at the end
    setTimeout(() => {
        playSound(523.25, 0.2); // C5 note
        setTimeout(() => playSound(659.25, 0.2), 150); // E5 note
    }, 600);
}

function playFailureSound() {
    // Failure/error sound - sad descending tone
    const now = audioContext.currentTime;
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.4);
    osc.type = 'square';
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    osc.start(now);
    osc.stop(now + 0.4);
}

// Canadian Currency Denominations
const DENOMINATIONS = [
    { value: 100, label: '$100', type: 'note', class: 'note-100' },
    { value: 50, label: '$50', type: 'note', class: 'note-50' },
    { value: 20, label: '$20', type: 'note', class: 'note-20' },
    { value: 10, label: '$10', type: 'note', class: 'note-10' },
    { value: 5, label: '$5', type: 'note', class: 'note-5' },
    { value: 2, label: '$2', type: 'coin', class: 'coin-200' },
    { value: 1, label: '$1', type: 'coin', class: 'coin-100' },
    { value: 0.25, label: '25¢', type: 'coin', class: 'coin-025' },
    { value: 0.1, label: '10¢', type: 'coin', class: 'coin-010' },
    { value: 0.05, label: '5¢', type: 'coin', class: 'coin-005' },
    { value: 0.01, label: '1¢', type: 'coin', class: 'coin-001' }
];

let targetAmount = 0;
let collectedItems = [];

// Initialize
document.getElementById('instructorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('targetAmount').value);
    
    if (amount <= 0) {
        document.getElementById('errorMessage').textContent = 'Please enter a valid amount greater than 0';
        return;
    }
    
    if (isNaN(amount)) {
        document.getElementById('errorMessage').textContent = 'Please enter a valid number';
        return;
    }

    targetAmount = amount;
    startStudentActivity();
});

function startStudentActivity() {
    document.getElementById('instructorSection').style.display = 'none';
    document.getElementById('studentSection').classList.add('active');
    
    // Display target amount
    document.getElementById('displayTarget').textContent = '$' + targetAmount.toFixed(2);
    
    // Initialize available denominations
    initializeAvailableDenominations();
}

function initializeAvailableDenominations() {
    const availableArea = document.getElementById('availableArea');
    availableArea.innerHTML = '';
    
    DENOMINATIONS.forEach((denom, index) => {
        const item = document.createElement('div');
        item.className = `currency-item ${denom.class}`;
        item.textContent = denom.label;
        item.draggable = true;
        item.dataset.value = denom.value;
        item.dataset.label = denom.label;
        item.dataset.class = denom.class;
        item.dataset.id = index;
        
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        
        availableArea.appendChild(item);
    });
}

function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', JSON.stringify({
        value: parseFloat(e.target.dataset.value),
        label: e.target.dataset.label,
        class: e.target.dataset.class
    }));
}

function handleDragEnd(e) {
    e.preventDefault();
}

const collectionArea = document.getElementById('collectionArea');

collectionArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    collectionArea.classList.add('drag-over');
});

collectionArea.addEventListener('dragleave', function(e) {
    if (e.target === collectionArea) {
        collectionArea.classList.remove('drag-over');
    }
});

collectionArea.addEventListener('drop', function(e) {
    e.preventDefault();
    collectionArea.classList.remove('drag-over');
    
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    addToCollection(data);
});

function addToCollection(item) {
    collectedItems.push(item);
    playPiggyBankSound();
    
    const collectedItem = document.createElement('div');
    collectedItem.className = `currency-item collected-currency-item ${item.class}`;
    collectedItem.textContent = item.label;
    
    collectedItem.addEventListener('click', function() {
        // Remove the item from collection
        const index = collectedItems.indexOf(item);
        if (index !== -1) {
            collectedItems.splice(index, 1);
        }
        playATMWithdrawalSound();
        collectedItem.remove();
    });
    
    collectionArea.appendChild(collectedItem);
}

document.getElementById('submitBtn').addEventListener('click', function() {
    const total = collectedItems.reduce((sum, item) => sum + item.value, 0);
    
    // Allow for small floating point rounding errors
    const difference = Math.abs(total - targetAmount);
    if (difference < 0.001) {
        // Show success modal
        playApplauseSound();
        document.getElementById('successAmount').textContent = '$' + total.toFixed(2);
        document.getElementById('successModal').classList.add('active');
    } else {
        // Show failure modal
        playFailureSound();
        const actualDifference = total - targetAmount;
        document.getElementById('failureTarget').textContent = '$' + targetAmount.toFixed(2);
        document.getElementById('failureAmount').textContent = '$' + total.toFixed(2);
        document.getElementById('failureDifference').textContent = '$' + Math.abs(actualDifference).toFixed(2) + ' ' + (actualDifference > 0 ? 'too much' : 'short');
        document.getElementById('failureModal').classList.add('active');
    }
});

document.getElementById('backBtn').addEventListener('click', function() {
    resetToInstructor();
});

document.getElementById('newGameBtn').addEventListener('click', function() {
    resetToInstructor();
});

document.getElementById('retryBtn').addEventListener('click', function() {
    // Clear collection but keep target amount
    collectedItems = [];
    document.getElementById('collectionArea').innerHTML = '';
    document.getElementById('failureModal').classList.remove('active');
});

document.getElementById('giveUpBtn').addEventListener('click', function() {
    resetToInstructor();
});

function resetToInstructor() {
    // Hide all modals
    document.getElementById('successModal').classList.remove('active');
    document.getElementById('failureModal').classList.remove('active');
    
    // Reset to instructor section
    document.getElementById('instructorSection').style.display = 'block';
    document.getElementById('studentSection').classList.remove('active');
    document.getElementById('targetAmount').value = '';
    document.getElementById('errorMessage').textContent = '';
    collectedItems = [];
    document.getElementById('collectionArea').innerHTML = '';
    targetAmount = 0;
}
