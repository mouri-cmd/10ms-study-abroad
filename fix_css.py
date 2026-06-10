import os

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.css') or file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            new_content = content.replace('var(all var(--dur-base) var(--ease-out))', 'all var(--dur-base) var(--ease-out)')
            
            if new_content != content:
                with open(path, 'w') as f:
                    f.write(new_content)
                print(f"Fixed {path}")
