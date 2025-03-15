
import sqlite3
from datetime import datetime

# Connect to the database
conn = sqlite3.connect('knowledge_base.db')
cursor = conn.cursor()

# Sample categories
categories = [
    (1, 'Audio', 'audio', 'Documentation about audio systems and equipment.'),
    (2, 'Lighting', 'lighting', 'Guides for lighting equipment and techniques.'),
    (3, 'Production Video', 'production-video', 'Resources for video production and equipment.')
]

# Sample articles
articles = [
    (1, 1, 'Introduction to Audio Systems', 'introduction-to-audio-systems', 
     '''# Introduction to Audio Systems

## Overview
Audio systems are fundamental to any production or event. This guide introduces basic concepts and equipment.

## Components
- **Microphones**: Convert sound waves into electrical signals
- **Mixers**: Combine multiple audio signals
- **Amplifiers**: Increase the power of the audio signal
- **Speakers**: Convert electrical signals back into sound waves

## Connections
Audio connections typically use XLR, TRS, or RCA cables depending on the equipment and quality needed.

## Best Practices
- Always test your system before an event
- Use balanced cables for long runs
- Label your cables and connections
- Keep a backup of critical components
'''),
    
    (2, 1, 'Microphone Types and Usage', 'microphone-types-and-usage', 
     '''# Microphone Types and Usage

## Dynamic Microphones
Robust and good for loud sources like drums or guitar amplifiers.

## Condenser Microphones
More sensitive and detailed, require phantom power, ideal for vocals and acoustic instruments.

## Placement Techniques
- **Vocals**: 6-8 inches from the mouth, slightly above
- **Acoustic Guitar**: Point towards the 12th fret, about 6-12 inches away
- **Piano**: Two mics - one for high notes, one for low notes
- **Drums**: Specific placement for each drum component

## Troubleshooting
- Feedback: Adjust positioning and levels
- Pops and hisses: Use a pop filter or adjust EQ
- Low signal: Check phantom power and connections
'''),
    
    (3, 2, 'Lighting Basics', 'lighting-basics', 
     '''# Lighting Basics

## Types of Lights
- **Flood lights**: Provide broad, even illumination
- **Spot lights**: Create focused beams for highlights
- **PAR cans**: Versatile lights used in many applications
- **Moving heads**: Automated fixtures with movement capabilities

## Color Theory
Understanding how colors work together in lighting design:
- Primary colors: Red, Green, Blue
- Secondary colors: Cyan, Magenta, Yellow
- Color temperature: Measured in Kelvin (K)

## Basic Lighting Setup
A three-point lighting setup includes:
1. Key light: Main light source
2. Fill light: Reduces shadows
3. Back light: Separates subject from background

## DMX Control
DMX512 is the standard protocol for controlling lighting fixtures.
'''),
    
    (4, 3, 'Video Production Essentials', 'video-production-essentials', 
     '''# Video Production Essentials

## Camera Types
- **DSLR/Mirrorless**: Great image quality, interchangeable lenses
- **Cinema cameras**: Professional-grade for high-end production
- **Camcorders**: Easy to use, all-in-one solutions
- **Action cameras**: Compact, durable for outdoor/action shots

## Shot Composition
- Rule of thirds
- Leading lines
- Framing
- Depth of field

## Basic Shot Types
- Wide shot (Establishing)
- Medium shot
- Close-up
- Extreme close-up
- Over-the-shoulder

## Post-Production
- Non-linear editing (NLE) software
- Color grading
- Audio mixing
- Visual effects
''')
]

# Sample tickets
tickets = [
    (1, 'user@example.com', 'Audio system not working', 'I set up the mixer as described but am not getting any output to the speakers.', 'open', datetime.now()),
    (2, 'test@example.com', 'Need help with lighting design', 'I\'m trying to create a specific mood for an event but unsure which colors to use.', 'in progress', datetime.now())
]

# Insert data
cursor.executemany('INSERT OR REPLACE INTO categories (id, name, slug, description) VALUES (?, ?, ?, ?)', categories)
cursor.executemany('INSERT OR REPLACE INTO articles (id, category_id, title, slug, content) VALUES (?, ?, ?, ?, ?)', articles)
cursor.executemany('INSERT OR REPLACE INTO tickets (id, email, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?)', tickets)

# Commit changes
conn.commit()
conn.close()

print("Database seeded successfully!")
