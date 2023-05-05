
import json
import os

images_folder = "C:/Users/Pictures/Zacky/edens-zero"
start_idx = 133 # variable que indica desde qué número de índice empezar

# obtener una lista de los archivos de imagen en la carpeta
image_files = [f for f in os.listdir(images_folder) if f.endswith(".png")]

# recorrer los archivos de imagen y rellenar el campo "name" en la estructura
image_data = []
for idx, image_file in enumerate(image_files):
    # Obtener el nombre del archivo sin la extensión
    name = os.path.splitext(image_file)[0]
    
    # Convertir el nombre en CamelCase si es necesario
    if any(char.isupper() for char in name):
        name = ''.join(' ' + char if char.isupper() else char for char in name).strip()
    
    # crear la estructura de datos de la imagen con el nombre y otros campos vacíos
    image = {"id": start_idx + idx, "name": name, "image": "", "alt": ""}
    
    # añadir la estructura de datos a la lista de imágenes
    image_data.append(image)

# guardar la lista de imágenes en un archivo JSON
with open("image_data.json", "w") as f:
    json.dump(image_data, f)
