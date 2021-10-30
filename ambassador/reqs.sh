register() {
  curl -s XPOST \
    -H 'content-type: application/json' \
    -d '{"email":"b@b.com", "password":"a", "password_confirm":"a"}' \
    http://localhost:8000/api/admin/register
}

login() {
  curl -v -H 'content-type: application/json' -d '{"email":"b@b.com", "password":"a"}' http://localhost:8000/api/admin/login 2>&1
}

cookies() {
  echo $(login | grep Cookie | sed -e 's/^[^\ ]*.//' -e 's/^[^\ ]*.//')
}

getUser() {
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/admin/user
}

updateUser() {
  curl -s \
    -X "PUT" \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    -d '{"first_name":"b","last_name":"b","email":"b@b.com"}' \
    http://localhost:8000/api/admin/users/info
}

getAmbassadors() {
  curl -s \
    -X "GET" \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/admin/ambassadors
}

getProducts() {
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/admin/products
}


postProducts() {
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    -d '{ "title": "title", "description": "description", "image": "image", "price": 10 }' \
    http://localhost:8000/api/admin/products
}


getProduct() {
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/admin/products/1
}


updateProduct() {
  curl -s \
    -X "PUT" \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    -d '{ "title": "title2", "description": "description", "image": "image", "price": 10 }' \
    http://localhost:8000/api/admin/products/1
}


deleteProduct() {
  curl -s \
    -X "DELETE" \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/admin/products/2
}


getUserLinks() {
  curl -s \
    -H 'content-type: application/json' \
    -H "cookie: $(cookies)" \
    http://localhost:8000/api/admin/users/1/links
}



getUserLinks
