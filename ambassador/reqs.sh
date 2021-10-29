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
    -H "cookie: \"$x\"" \
    -d '{"first_name":"b","last_name":"b","email":"b@b.com"}' \
    http://localhost:8000/api/admin/users/info
}

