filepath = r"E:\1st year GISMA studying\Year 1, 1st quarter\B119F Creative Problem Solving and startegy development\Workshop\workshop-spa\src\components\LoginPage.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add onLogin prop to LoginPage
content = content.replace(
    'export default function LoginPage() {',
    'interface LoginPageProps {\n  onLogin: () => void\n}\n\nexport default function LoginPage({ onLogin }: LoginPageProps) {'
)

# Call onLogin after successful validation
content = content.replace(
    'window.setTimeout(() => { setMood("auto"); setNote(null) }, 1800)',
    'if (ok) {\n    onLogin()\n  }\n  window.setTimeout(() => { setMood("auto"); setNote(null) }, 1800)'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("LoginPage fixed")

# Fix App.tsx to pass handleLogin
app_path = r"E:\1st year GISMA studying\Year 1, 1st quarter\B119F Creative Problem Solving and startegy development\Workshop\workshop-spa\src\App.tsx"
with open(app_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

app_content = app_content.replace(
    'return <LoginPage />',
    'return <LoginPage onLogin={handleLogin} />'
)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_content)

print("App.tsx fixed")
