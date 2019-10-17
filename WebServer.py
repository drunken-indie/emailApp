#!/usr/bin/env python
#I am using python 3;
#pip3 install websockets
#usage : python3 WebServer.py

# WS server example
import asyncio
import websockets
import logging
import json
from multiprocessing import Process, Manager, Value
from threading import Thread

#fake data with 
#emailData=
#[{"name":"username","inbox":[{"read":@@@,"sender":@@@,"content":@@@@}],"important":@@@@@,"outbox":@@@,"spam":@@@@}]
emailData=[{
    "name":"Mike",
    "inbox":[{
        "read":1,
        "sender":"Jen",
        "content":"hello from Jen"
           },
        {
        "read":0,
        "sender":"Ken",
        "content":"Bye from Ken"
           }],
    "important":[{
        "read":1,
        "sender":"ABC",
        "content":"Your application"
           }],
    #ㅇ얘는 read 없다 민식아
    "outbox":[{
        "to":"Jim",
        "content":"Re: Your application"
           }],
    "spam":[{
        "read":1,
        "sender":"some company",
        "content":"deposit money to get your parcel back"
           }],
    "junk":[{
        "read":1,
        "sender":"Jen",
        "content":"Install this package"
           },
        {
        "read":0,
        "sender":"Sue",
        "content":"Casino safjosf"
           }]
    },
           {
    "name":"Jim",
    "inbox":[{
        "read":1,
        "sender":"Mike",
        "content":"Re: Your application"
           },
        {
        "read":0,
        "sender":"Ken",
        "content":"Bye from Ken"
           }],
    "important":[{
        "read":1,
        "sender":"CDE",
        "content":"Your application"
           }],
    #ㅇ얘는 read 없다 민식아
    "outbox":[{
        "to":"Sam",
        "content":"Hello from Jim"
           }],
    "spam":[{
        "read":1,
        "sender":"some company",
        "content":"deposit money to get your parcel back"
           }],
    "junk":[{
        "read":1,
        "sender":"Jen",
        "content":"Install this package"
           },
        {
        "read":0,
        "sender":"Sue",
        "content":"Casino safjosf"
           }]
    },
           {
    "name":"Sam",
    "inbox":[{
        "read":0,
        "sender":"Jim",
        "content":"Hello from Jim"
           }],
    "important":[],
    #ㅇ얘는 read 없다 민식아
    "outbox":[],
    "spam":[],
    "junk":[{
        "read":0,
        "sender":"Sue",
        "content":"Casino safjosf"
           }]
    }]

logger = logging.getLogger('websockets')
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


def prettyPrint(emailData):
    for i in emailData:
        print(i.get("name"))
        for key in i.keys():
            if (key!="name"):
                print("\t"+key+"\t "+str(len(i.get(key))))
                print("\t\t"+str(i.get(key)))
            
            
def updateIt(recvData):
    dataToSend=""
    splitted = recvData.split(" ")
    #print(splitted[0])
    #print(splitted[1])
    #print(splitted[2])
    if (splitted[0]=="GET"):
        #print("getget")
        dataToSend=makeTable(splitted[1],splitted[2])
        return (dataToSend)
    elif (splitted[0]=="POST"):
        #print("postpost")
        dataToSend=updateDB(splitted[1], splitted[2], splitted[3], splitted[4:-1])
        return dataToSend
    else:
        raise Exception('something wrong')
    
def makeTable(user, fromWhere):
    found=False
    userData={}
    #begin_row
    br="<tr>"
    #end row
    er="</tr>"
    #begin table data
    btd="<td>"
    #end table data
    etd="</td>"
    table_text=''
    table_text+="<thead><tr><th></th><th>from</th><th>content</th></tr></thead><tbody>"
    #print(type(data))
    #print(str(data))
    print(user)
    for i in emailData:
        if (i.get("name")==user):
            found=True
            print("user found!!")
            userData=i.get(fromWhere)
    if (not found):
        raise Exception("user not found")
    emailCount=0;
    for email in userData:
        table_text+=(br+btd+"<input type=\"checkbox\" id=\"checkbox"+str(emailCount)+"\"/>    &nbsp;"+etd+btd+str(email.get("sender"))+etd+btd+str(email.get("content"))+etd+er);
        emailCount+=1
    table_text+="</tbody>"
    return (table_text)

def updateDB(user, destination, currentInbox, indexes):
    for i in emailData:
        if (i.get("name"==user)):
            for j in range(len(indexes)):
                print((indexes[j]))
    #for i in 
    return(makeTable(user, currentInbox))



async def hello(websocket, path):
    global search_data_storage
    return_data=''
    input_string = await websocket.recv()
    

    print(input_string+" recved !!!")
    

        #할필요 없어 테이블은
        #return_data=json.dumps(return_data)
    #no switch statement;;;;
    return_data=updateIt(input_string)
    await websocket.send(return_data)
    #그다음에 테이블 만들면 되겠다
    #print(f"> {return_data}")

start_server = websockets.serve(hello, '127.0.0.1', 8080)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()