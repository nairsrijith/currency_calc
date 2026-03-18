# 💰 Canadian Currency Calculator

An interactive educational web application designed to help students learn about Canadian currency (notes and coins) by collecting the correct amount of money based on an instructor-set target.

## 📋 Features

- **Realistic Canadian Currency**: Beautiful visual representations of all Canadian notes ($5, $10, $20, $50, $100) and coins (1¢, 5¢, 10¢, 25¢, $1, $2)
- **Multiple Amount Matching**: Instructor can add up to 10 different amounts for students to practice
- **Drag-and-Drop Interface**: Intuitive drag-and-drop system for collecting currency
- **Smart Validation**: 
  - Prevents duplicate amounts from being added
  - Maximum 10 amounts per session
- **Progress Tracking**: Visual trophy system showing:
  - 🏆 Gold trophies for correct matches
  - 🏆❌ Crossed-out trophies for skipped amounts
  - ⚪ Greyed-out trophies for unattempted amounts
- **Skip & Retry Options**: Students can skip challenging amounts and try again later
- **Activity Summary**: Complete summary showing correct, incorrect, and unattempted matches
- **Rotating Congratulations**: Messages increase in intensity with consecutive correct answers:
  - "Congratulations!" → "Excellent work!" → "Amazing job!" → "You're on fire! 🔥" → ... → "Unbelievable! 🚀"
- **Sound Effects**: Immersive audio feedback:
  - Piggy bank sound when adding currency
  - ATM beep sequence when removing currency
  - Applause for correct answers
  - Failure sound for incorrect answers
- **Instant Feedback**: Modal dialogs showing success or failure with detailed information
- **Easy Error Correction**: Click on collected items to remove them
- **No Installation Required**: Runs directly in any modern web browser

## � Recent Updates

### Version 2.0 - Multi-Amount & Enhanced Feedback

**Major Features Added:**
- ✅ **Multiple Amount Support**: Instructors can now create sessions with up to 10 different amounts
- ✅ **Random Amount Presentation**: Amounts are presented to students in random order for better learning
- ✅ **Skip Functionality**: Students can skip challenging amounts and come back to them
- ✅ **Progress Tracking**: Trophy system shows real-time progress with visual indicators
- ✅ **Activity Summary**: Complete breakdown of performance with trophy visualization
- ✅ **Intelligent Validation**: Prevents duplicate amounts and enforces maximum limits
- ✅ **Dynamic Messages**: Congratulations messages escalate in intensity with consecutive correct answers
- ✅ **Simplified Navigation**: One-click confirmation flow for starting new games

**User Experience Improvements:**
- Better spacing and layout consistency
- Equal-width buttons for improved visual design
- Clearer feedback at each step of the activity
- More engaging visual progression indicators
- Confirmation dialogs to prevent accidental game resets

## �🎮 How to Use

### For Instructors

1. **Open the Application**: Open `index.html` in any web browser
2. **Add Multiple Amounts**: 
   - You'll see the instructor interface with an input field
   - Enter the first dollar amount the student needs to collect (e.g., `47.35`)
   - Click **"Add Amount"** button
   - Repeat to add up to 10 different amounts
   - **Note**: Duplicate amounts are not allowed and a maximum of 10 amounts can be added
3. **Start the Activity**: 
   - Click **"Start Activity"** button when you've added all desired amounts
   - The student interface will now be displayed with a random amount to match

### For Students

1. **View Target Amount**: 
   - The target amount is displayed at the top of the student section
   - Amounts are presented randomly from the instructor's list
   
2. **Collect Currency**:
   - **Left Panel**: Shows all available Canadian currency (notes and coins)
   - **Right Panel**: Your collection area
   - **Drag currency** from the left panel to your collection area on the right
   - Each drag is accompanied by a satisfying piggy bank sound

3. **Manage Your Collection**:
   - **Hover** over collected items to see a red X button
   - **Click** on any item to remove it (ATM beep sound plays)
   - You can add and remove items as many times as needed

4. **Submit Your Answer**:
   - Click **"Submit Answer"** when you believe you've collected the correct amount
   - A modal dialog will appear with the result

5. **Success (Correct Answer)**: 🏆
   - Dynamic congratulations message appears (intensifies with consecutive correct answers)
   - Shows the amount you collected
   - Trophy progress displays showing your performance on all amounts
   - If more amounts remain: Click **"Match Next Amount"** to continue
   - If last amount: Click **"View Summary"** to see your complete activity results

6. **Failure (Incorrect Answer)**: ☹️
   - Shows the target amount, your amount, and the difference
   - Trophy progress displays your current performance
   - Two options:
     - **"Try Again"**: Clears your collection but keeps the same target amount
     - **"Skip"**: Marks this amount as skipped and moves to the next amount
   - If on the last amount and you skip: Taken directly to summary page

7. **Activity Summary**: 📊
   - Shows complete breakdown:
     - Number of correct matches
     - Number of incorrect/skipped matches
     - Number of unattempted matches
   - Visual trophy progress display
   - Click **"Start New Game"** to return to instructor section for a new session

8. **Start New Game Confirmation**: ❓
   - When clicking "Start New Game" from the main area, a confirmation dialog appears
   - Confirms you want to end the current game
   - Option to view summary before completely exiting

## 💻 Technical Details

### Project Structure
```
currency_calc/
├── index.html              # Main HTML file
├── README.md               # This file
└── static/
    ├── style.css           # All styling
    └── scripts/
        └── app.js          # Application logic and sound effects
```

### Technologies Used
- **HTML5**: Semantic markup for the interface
- **CSS3**: Modern styling with gradients and animations
- **JavaScript**: Game logic and Web Audio API for sound effects
- **Web Audio API**: Pure-code sound generation (no audio files needed)

### Browser Requirements
- Modern web browser with support for:
  - ES6 JavaScript
  - CSS Grid and Flexbox
  - Web Audio API
  - Drag and Drop API
  
Recommended browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Getting Started

### Installation
No installation required! Simply:

1. Download or clone the repository
2. Open `index.html` in a web browser
3. Start using!

### Running Locally
If you want to run this with a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (with http-server)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## 🎯 Learning Outcomes

This application helps students:
- Recognize and identify Canadian currency
- Understand denominations and their values
- Practice mental math and addition
- Learn about money management and currency composition
- Develop confidence in handling money concepts

## 🔊 Sound Effects

The app uses the Web Audio API to generate realistic sounds:
- **Adding currency**: Metallic clink (piggy bank)
- **Removing currency**: ATM beep sequence
- **Correct answer**: Applause with celebratory notes
- **Incorrect answer**: Sad descending tone

## 📱 Responsive Design

The application is responsive and works on:
- Desktop computers
- Tablets
- Large mobile devices

Note: Best experience on larger screens (laptop/desktop) due to drag-and-drop interactions.

## 🎨 Currency Design

All currency is designed with realistic visual elements:
- **Notes**: Realistic gradients with security patterns and proper dimensions
- **Coins**: Metallic finishes with 3D effects and ridging patterns
- **Sizes**: Relative sizing matches real Canadian currency proportions

## ❓ Troubleshooting

### Sound not working?
- Ensure your browser has Web Audio API support
- Check that your device/browser sound is enabled
- Try a different browser if sounds aren't playing

### Drag and drop not working?
- Ensure you're using a modern browser
- Try refreshing the page
- Make sure you're clicking and dragging the currency items properly

### Currency items not displaying correctly?
- Clear your browser cache
- Try a different browser
- Ensure CSS file is loading (check browser console for errors)

## 📝 License

This project is open source and available for educational use.

## 🤝 Contributing

Feel free to fork, modify, and improve this application for educational purposes.

---

**Happy Learning! 🎓**
