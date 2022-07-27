//Page 1

# List of city
> http://localhost:9870/location
# List of Restaurant
> http://localhost:9870/mealtype
# Restaurant wrt City
> http://localhost:9870/restaurants?stateId=2
# List of QuickSearch
>http://localhost:9870/mealtype?mealtype=1

//Page 2
# Restaurant wrt Meal
> http://localhost:9870/restaurants?mealid=1
# Restaurant wrt Meal & cuisine
> http://localhost:9870/filter/1?cuisineid=1
# Restaurant wrt Meal & cost
> http://localhost:9870/filter/2?lcost=400&hcost=700
> http://localhost:9870/filter/2?lcost=600&hcost=1200&cuisineId=4
# Sort on basis of cost
 > http://localhost:9870/filter/1?cuisineId=4&sort=-1

//Page3
# Details of the Restaurants
> http://localhost:9870/details/9
# Menu of the Restaurants
> http://localhost:9870/menu/7

//Page4
# Menu Details
> (POST) localhost:9870/menulist
> {"id":[1,6,7]}
# Place Order
> (Post)http://localhost:9870/placeOrder
{
	"orderId" : 5,
	"name" : "Amit",
	"email" : "amit@gmail.com",
	"address" : "Hom 42",
	"phone" : 7834645457,
	"cost" : 365,
	"menuItem" : [
		24,
		13,
		8
	]
}

//Page5 
# List of order place
localhost:9870/order
# List of order place wrt to email
localhost:9870/order?email=bhanu@gmail.com
# update order details with payment
(put)localhost:9870/update/5

{"status":"trx succssesful",
"bank_deatails":"bank of india",
"date":"26-8-2021"
}


///////
Delete order
localhost:9870/deleteOrder/62de713e063c1a642d283505