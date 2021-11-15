register() {
  curl -s XPOST \
    -H 'content-type: application/json' \
    -d '{"email":"amb@amb.com", "password":"a", "password_confirm":"a","first_name":"amb","last_name":"amb"}' \
    http://localhost:8000/api/ambassador/register
}

login() {
  curl -v -H 'content-type: application/json' -d '{"email":"amb@amb.com", "password":"a"}' http://localhost:8000/api/ambassador/login 2>&1
}

cookies() {
  echo $(login | grep Cookie | sed -e 's/^[^\ ]*.//' -e 's/^[^\ ]*.//')
}

getUser() {
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/ambassador/user
}

updateUser() {
  curl -s \
    -X "PUT" \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    -d '{"first_name":"b","last_name":"b","email":"b@b.com"}' \
    http://localhost:8000/api/ambassador/users/info
}

getAmbassadors() {
  curl -s \
    -X "GET" \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/ambassador/ambassadors
}

getProducts() {
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/ambassador/products
}

postProducts() {
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    -d '{ "title": "title", "description": "description", "image": "image", "price": 10 }' \
    http://localhost:8000/api/ambassador/products
}

getProduct() {
  id=$1
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/ambassador/products/"$id"
}

updateProduct() {
  curl -s \
    -X "PUT" \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    -d '{ "title": "title2", "description": "description", "image": "image", "price": 10 }' \
    http://localhost:8000/api/ambassador/products/1
}

deleteProduct() {
  curl -s \
    -X "DELETE" \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/ambassador/products/2
}

getUserLinks() {
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/ambassador/users/7/links
}

getOrders() {
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/ambassador/orders
}

postLinks() {
  curl -s -XPOST \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    -d '{"products":[2,4,5]}' \
    http://localhost:8000/api/ambassador/links
}

getStats() {
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/ambassador/stats
}

getRankings() {
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/ambassador/rankings
}

# Obtenha o code utilizando getStats
getCheckoutLink() {
  code=$1
  curl -s \
    -H 'content-type: application/json' \
    http://localhost:8000/api/checkout/links/"$code"
}

createOrder() {
  json=$1
  curl -s -XPOST \
    -H 'content-type: application/json' \
    -d "$json" \
    http://localhost:8000/api/checkout/orders
}

confirmOrder() {
  body='{"source":"'"$1"'"}'
  curl -s -XPOST \
    -H 'content-type: application/json' \
    -d $body \
    http://localhost:8000/api/checkout/orders/confirm
}

# postLinks
# createOrder '{"first_name":"a","last_name":"a","email":"a@a.com","address":"a","country":"a","city":"a","zip":"a","code":"oesXpTq","products":[{"product_id":7,"quantity":5},{"product_id":8,"quantity":2}]}'
getRankings
# confirmOrder cs_test_b1nWqaK6N1DEmeFwW4RlHTakyXcRePqReYcXpF1vlmUQLQBXqYhZ6g4yjp

# [{"Sarina Donnelly":219.6},{"Modesta Labadie":204.00000000000003},{"amb amb":148.10000000000002},{"Idell Shields":144.9},{"Vladimir Pfannerstill":136.5},{"Vella Hirthe":109.4},{"Eugene Wehner":106.60000000000001},{"Brendon Homenick":100.39999999999999},{"Camden Rogahn":62.2},{"Immanuel Windler":62},{"Wilhelmine Hills":59.7},{"Winnifred Schmeler":49.900000000000006},{"Jaden Runte":44.400000000000006},{"Jeffrey Weimann":41.1},{"Evangeline Reichel":39.3},{"Fatima Hilll":23.900000000000002},{"Wilhelmine Metz":0},{"Taurean Prohaska":0},{"Stephany Schumm":0},{"Myrtle Powlowski":0},{"Michale Ruecker":0},{"Luther Sanford":0},{"Lila Ryan":0},{"Lavon Ebert":0},{"Kiarra McGlynn":0},{"Kelli Leffler":0},{"Frederick Kohler":0},{"Ernesto Gutkowski":0},{"Daphney Rowe":0},{"Dallas Tillman":0},{"Casandra Lang":0}]
# [{"Sarina Donnelly":219.6},{"Modesta Labadie":204.00000000000003},{"amb amb":189.50000000000003},{"Idell Shields":144.9},{"Vladimir Pfannerstill":136.5},{"Vella Hirthe":109.4},{"Eugene Wehner":106.60000000000001},{"Brendon Homenick":100.39999999999999},{"Camden Rogahn":62.2},{"Immanuel Windler":62},{"Wilhelmine Hills":59.7},{"Winnifred Schmeler":49.900000000000006},{"Jaden Runte":44.400000000000006},{"Jeffrey Weimann":41.1},{"Evangeline Reichel":39.3},{"Fatima Hilll":23.900000000000002},{"Wilhelmine Metz":0},{"Taurean Prohaska":0},{"Stephany Schumm":0},{"Myrtle Powlowski":0},{"Michale Ruecker":0},{"Luther Sanford":0},{"Lila Ryan":0},{"Lavon Ebert":0},{"Kiarra McGlynn":0},{"Kelli Leffler":0},{"Frederick Kohler":0},{"Ernesto Gutkowski":0},{"Daphney Rowe":0},{"Dallas Tillman":0},{"Casandra Lang":0}]
