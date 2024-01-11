
# PAYMENT-GATEWAY

A payment gateway built using NodeJs, MongoDB and RazorPay. This node application demonstrates how to implement payment system with razorpay. This project also demonstrates how to implement database connectivity MongoDB and NodeJs with Docker images.



## Prerequisites

1. Docker installed on your system with all permissions.
2. Familiarity with Docker and basic NodeJs.


## Installation and Setup

1. Clone the repository
```bash
git clone https://github.com/imrushikesh77/PAYMENT-GATEWAY.git
```
2. Change the directory
```bash
cd PAYMENT-GATEWAY
```
3. Create account on https://razorpay.com/

4. Generate `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`

5. Create `.env` file with following keys:
```bash
PORT
MONGO_URI
MONGO_DB
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
```

6. Build docker image
```bash
docker build -t payment-gateway .
```
7. Run container
```bash
docker run --name payment-gateway -p 5001:5001    
```
8. Your app should be running on http://localhost:5001 
