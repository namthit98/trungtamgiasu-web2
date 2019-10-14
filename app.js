const express = require('express')
const categoryData = require('./data/category.json')
const categoryParentData = require('./data/category-parent.json')
const contentData = require('./data/content.json')

const app = express()


app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    return res.render('index', { categories: categoryData, parentCategories: categoryParentData, active: 'home' })
})

app.get('/lien-he', (req, res, next) => {
    res.render('contact', { categories: categoryData, parentCategories: categoryParentData, active: 'contact' })
})

app.get('/thu-vien', (req, res, next) => {
    res.render('library', { categories: categoryData, parentCategories: categoryParentData, active: 'library' })
})

app.get('/category/:id', (req, res, next) => {
    const id = req.params.id

    const parent = categoryParentData.find(cat => cat.id === id)

    res.render('category', { categories: categoryData, parentCategories: categoryParentData, level: parent.level, active: 'category' })
})

app.get('/:id', (req, res, next) => {
    const id = req.params.id

    const content = contentData.find(content => content.id === id)

    const {name: title} = categoryData.find(category => category.id === id)

    res.render('new', { categories: categoryData, parentCategories: categoryParentData, content, title, active: 'category' })
})

app.listen(8020, () => console.log('App is running .....'))