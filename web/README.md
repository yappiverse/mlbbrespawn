# MLBB Respawn Timer - Enhanced UI

## Overview

A modern, enhanced UI for the Mobile Legends: Bang Bang respawn timer with machine learning integration for accurate respawn time predictions.

## Features

### 🎨 Enhanced UI Design

- **Modern Glassmorphism Design**: Sleek, translucent card with blur effects
- **MLBB-Themed Colors**: Professional color scheme matching Mobile Legends aesthetics
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Visual Feedback**: Animations and hover effects for better user experience

### ⚡ Enhanced Controls

- **Level Controls**: Dedicated ◀ and ▶ buttons for precise level adjustment
- **Play/Pause Toggle**: Central control button with visual status indicator
- **Reset Functionality**: Quick reset to default values
- **Keyboard Shortcuts**: Full keyboard support for quick actions

### 🤖 Machine Learning Integration

- **Polynomial Predictor**: Client-side ML model for accurate respawn predictions
- **Real-time Updates**: Predictions update automatically as game time progresses
- **Error Handling**: Graceful fallback if ML prediction fails

### 🎯 Visual Features

- **Progress Bar**: Animated bar showing respawn progress
- **Status Indicators**: Color-coded playing/paused states
- **Button Animations**: Pulse and shake effects for user feedback
- **Prediction Badge**: ML prediction indicator for transparency

## Keyboard Shortcuts

| Key   | Action              |
| ----- | ------------------- |
| ←     | Decrease Hero Level |
| →     | Increase Hero Level |
| Space | Toggle Play/Pause   |
| R     | Reset Timer         |

## Technical Implementation

### HTML Structure

- Semantic HTML with proper accessibility
- Modular component structure
- Clean, maintainable code organization

### CSS Features

- CSS Variables for consistent theming
- Flexbox and Grid for responsive layouts
- CSS Animations for smooth transitions
- Mobile-first responsive design

### JavaScript Architecture

- **Class-based Structure**: Organized GameTimer class
- **State Management**: Centralized state object
- **Event Handling**: Clean event binding and delegation
- **Error Handling**: Comprehensive error management

### ML Integration

- **PolynomialPredictor Class**: Ported from Python to JavaScript
- **Real-time Prediction**: Updates every second during gameplay
- **Model Data**: Embedded coefficients from trained polynomial model

## File Structure

```
web/
├── index.html          # Main application interface
├── style.css           # Enhanced styling with animations
├── script.js           # Complete application logic
├── test-predictor.html # ML predictor test page
└── README.md          # This documentation
```

## Usage

1. Open `index.html` in a web browser
2. Use buttons or keyboard shortcuts to control the timer
3. Watch the ML-powered respawn predictions update in real-time
4. The progress bar shows visual feedback of respawn progress

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Client-side computation (no server required)
- Optimized JavaScript with minimal DOM manipulation
- Efficient ML calculations using pre-computed coefficients
- Smooth 60fps animations

## Customization

The application can be easily customized by modifying:

- CSS variables in `:root` selector
- Color scheme in style.css
- Model coefficients in script.js
- UI layout in index.html
