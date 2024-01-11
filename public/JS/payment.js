const amount = document.querySelector('input[name="amount"]');
const button = document.querySelector('button[type="submit"]');

const getKey = async () => {
    try {
        const keyResponse = await fetch("/api/v1/payment/generate-key");
        const res = await keyResponse.json();
        return res.data;
    } catch (err) {
        console.log(err.message);
    }
}

const checkoutHandler = async (e) => {
    e.preventDefault();
    let paymentAmount = 0;
    let order_id = null;

    if (amount.value == 0) {
        document.querySelector('.warning').classList.remove('hide');
    } else {
        document.querySelector('.warning').classList.add('hide');
        
        try {
            const orderResponse = await fetch("/api/v1/payment/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: amount.value,
                }),
            });

            const order = await orderResponse.json();

            paymentAmount = order.data.amount;
            order_id = order.data.id;
        } catch (err) {
            console.log(err.message);
            // Handle error appropriately
            return;
        }
    }

    try {
        const key = await getKey();

        const options = {
            "key": key,
            "amount": paymentAmount,
            "currency": "INR",
            "name": "Rushikesh Jawale",
            "description": "Payment gateway integration using Razorpay",
            "image": "https://avatars.githubusercontent.com/u/100342436?v=4",
            "order_id": order_id,
            "callback_url": "http://localhost:5001/api/v1/payment/payment-verification",
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#17286C"
            }
        };
        
        const razor = new window.Razorpay(options);
        razor.open();
    } catch (err) {
        console.log(err.message);
    }
}

button.addEventListener('click', checkoutHandler);
