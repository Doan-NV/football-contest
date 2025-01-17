pwd

mongosh ${DB_DATABASE} \
  --host localhost \
  --port 27017 \
  -u "$MONGO_INITDB_ROOT_USERNAME" \
  -p "$MONGO_INITDB_ROOT_PASSWORD" \
  --authenticationDatabase admin \
  --eval "db.createUser({user: '"$DB_USER_DATABASE"', pwd: '"$DB_PASSWORD"', roles:[{role:'dbOwner', db: '"$DB_DATABASE"'}]});"