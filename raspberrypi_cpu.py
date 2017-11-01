# all config_cpuuration settings come from config_cpu.py
try:
    import config_cpu
except ImportError:
    print("Please copy template-config_cpu.py to config_cpu.py and config_cpuure appropriately !"); exit();

# this can be used to activate debugging
# debug_communication=1
debug_communication=0

try:
    # for Python2
    from Tkinter import *
except ImportError:
    # for Python3
    from tkinter import *

import os
import base64
import sys 
import json
import time
import urllib3
import ctypes
import requests


# C struct redefinitions 
def send_to_hcp():
    global debug_communication
    global http
    global url
    global headers
    global s1
    global do_send
    global sensor1
    global sensor2

    path = os.path.abspath("C:\python\A.jpg")
    image = open(path, 'rb')
    image_read = image.read()
    image_64_encode = base64.b64encode(image_read)
    img = image_64_encode.decode('utf-8')

    locobj = requests.get('http://ipinfo.io/json')
    longlat = locobj.json()["loc"]
    city = locobj.json()["city"]
    region = locobj.json()["region"]
    country = locobj.json()["country"]
    
    msg="Fire at " + "" +city + "" +region + country
    loc=longlat
    info="Fire at " + "" +city + "Please contact:9096843704";
    # print(timestamp)
    body='{"mode":"async", "messageType":"' + str(config_cpu.message_type_id_From_device) + '", "messages":[{"msg":"' + msg + '", "location":"' + loc + '", "image":"' + img + '", "info":"' + info + '"}]}'
    print(body)
    print(url)
    r = http.urlopen('POST', url, body=body, headers=headers)
    do_send=0
    print(r.status)
    if (debug_communication == 1):
        print("send_to_hcp():" + str(r.status))
        print(r.data)

    
# === main starts here ===============================================
# disable InsecureRequestWarning if your are working without certificate verification
# see https://urllib3.readthedocs.org/en/latest/security.html
# be sure to use a recent enough urllib3 version if this fails
try:
    urllib3.disable_warnings()
except:
    print("urllib3.disable_warnings() failed - get a recent enough urllib3 version to avoid potential InsecureRequestWarning warnings! Can and will continue though.")

# use with or without proxy
if (config_cpu.proxy_url == ''):
    http = urllib3.PoolManager()
else:
    http = urllib3.proxy_from_url(config_cpu.proxy_url)

url='https://iotmms' + config_cpu.hcp_account_id + config_cpu.hcp_landscape_host + '/com.sap.iotservices.mms/v1/api/http/data/' + str(config_cpu.device_id)
print(url)
headers = urllib3.util.make_headers(user_agent=None)

# use with authentication
headers['Authorization'] = 'Bearer ' + config_cpu.oauth_credentials_for_device
headers['Content-Type'] = 'application/json;charset=utf-8'

send_to_hcp()
