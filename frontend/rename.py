import os

# Path to your barcodes folder
scriptDir = os.path.dirname(os.path.realpath(__file__))  # Current script directory
folder_path = os.path.abspath(os.path.join(scriptDir, '../frontend/public/barcodes'))

# List all PNG files in the folder
files = [f for f in os.listdir(folder_path) if f.lower().endswith('.png')]
files.sort()  # Ensure consistent order (you can also random.shuffle if you want random distribution)

# Rename each file to barcode0.png, barcode1.png, etc.
for i, filename in enumerate(files):
    new_name = f'barcode{i}.png'
    src = os.path.join(folder_path, filename)
    dst = os.path.join(folder_path, new_name)
    os.rename(src, dst)
    print(f'Renamed {filename} -> {new_name}')

print('Done renaming!')
