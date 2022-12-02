import app from './app'
import getUsers from './endpoints/getUsers'
import productsRegistration from './endpoints/productsRegistration'
import userRegistration from './endpoints/userRegistration'
import getProducts from './endpoints/getProducts'

app.get('/users', getUsers)

app.get('/products', getProducts)

app.post('/users', userRegistration)

app.post('/products', productsRegistration)