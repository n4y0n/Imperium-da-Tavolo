from os import walk

assets_root = './units'

for current_dir, sub_dirs, files in walk(assets_root):
    for file in files:
        print("import {file1} from '{current_dir}/{file}'".format(current_dir=current_dir.replace('\\', '/'), file1=file.split('.')[0] ,file=file))