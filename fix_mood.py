filepath = r"E:\1st year GISMA studying\Year 1, 1st quarter\B119F Creative Problem Solving and startegy development\Workshop\workshop-spa\src\components\LoginPage.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the mood state to include all LookoutMood values
content = content.replace(
    'const [mood, setMood] = React.useState<"auto" | "secret" | "happy" | "sad">("secret")',
    'const [mood, setMood] = React.useState<"auto" | "neutral" | "reading" | "secret" | "peek" | "happy" | "sad" | "sleepy">("secret")'
)

# Add decideLookoutMood function
content = content.replace(
    'const live = () => setMood((m) => (m === "secret" ? "auto" : m))',
    'const live = () => setMood((m) => (m === "secret" ? "auto" : m))\n\n  const decideLookoutMood = () => {\n    // When password is revealed, eyes peek\n    if (reveal) return "peek"\n    // When password field is focused, eyes read along\n    if (focused) return "reading"\n    // When sleepy (idle too long), eyes get sleepy\n    // Otherwise, eyes look sad when not showing password\n    return "sad"\n  }'
)

# Replace the Lookout mood prop
old_lookout = '''<Lookout\n            shape="orb"\n            size={176}\n            scope={formRef}\n            follow="both"\n            blink={true}\n            lookAwayForPasswords={true}\n            idleAfter={8}\n            mood={mood}\n            restGaze={[0.45, 0.1]}'''

new_lookout = '''<Lookout\n            shape="orb"\n            size={176}\n            scope={formRef}\n            follow="both"\n            blink={true}\n            lookAwayForPasswords={true}\n            idleAfter={8}\n            mood={decideLookoutMood()}\n            restGaze={[0.45, 0.1]}'''

content = content.replace(old_lookout, new_lookout)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("LoginPage mood control updated")