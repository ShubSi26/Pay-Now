# Pay Now
![](https://github.com/ShubSi26/Pay-Now/blob/main/images/default.jpg)
Deployment - https://paynow.devshubh.live

More images - [Click Here](https://github.com/ShubSi26/Pay-Now/tree/main/images)
> [!WARNING]
> Don't enter any personal information.

# Technology Used
<img src="https://skillicons.dev/icons?i=mongodb,express,react,nodejs,tailwind,vite,ts,js,npm,docker " /> <img src = "https://jwt.io/img/pic_logo.svg" width = 50px> <img src = "https://zod.dev/logo.svg" width = 50px>

|`mongodb`|`express`|`react`|`nodejs`|`tailwindcss`|`vite`|`typescript`|`javascript`|`Docker`|`JWT`|`ZOD`|
|---|---|---|---|---|---|---|---|---|---|---|

# Local Setup
- ## By CLI
  ```bash
  git clone https://github.com/ShubSi26/Pay-Now.git
  ```
  In home folder, run
  ```bash
  build
  ```
# Key Features
- ## Authentication
  The user can create an account and perform operations such as logging in and signing up. Upon logging in or signing up, the user will be given a JWT key for authentication purposes.
> [!NOTE]
> E-mail and number need to be unique.
> Password and pin must be atleast 6 characters long. 
- ## Send Money
  The user can send money to another person by knowing their UID, email, or phone number. In the transfer section, the user will select UID, email, or phone number, enter the details and the amount, and then be redirected to the payment page where the receiver's name and the transfer amount will appear. After entering the correct PIN, the payment will be completed.
- ## Add Money
  The user can add money to their wallet balance in the wallet section. The user needs to enter their card details and the amount, then click "Pay" to add the amount to the wallet balance.
- ## Send Request
  The user can request money from other people. To do this, in the transfer section, the user needs to select "Send Request," choose UID, email, or phone number, enter the details and the amount, then click "Send Request." On the receiver's side, the request will appear in the "Pending Requests" section on the homepage.
- ## View Transactions
  The user can view two types of transactions:
  1. **Transaction History in Wallet Section**: Here, the user can see the amount added to their wallet balance.
  2. **Transaction Section**: In this section, the user can see all the money sent and received from other people, along with details such as transaction ID (txid), sender and receiver, amount, date, and time.
- ## Search People
  The user can search for other people using their name or phone number. In the search section, the user needs to select either "name" or "number" and enter the corresponding details. The search results will then appear. The user also has the option to send money to the searched individuals directly from the search page.
