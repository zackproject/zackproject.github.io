from PIL import Image
import os
import json
import re

def canviaFormato(folder_path):
    # Nuevas dimensiones para las imágenes
    new_size = (350, 350)

    # Nuevo formato para las imágenes
    new_format = "PNG"

    # Recorre cada archivo en la carpeta
    for filename in os.listdir(folder_path):
        # Verifica si el archivo es una imagen
        #if filename.endswith(".jpg") or filename.endswith(".jpeg") or filename.endswith(".png"):
        # Abre la imagen y la redimensiona
        img = Image.open(os.path.join(folder_path, filename))
        img = img.resize(new_size)
            
        # Guarda la imagen con el nuevo formato y nombre de archivo
        new_filename = os.path.splitext(filename)[0] + "." + new_format.lower()
        img.save(os.path.join(folder_path, new_filename), new_format)

def generaJson(folder_path):
    name_list = [folder_path]
    for filename in os.listdir(folder_path):
        name, ext = os.path.splitext(filename)
        print("Procesando archivo:", name)

    for filename in os.listdir(folder_path):
        name, ext = os.path.splitext(filename)
        name_with_spaces = re.sub(r'(?<!^)(?=[A-Z])', ' ', name)
        name_list.append(name_with_spaces)

    json_list = []
    for i, name in enumerate(name_list):
        #triquinyuela fea
        json_list.append({
            "id": i-1,
            "name": name,
            "image": None
        })

    json_array = json.dumps(json_list)
    print(json_array)


    with open('./output.json', 'w') as f:
        json.dump(json_list, f)

# Ruta de la carpeta que contiene las imágenes
folder_path = "C:/Users/kevin/Downloads/shingeki-no-fotos/"

canviaFormato(folder_path)
generaJson(folder_path)