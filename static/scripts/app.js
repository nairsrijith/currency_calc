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

let targetAmounts = [];
let currentAmountIndex = 0;
let completedAmounts = [];
let remainingAmounts = [];
let collectedItems = [];
let amountProgress = [];  // Track status of each amount: {amount, status}
let consecutiveCorrect = 0;  // Track consecutive correct submissions

// Array of congratulatory messages with increasing intensity
const congratulatoryMessages = [
    "That correct!",
    "Excellent work!",
    "Amazing job!",
    "You're on fire! 🔥",
    "That's incredible! 🌟",
    "You're unstoppable!",
    "Absolutely brilliant! 💎",
    "You're a genius!",
    "Unbelievable! 🚀"
];

// Add amount button
document.getElementById('addAmountBtn').addEventListener('click', function() {
    const input = document.getElementById('targetAmount');
    const amount = parseFloat(input.value);
    const errorMessage = document.getElementById('errorMessage');
    
    if (isNaN(amount) || amount <= 0) {
        errorMessage.textContent = 'Please enter a valid amount greater than 0';
        return;
    }
    
    // Check if maximum amounts reached (10)
    if (targetAmounts.length >= 10) {
        errorMessage.textContent = 'Maximum 10 amounts allowed';
        return;
    }
    
    // Check for duplicate amounts
    if (targetAmounts.includes(amount)) {
        errorMessage.textContent = 'This amount has already been added';
        return;
    }
    
    // Add to list
    targetAmounts.push(amount);
    errorMessage.textContent = '';
    
    // Update UI
    updateAmountsList();
    input.value = '';
    input.focus();
    
    // Enable start button
    document.getElementById('startActivityBtn').disabled = false;
});

function updateAmountsList() {
    const list = document.getElementById('addedAmounts');
    list.innerHTML = '';
    
    targetAmounts.forEach((amount, index) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.padding = '10px';
        li.style.backgroundColor = '#f0f3ff';
        li.style.marginBottom = '8px';
        li.style.borderRadius = '5px';
        
        const amountSpan = document.createElement('span');
        amountSpan.textContent = 'CAD ' + amount.toFixed(2);
        amountSpan.style.fontWeight = 'bold';
        amountSpan.style.fontSize = '1.1em';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remove';
        deleteBtn.className = 'btn-delete-amount';
        deleteBtn.style.padding = '5px 15px';
        deleteBtn.style.fontSize = '0.9em';
        deleteBtn.style.backgroundColor = '#dc3545';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '4px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.addEventListener('click', function() {
            targetAmounts.splice(index, 1);
            updateAmountsList();
            if (targetAmounts.length === 0) {
                document.getElementById('startActivityBtn').disabled = true;
            }
        });
        
        li.appendChild(amountSpan);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Start Activity button
document.getElementById('startActivityBtn').addEventListener('click', function(e) {
    e.preventDefault();
    if (targetAmounts.length > 0) {
        // Shuffle amounts and set up remaining amounts
        remainingAmounts = [...targetAmounts];
        completedAmounts = [];
        consecutiveCorrect = 0;  // Reset consecutive correct counter
        // Initialize progress tracker with presentedOrder to track the order shown to student
        amountProgress = targetAmounts.map(amount => ({amount, status: 'pending', presentedOrder: null}));
        startStudentActivity();
    }
});

function startStudentActivity() {
    document.getElementById('instructorSection').style.display = 'none';
    document.getElementById('studentSection').classList.add('active');
    
    // Pick first random amount
    pickNextAmount();
}

function pickNextAmount() {
    if (remainingAmounts.length === 0) {
        // All amounts completed
        showCompletionModal();
        return;
    }
    
    // Pick a random amount from remaining
    const randomIndex = Math.floor(Math.random() * remainingAmounts.length);
    const currentAmount = remainingAmounts[randomIndex];
    
    // Remove from remaining and add to completed list
    remainingAmounts.splice(randomIndex, 1);
    
    // Find the index of this amount in amountProgress for tracking
    const progressIndex = amountProgress.findIndex(item => item.amount === currentAmount && item.status === 'pending');
    window.currentProgressIndex = progressIndex;
    
    // Track the order this amount was presented (count of non-pending items + 1)
    const presentedOrder = amountProgress.filter(item => item.presentedOrder !== null).length + 1;
    amountProgress[progressIndex].presentedOrder = presentedOrder;
    
    // Update current amount display
    document.getElementById('displayTarget').textContent = 'CAD ' + currentAmount.toFixed(2);
    
    // Store current amount for submission
    window.currentTargetAmount = currentAmount;
    
    // Clear collection area
    collectedItems = [];
    document.getElementById('collectionArea').innerHTML = '';
    
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

function showGameSummary() {
    // Calculate summary statistics
    let correctCount = 0;
    let skippedCount = 0;
    let unansweredCount = 0;
    
    amountProgress.forEach(item => {
        if (item.status === 'correct') {
            correctCount++;
        } else if (item.status === 'skipped') {
            skippedCount++;
        } else if (item.status === 'pending') {
            unansweredCount++;
        }
    });
    
    // Update summary modal with counts
    document.getElementById('summaryCorrect').textContent = correctCount;
    document.getElementById('summarySKipped').textContent = skippedCount;
    document.getElementById('summaryUnanswered').textContent = unansweredCount;
    
    // Display trophy progress
    document.getElementById('summaryTrophies').innerHTML = renderTrophyProgress();
    
    // Show summary modal
    document.getElementById('summaryModal').classList.add('active');
}

function renderTrophyProgress() {
    let html = '<div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">';
    
    // Sort by presentedOrder to show in the order student saw them
    const sortedProgress = [...amountProgress].sort((a, b) => {
        if (a.presentedOrder === null && b.presentedOrder === null) return 0;
        if (a.presentedOrder === null) return 1;
        if (b.presentedOrder === null) return -1;
        return a.presentedOrder - b.presentedOrder;
    });
    
    sortedProgress.forEach((item, index) => {
        let trophy = '';
        let title = '';
        let statusClass = '';
        
        if (item.status === 'correct') {
            trophy = '🏆';  // Golden trophy
            title = 'Correct';
            statusClass = 'trophy-correct';
        } else if (item.status === 'skipped') {
            trophy = '<div class="trophy-with-cross"><span class="trophy-base">🏆</span><span class="trophy-cross">❌</span></div>';  // Trophy with red cross overlay
            title = 'Skipped';
            statusClass = 'trophy-skipped';
        } else {
            trophy = '🏆';  // Greyed out trophy for pending
            title = 'Upcoming';
            statusClass = 'trophy-pending';
        }
        
        html += `<div class="trophy-item ${statusClass}" title="${title}: CAD ${item.amount.toFixed(2)}">${trophy}</div>`;
    });
    
    html += '</div>';
    return html;
}

document.getElementById('submitBtn').addEventListener('click', function() {
    const total = collectedItems.reduce((sum, item) => sum + item.value, 0);
    const targetAmount = window.currentTargetAmount;
    
    // Allow for small floating point rounding errors
    const difference = Math.abs(total - targetAmount);
    if (difference < 0.001) {
        // Update progress to correct
        if (window.currentProgressIndex !== undefined) {
            amountProgress[window.currentProgressIndex].status = 'correct';
        }
        
        // Increment consecutive correct counter
        consecutiveCorrect++;
        
        // Show success modal with next/forfeit options
        playApplauseSound();
        document.getElementById('successAmount').textContent = 'CAD ' + total.toFixed(2);
        
        // Update congratulatory message based on consecutive correct submissions
        const messageIndex = Math.min(consecutiveCorrect - 1, congratulatoryMessages.length - 1);
        document.getElementById('successMessage').textContent = congratulatoryMessages[messageIndex];
        
        // Update progress info - count all attempted (correct, skipped, or incorrectly answered)
        const totalAmounts = targetAmounts.length;
        const attemptedCount = amountProgress.filter(item => item.status !== 'pending').length;
        document.getElementById('progressText').textContent = `Progress: ${attemptedCount}/${totalAmounts}`;
        
        // Display trophy progress
        document.getElementById('successTrophies').innerHTML = renderTrophyProgress();
        
        // Track this as completed
        completedAmounts.push(targetAmount);
        
        // Show appropriate buttons
        if (remainingAmounts.length > 0) {
            // More amounts to do
            document.getElementById('nextAmountBtn').style.display = 'block';
            document.getElementById('finalNewGameBtn').style.display = 'none';
        } else {
            // Last amount was completed
            document.getElementById('nextAmountBtn').style.display = 'none';
            document.getElementById('finalNewGameBtn').style.display = 'block';
        }
        
        document.getElementById('successModal').classList.add('active');
    } else {
        // Show failure modal
        playFailureSound();
        
        // Reset consecutive correct counter on wrong answer
        consecutiveCorrect = 0;
        const actualDifference = total - targetAmount;
        document.getElementById('failureTarget').textContent = 'CAD ' + targetAmount.toFixed(2);
        document.getElementById('failureAmount').textContent = 'CAD ' + total.toFixed(2);
        document.getElementById('failureDifference').textContent = 'CAD ' + Math.abs(actualDifference).toFixed(2) + ' ' + (actualDifference > 0 ? 'too much' : 'short');
        
        // Display trophy progress
        document.getElementById('failureTrophies').innerHTML = renderTrophyProgress();
        
        document.getElementById('failureModal').classList.add('active');
    }
});

document.getElementById('backBtn').addEventListener('click', function() {
    // Show confirmation dialog
    document.getElementById('confirmNewGameModal').classList.add('active');
});

document.getElementById('confirmNoBtn').addEventListener('click', function() {
    // Close confirmation modal and return to game
    document.getElementById('confirmNewGameModal').classList.remove('active');
});

document.getElementById('confirmYesBtn').addEventListener('click', function() {
    // Close confirmation modal and show summary
    document.getElementById('confirmNewGameModal').classList.remove('active');
    showGameSummary();
});

document.getElementById('summaryNewGameBtn').addEventListener('click', function() {
    // Close summary modal and go back to instructor
    document.getElementById('summaryModal').classList.remove('active');
    resetToInstructor();
});

document.getElementById('nextAmountBtn').addEventListener('click', function() {
    // Close success modal and pick next amount
    document.getElementById('successModal').classList.remove('active');
    pickNextAmount();
});

document.getElementById('finalNewGameBtn').addEventListener('click', function() {
    // Close success modal and show summary
    document.getElementById('successModal').classList.remove('active');
    showGameSummary();
});

document.getElementById('completeNewGameBtn').addEventListener('click', function() {
    // Close completion modal and go back to instructor
    document.getElementById('completionModal').classList.remove('active');
    resetToInstructor();
});

document.getElementById('retryBtn').addEventListener('click', function() {
    // Clear collection but keep target amount
    collectedItems = [];
    document.getElementById('collectionArea').innerHTML = '';
    document.getElementById('failureModal').classList.remove('active');
});

document.getElementById('skipBtn').addEventListener('click', function() {
    // Update progress to skipped
    if (window.currentProgressIndex !== undefined) {
        amountProgress[window.currentProgressIndex].status = 'skipped';
    }
    
    // Close failure modal
    document.getElementById('failureModal').classList.remove('active');
    
    // Check if this is the last amount (remainingAmounts will be empty if current is last)
    if (remainingAmounts.length === 0) {
        // This is the last amount, show summary
        showGameSummary();
    } else {
        // Move to next amount
        pickNextAmount();
    }
});

function resetToInstructor() {
    // Hide all modals
    document.getElementById('successModal').classList.remove('active');
    document.getElementById('failureModal').classList.remove('active');
    document.getElementById('completionModal').classList.remove('active');
    
    // Reset to instructor section
    document.getElementById('instructorSection').style.display = 'block';
    document.getElementById('studentSection').classList.remove('active');
    document.getElementById('targetAmount').value = '';
    document.getElementById('errorMessage').textContent = '';
    collectedItems = [];
    document.getElementById('collectionArea').innerHTML = '';
    
    // Reset amounts
    targetAmounts = [];
    completedAmounts = [];
    remainingAmounts = [];
    amountProgress = [];
    consecutiveCorrect = 0;  // Reset consecutive correct counter
    updateAmountsList();
    document.getElementById('startActivityBtn').disabled = true;
}

function showCompletionModal() {
    // Reset to instructor after completion
    resetToInstructor();
}
