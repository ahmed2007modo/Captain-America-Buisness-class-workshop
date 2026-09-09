filepath = r"E:\1st year GISMA studying\Year 1, 1st quarter\B119F Creative Problem Solving and startegy development\Workshop\workshop-spa\src\components\LoginPage.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Update the mood type to include all LookoutMood values
content = content.replace(
    'const mood, setMood = React.useState<"auto" | "secret" | "happy" | "sad">("secret")',
    'const mood, setMood = React.useState<"auto" | "neutral" | "reading" | "secret" | "peek" | "happy" | "sad" | "sleepy">("secret")'
)

# Update the Lookout props to include all supported moods and add proper interaction handling
# We need to track focused state and control the Lookout mood accordingly

# Add a ref to track if password is being revealed
content = content.replace(
    'const [reveal, setReveal] = React.useState(false)',
    'const [reveal, setReveal] = React.useState(false)\n  const [wasPasswordFocused, setWasPasswordFocused] = React.useState(false)'
)

# Update the onSubmit to also track that password was focused
content = content.replace(
    'const ok = String(data.get("email")).includes("@") && String(data.get("password")).length >= 8',
    'const ok = String(data.get("email")).includes("@") && String(data.get("password")).length >= 8\n    setWasPasswordFocused(true)'
)

# Update the note timeout to reset mood properly
# Add onMouseLeave handler for the reveal button to reset mood

# Add a function to decide the Lookout mood based on state
content = content.replace(
    'const live = () => setMood((m) => (m === "secret" ? "auto" : m))',
    'const live = () => setMood((m) => (m === "secret" ? "auto" : m))\n\n  const decideLookoutMood = () => {\n    // If password field is focused, eyes read along\n    if (focused) return "reading"\n    // If password is revealed, eyes peek\n    if (reveal) return "peek"\n    // If sleepy (idle too long), eyes get sleepy\n    // Otherwise, eyes look sad when not showing password\n    return "sad"\n  }'
)

# Replace the Lookout component usage with proper mood control
old_lookout = '''<Lookout\n            shape="orb"\n            size={176}\n            scope={formRef}\n            follow="both"\n            blink={true}\n            lookAwayForPasswords={true}\n            idleAfter={8}\n            mood={mood}\n            restGaze={[0.45, 0.1]}'''

new_lookout = '''<Lookout\n            shape="orb"\n            size={176}\n            scope={formRef}\n            follow="both"\n            blink={true}\n            lookAwayForPasswords={true}\n            idleAfter={8}\n            mood={decideLookoutMood()}\n            restGaze={[0.45, 0.1]}'''

content = content.replace(old_lookout, new_lookout)

# Add onMouseDown to the password reveal button to trigger peek
# The button already has data-lookout="reveal" which should work with Lookout

# Make sure the note display works properly
content = content.replace(
    '<p aria-live="polite" className="text-white/40 min-h-5 text-sm">\n            {note}</p>',
    '<p aria-live="polite" className="text-white/40 min-h-5 text-sm">\n            {note}</p>'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("LoginPage updated")