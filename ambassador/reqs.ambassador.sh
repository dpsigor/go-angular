register() {
  curl -s XPOST \
    -H 'content-type: application/json' \
    -d '{"email":"b@b.com", "password":"a", "password_confirm":"a"}' \
    http://localhost:8000/api/ambassador/register
}

login() {
  curl -v -H 'content-type: application/json' -d '{"email":"b@b.com", "password":"a"}' http://localhost:8000/api/ambassador/login 2>&1
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

# createOrder '{"first_name":"a","last_name":"a","email":"a@a.com","address":"a","country":"a","city":"a","zip":"a","code":"WhaUtMx","products":[{"product_id":7,"quantity":5},{"product_id":8,"quantity":2}]}'
