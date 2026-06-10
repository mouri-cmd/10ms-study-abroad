import os
import glob

replacements = {
    '--color-navy': '--ten-ink',
    '--color-white': '--ten-white',
    '--color-teal': '--success',
    '--color-gold': '--premium-gold-2',
    '--color-text': '--fg-1',
    '--color-text-light': '--fg-2',
    '--color-border': '--border',
    '--color-bg-light': '--bg-muted',
    '--color-bg-alt': '--surface-subtle',
    '--radius-sm': '--r-sm',
    '--radius-md': '--r-md',
    '--radius-lg': '--r-lg',
    '--shadow-sm': '--sh-card',
    '--shadow-md': '--sh-raised',
    '--shadow-lg': '--sh-nav',
    '--font-body': '--font-sans',
    '--transition': 'all var(--dur-base) var(--ease-out)'
}

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.css') or file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
            
            if new_content != content:
                with open(path, 'w') as f:
                    f.write(new_content)
                print(f"Updated {path}")
