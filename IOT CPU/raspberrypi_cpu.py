# all configcpuuration settings come from configcpu.py
try:
    import configcpu
except ImportError:
    print("Please copy template-configcpu.py to configcpu.py and configcpuure appropriately !"); exit();

# this can be used to activate debugging
# debug_communication=1
debug_communication=0

try:
    # for Python2
    from Tkinter import *
except ImportError:
    # for Python3
    from tkinter import *

import sys 
import json
import time
import urllib3
import ctypes


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
    abc="MYCPU"
    xyz=str(sys.argv[1])
    timestamp=int(time.time())
    # print(timestamp)
    body='{"mode":"async", "messageType":"' + str(configcpu.message_type_id_From_device) + '", "messages":[{"sensor1":"' + abc + '", "sensor2":' + xyz + ', "timestamp":' + str(timestamp) + '}]}'
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
if (configcpu.proxy_url == ''):
    http = urllib3.PoolManager()
else:
    http = urllib3.proxy_from_url(configcpu.proxy_url)

url='https://iotmms' + configcpu.hcp_account_id + configcpu.hcp_landscape_host + '/com.sap.iotservices.mms/v1/api/http/data/' + str(configcpu.device_id)
print(url)
headers = urllib3.util.make_headers(user_agent=None)

# use with authentication
headers['Authorization'] = 'Bearer ' + configcpu.oauth_credentials_for_device
headers['Content-Type'] = 'application/json;charset=utf-8'

send_to_hcp()
