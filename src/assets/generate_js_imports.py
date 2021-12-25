from os import walk

assets_root = './skill_icon_hero'

for current_dir, sub_dirs, files in walk(assets_root):
    for file in files:
        if "png" in file.split('.')[1]:
            print("import {file1} from '{current_dir}/{file}'".format(current_dir=current_dir.replace('\\', '/'), file1=(file.split('.')[0]).lower() ,file=file))