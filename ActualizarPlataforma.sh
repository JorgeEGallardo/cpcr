#!/bin/bash

cd /home/matzu/Escritorio/CPCRDev
zip servidor.zip dist -r
scp servidor.zip ofadmin@192.168.0.4:/home/ofadmin
ssh ofadmin@192.168.0.4
unlink servidor.zip