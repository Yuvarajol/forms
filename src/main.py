import pywhatkit
import time
import data
from datetime import datetime
 
numbers = None
 
message = """
👨‍⚕️ டாக்டர் திருநாவுக்கரசு கிளினிக்கின் அன்பான வணக்கங்கள்! 🏥

உங்கள் ஆரோக்கியமும் மனநலமும் எங்களுக்கு மிகவும் முக்கியமானவை.

உங்களுக்கும் உங்கள் குடும்பத்தினருக்கும் பயனுள்ளதாக இருக்கும் ஒரு குறும்படத் தகவல் காணொளியை உங்களுடன் பகிர்ந்து கொள்கிறோம்.

🎥 https://youtu.be/YN03X5flkDU?si=1TcbQlmjrLY1w3KT

தயவுசெய்து சில நிமிடங்கள் ஒதுக்கி இந்தக் காணொளியைப் பாருங்கள். இது பயனுள்ளதாக இருந்தால், உங்கள் குடும்பத்தினர், நண்பர்கள் மற்றும் அன்புக்குரியவர்களுடனும் பகிர்ந்து, அவர்களும் பயனடைய உதவுங்கள்.

எங்கள் மீது தொடர்ந்து வைத்துள்ள நம்பிக்கைக்கும் ஆதரவிற்கும் மனமார்ந்த நன்றி.

– டாக்டர் திருநாவுக்கரசு கிளினிக்

👨‍⚕️ Greetings from Dr. Thirunukarasu Clinic 🏥
 
Your health and well-being are important to us.
 
We would like to share a short and informative video that may be helpful for you and your family:
 
🎥https://youtu.be/YN03X5flkDU?si=1TcbQlmjrLY1w3KT
 
Please take a few minutes to watch it. If you find it useful, kindly share it with your family, friends, and loved ones.
 
Thank you for your continued trust and support.
 
– Dr. Thirunukarasu Clinic
"""
def checker(arrd,arrlog):
    arr = []
    for i in arrd:
        if i not in arrlog:
            arr.append(i)
    return arr
            
    


with open("Message_log.txt","r") as f:
        content = f.readlines()
c = []
for i in content:
    c.append(int(i.strip().split("-")[0]))
num = c 

user = input("Enter For Send From Data File As 'D' Else Press Any Key Processed With Recent number: ")
if user.lower() =="d":
    numbers = data.data
else:
    numbers = num
sent_num = []
s=checker(arrd=data.data,arrlog=num)
for i in enumerate(s):
     print(i)
for number in numbers:
    an = int(f"+91{number}")  
    if an not in sent_num:
        
        pywhatkit.sendwhatmsg_instantly(
                            f"+91{number}",
                            message, 
                            wait_time=15,
                            tab_close=True
                            )
        try:
            print(f"Sending message to {number}...")   
            sent_num.append(an)
            print(f"✓ Message sent to {number}")
            if number not in num:
                   try:
                    with open("Message_log.txt", "a") as file:
                        file.write(f"{number}- {datetime.now().strftime("%c")}\n")
                   except FileNotFoundError as e:
                        print("Error:", e)
                        with open("Message_log.txt", "x") as file:
                            file.write(f"{number}- {datetime.now().strftime("%c")}\n")
                   finally:
                       file.close()
            time.sleep(8)
        except Exception as e:
            print(f"✗ Failed to send to {number}: {e}")
            continue
    else:
        print("The message has been sent already bro..")
    an = 0

print("Finished sending messages.")